---
title: Hadoop Yarn
tags:
  - bigdata
  - hadoop
  - apache
date: 2022-01-25
draft: false
---

### Yarn资源调度器简介
资源调度器是Yarn中最核心的组件之一，他是ResourceManager中的一个可插拔的服务组件，负责整个集群的管理和分配。目前Yarn中的作业类型:

  - 批处理作业,这种作业比较耗时，对时间的完成没有严格要求，如数据挖掘和机器学习等;
  - 交互式作业，这种作业一半希望能够及时的返回结果，例如：hive的sql查询;
  - 生产性作业:这种作业要求有一定量的资源保证，如统计值计算,垃圾数据分析等;

> 为了满足多用户多队列的资源分配问题以及Yarn自带的FIFO(先进先出资源调度器)单队列的问题，又引入了Yahoo的Capacity Scheduler和FaceBook的Fair Scheduler

### Yarn的资源调度器的基本架构

资源调度器作为Yarn中的可插拔的资源调度器,它定义了一套接口规范以便用户可按照规范实现自己的调度器，本文主要从资源调度器的可插拔性和时间处理器两方面来说

1.ResourceScheduler之插拔式组件

```java
  protected ResourceScheduler createScheduler() {
    String schedulerClassName = conf.get(YarnConfiguration.RM_SCHEDULER,
        YarnConfiguration.DEFAULT_RM_SCHEDULER);
    LOG.info("Using Scheduler: " + schedulerClassName);
    try {
      Class<?> schedulerClazz = Class.forName(schedulerClassName);
      if (ResourceScheduler.class.isAssignableFrom(schedulerClazz)) {
        return (ResourceScheduler) ReflectionUtils.newInstance(schedulerClazz,
            this.conf);
      } else {
        throw new YarnRuntimeException("Class: " + schedulerClassName
            + " not instance of " + ResourceScheduler.class.getCanonicalName());
      }
    } catch (ClassNotFoundException e) {
      throw new YarnRuntimeException("Could not instantiate Scheduler: "
          + schedulerClassName, e);
    }
  }
```

资源调度器的实现必须实现ResourceScheduler接口,代码如下:

```java
@LimitedPrivate("yarn")
@Evolving
public interface ResourceScheduler extends YarnScheduler, Recoverable {

  /**
   * Set RMContext for <code>ResourceScheduler</code>.
   * This method should be called immediately after instantiating
   * a scheduler once.
   * @param rmContext created by ResourceManager
   */
  void setRMContext(RMContext rmContext);

  /**
   * Re-initialize the <code>ResourceScheduler</code>.
   * @param conf configuration
   * @throws IOException
   */
  void reinitialize(Configuration conf, RMContext rmContext) throws IOException;
}
```

而ResourceScheduler实现了YarnScheduler接口，代码如下:

```java
public interface YarnScheduler extends EventHandler<SchedulerEvent> {

  /**
   * Get queue information
   * @param queueName queue name
   * @param includeChildQueues include child queues?
   * @param recursive get children queues?
   * @return queue information
   * @throws IOException
   */
  //todo 获取一个队列信息
  @Public
  @Stable
  public QueueInfo getQueueInfo(String queueName, boolean includeChildQueues,
      boolean recursive) throws IOException;

  /**
   * Get acls for queues for current user.
   * @return acls for queues for current user
   */
  //todo 返回当前用户的队列Acl权限
  @Public
  @Stable
  public List<QueueUserACLInfo> getQueueUserAclInfo();
  
  .......
```



### References

- https://www.jianshu.com/p/861af1cc89f1