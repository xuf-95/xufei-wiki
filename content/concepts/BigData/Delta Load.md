---
aliases:
  - incremental load
  - query-based CDC
tags:
  - seedling
  - to-trans
draft: true
---

A delta load refers to extracting only the data that has changed since the last time the extract process has run. The most commonly used steps to perform a delta load are:

1. Ensure there is a `modified_at` timestamp or incremental id column such as a primary key on the data source. 
2. On the initial run of the pipeline, do a full load of the dataset.
3. On following runs of the pipeline, query the target dataset using `MAX(column_name)`.
4. Query the source dataset and filter records where values are greater than the value from step 3.


## Delta Load Advantages

- More resource efficient
- Easy to implement and maintain
- Only requires read permissions to perform

## Delta Load Disadvantages

- Does not capture deleted records
- Requires extra metadata on the source (commonly a unique id or updated timestamp)
- Does not capture multiple changes between the polling interval. If a row changes multiple times, you may only capture the latest state.
- Querying the database for changes may impact the database performance.


