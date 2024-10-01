
#### What is Airflow?
Airflow is an open-source platform for developing, scheduling, and monitoring batch-oriented workflows. Airflow’s extensible Python framework enables you to build workflows connecting with virtually any technology. A web interface helps manage the state of your workflows. Airflow is deployable in many ways, varying from a single process on your laptop to a distributed setup to support even the biggest workflows.


#### Workflows as code?

The main characteristic of Airflow workflows is that all workflows are defined in Python code. “Workflows as code” serves several purposes:

- **Dynamic**: Airflow pipelines are configured as Python code, allowing for dynamic pipeline generation.
    
- **Extensible**: The Airflow® framework contains operators to connect with numerous technologies. All Airflow components are extensible to easily adjust to your environment.
    
- **Flexible**: Workflow parameterization is built-in leveraging the [Jinja](https://jinja.palletsprojects.com/) templating engine.

![[Apache Airflow.png]]