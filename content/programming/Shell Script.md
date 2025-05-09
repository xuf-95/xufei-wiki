---
tags:
  - snippets
  - shell
date: 2022-02-20
draft:
---
### install_jdk.sh

```bash
#!/bin/bash

tar -zxvf /export/softwares/jdk-8u141-linux-x64.tar.gz -C /export/servers/

cd /export/servers/jdk1.8.0_141
home=`pwd`

echo $home

echo "export JAVA_HOME=${home}"  >> /etc/profile
echo "export PATH=:\$PATH:\$JAVA_HOME/bin" >> /etc/profile


for m in  2 3
do
scp -r /export/servers/jdk1.8.0_141 node0$m:/export/servers/
ssh node0$m "echo 'export JAVA_HOME=/export/servers/jdk1.8.0_141' >> /etc/profile; echo 'export PATH=:\$PATH:\$JAVA_HOME/bin' >> /etc/profile"

done

```

---

### MySQL Stress Test

```bash
#!/bin/bash

# Configuration
DB_DRIVER="mysql"
DB_NAME="loadtest"
DB_USER="root"
DB_PASSWORD="Password"
DB_PORT="3306"
DB_HOST="host"
TABLES_COUNT=64
TABLE_SIZE=10000000
DURATION=300
REPORT_INTERVAL=3
THREADS_LIST=(4 8 16 32 64 128 256)
DELAY_BETWEEN_TESTS=60
PROGRESS_INTERVAL=100

# Create output directory
OUTPUT_DIR="sysbench_results_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$OUTPUT_DIR"

# Result file with timestamp
RESULT_FILE="${OUTPUT_DIR}/sysbench_summary_$(date +%Y%m%d_%H%M%S).csv"

# Write CSV header
echo "Threads,Queries per sec,Transactions per sec,95th percentile (ms),Avg Query Time (ms), Start Time, End Time" > "$RESULT_FILE"

# Main test loop
for threads in "${THREADS_LIST[@]}"; do
    echo "----------------------------------------------------------------"
    echo "Starting test with $threads threads"
    echo "----------------------------------------------------------------"
    
    # Get start time
    test_start=$(date +%s)
    
    # Output file for this test
    LOG_FILE="${OUTPUT_DIR}/mysql8.0_1st_${threads}_$(date +%Y%m%d_%H%M%S).log"
    
    # format start time
    std_start_time=$(date +%Y%m%d_%H:%M:%S)

    # Start sysbench in background
    sysbench /usr/local/share/sysbench/tests/include/oltp_legacy/oltp.lua \
        --db-driver="$DB_DRIVER" \
        --mysql-db="$DB_NAME" \
        --mysql-user="$DB_USER" \
        --mysql-password="$DB_PASSWORD" \
        --mysql-port="$DB_PORT" \
        --mysql-host="$DB_HOST" \
        --oltp-tables-count="$TABLES_COUNT" \
        --oltp-table-size="$TABLE_SIZE" \
        --time="$DURATION" \
        --max-requests=0 \
        --threads="$threads" \
        --report-interval="$REPORT_INTERVAL" \
        --forced-shutdown=1 \
        run > "$LOG_FILE" 2>&1 &
    
    SYSBENCH_PID=$!
    
    # Progress monitoring
    while ps -p $SYSBENCH_PID > /dev/null; do
        elapsed=$(( $(date +%s) - test_start ))
        if (( elapsed % PROGRESS_INTERVAL == 0 )); then
            echo "[$(date +%H:%M:%S)] Current threads: $threads, Elapsed: $elapsed/$DURATION seconds"
        fi
        sleep 1
    done

    # format end time
    std_end_time=$(date +%Y%m%d_%H:%M:%S)
    
    # Get end time
    test_end=$(date +%s)
    
    # Wait for sysbench to complete
    wait $SYSBENCH_PID
    
    # Parse results from log file
    queries_per_sec=$(grep "queries:" "$LOG_FILE" | awk '{print $3}' | tr -d '(')
    transactions_per_sec=$(grep "transactions:" "$LOG_FILE" | awk '{print $3}' | tr -d '(')
    percentile_95=$(grep "95th percentile:" "$LOG_FILE" | awk '{print $3}')
    avg_query_time=$(grep "avg:" "$LOG_FILE" | awk '{print $2}')
    
    # Output results to CSV
    echo "$threads,$queries_per_sec,$transactions_per_sec,$percentile_95,$avg_query_time,$std_start_time,$std_end_time" >> "$RESULT_FILE"
    
    echo "Completed test with $threads threads"
    echo "Results:"
    echo "Threads: $threads, Queries(per/snc): $queries_per_sec, Transactions(per/snd): $transactions_per_sec, 95th percentile: $percentile_95, Avg Query Time (ms): $avg_query_time, Start Time: $std_start_time, End Time: $std_end_time"
    echo ""
    
    # Delay between tests if not the last one
    if [[ "$threads" != "${THREADS_LIST[-1]}" ]]; then
        echo "Waiting $DELAY_BETWEEN_TESTS seconds before next test..."
        sleep "$DELAY_BETWEEN_TESTS"
    fi
done

echo "----------------------------------------------------------------"
echo "All tests completed. Results saved to:"
echo "Summary: $RESULT_FILE"
echo "Detailed logs in: $OUTPUT_DIR/"
echo "----------------------------------------------------------------"
```
---

### Redis Stress Test

```shell
#!/bin/bash

# Configuration
REDIS_HOST="host"
REDIS_PORT=6379
REQUESTS=100000
CONCURRENCY_LEVELS=(20 50 100 200)
PASSWORD="password"
REPEATS=3
OUTPUT_CSV="redis_benchmark_results.csv"
LOG_DIR="benchmark_logs_$(date +%Y%m%d)"

# Create log directory
mkdir -p "$LOG_DIR"

# Initialize CSV with UTF-8 BOM for Chinese characters
echo -ne "\xEF\xBB\xBF指标,20并发第一次测试,20并发第二次测试,20并发第三次测试,20并发平均值,50并发第一次测试,50并发第二次测试,50并发第三次测试,50并发平均值,100并发第一次测试,100并发第二次测试,100并发第三次测试,100并发平均值,200并发第一次测试,200并发第二次测试,200并发第三次测试,200并发平均值\n" > "$OUTPUT_CSV"

# Define all metrics including those in the log
METRICS=(
    "PING_INLINE"
    "PING_MBULK"
    "SET"
    "GET"
    "INCR"
    "LPUSH"
    "RPUSH"
    "LPOP"
    "RPOP"
    "SADD"
    "HSET"
    "SPOP"
    "ZADD"
    "ZPOPMIN"
    "XADD"
    "MSET (10 keys)"
    "LPUSH (needed to benchmark LRANGE)"
    "LRANGE_100 (first 100 elements)"
    "LRANGE_300 (first 300 elements)"
    "LRANGE_500 (first 500 elements)"
    "LRANGE_600 (first 600 elements)"
)
# Initialize results array
declare -A results

# New extract_metric function using grep
extract_metric() {
    local output_file=$1
    local metric="$2"
    
    echo "  DEBUG: Extracting [$metric] from $output_file" >&2
    
    # First find the section header
    section_line=$(grep -n -m 1 "====== $metric ======" "$output_file" | cut -d: -f1)
    
    if [ -z "$section_line" ]; then
        echo "  WARNING: Could not find section for [$metric]" >&2
        echo "-"
        return
    fi
    
    echo "  DEBUG: Found section at line $section_line" >&2
    
    # Extract the throughput value using grep between the section and next section
    throughput=$(tail -n +"$section_line" "$output_file" | \
                grep -m 1 -A 20 "throughput summary:" | \
                grep "throughput summary:" | \
                awk '{print $3}' | \
                tr -d '\r')
    
    if [ -z "$throughput" ]; then
        echo "  WARNING: Could not extract throughput for [$metric]" >&2
        echo "-"
        return
    fi
    
    echo "  DEBUG: Extracted throughput: $throughput" >&2
    echo "$throughput"
}

# Function to calculate average
calculate_average() {
    local values=("$@")
    local sum=0
    local count=0
    
    for value in "${values[@]}"; do
        if [[ "$value" != "-" ]] && [[ "$value" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
            sum=$(echo "$sum + $value" | bc)
            ((count++))
        fi
    done
    
    if ((count > 0)); then
        printf "%.2f" $(echo "scale=2; $sum / $count" | bc)
    else
        echo "-"
    fi
}

# Function to write results to CSV
write_csv() {
    for metric in "${METRICS[@]}"; do
        # Convert metric name for display (replace underscores with spaces)
        display_metric=$(echo "$metric" | tr '_' ' ')
        
        # Start the CSV line
        line="$display_metric"
        
        for concurrency in "${CONCURRENCY_LEVELS[@]}"; do
            # Collect values for this concurrency level
            values=()
            for ((repeat=1; repeat<=REPEATS; repeat++)); do
                key="${metric}_${concurrency}_${repeat}"
                values+=("${results[$key]}")
            done
            
            # Calculate average
            avg=$(calculate_average "${values[@]}")
            results["${metric}_${concurrency}_avg"]="$avg"
            
            # Add to CSV line
            for value in "${values[@]}"; do
                line+=",$value"
            done
            line+=",$avg"
        done
        
        # Write to CSV
        echo "$line" >> "$OUTPUT_CSV"
    done
}

# Main benchmarking loop
for concurrency in "${CONCURRENCY_LEVELS[@]}"; do
    for ((repeat=1; repeat<=REPEATS; repeat++)); do
        echo "Running benchmark with concurrency $concurrency, iteration $repeat..."
        
        start_time=$(date +"%Y%m%d_%H%M%S")
        output_file="${LOG_DIR}/${repeat}_${concurrency}_${start_time}.log"
        
        # Run benchmark with timeout and cluster mode
        timeout 300 redis-benchmark \
            -h "$REDIS_HOST" \
            -p "$REDIS_PORT" \
            -a "$PASSWORD" \
            -n "$REQUESTS" \
            -c "$concurrency" \
            --cluster > "$output_file" 2>&1
        
        end_time=$(date +"%Y%m%d_%H%M%S")
        mv "$output_file" "${LOG_DIR}/${repeat}_${concurrency}_${start_time}__${end_time}.log"
        
        # Extract all metrics
        for metric in "${METRICS[@]}"; do
            value=$(extract_metric "${LOG_DIR}/${repeat}_${concurrency}_${start_time}__${end_time}.log" "$metric")
            results["${metric}_${concurrency}_${repeat}"]="$value"
            echo "  $metric: $value"
        done
        
        sleep 10 # Cooldown between runs
    done
done

# Calculate and write results
write_csv

echo -e "\nBenchmark completed. Results saved to $OUTPUT_CSV"
echo "Individual logs saved in $LOG_DIR/"

# Show final CSV output
echo -e "\nCSV Results Preview:"
column -t -s, "$OUTPUT_CSV" | head -n 20

```