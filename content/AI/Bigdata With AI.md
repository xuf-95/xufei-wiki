---
title: Bigdata With AI
tags:
  - bigdata
  - ai
date: 2025-04-17
---

Databases with AI capabilities combine traditional storage and querying functions with integrated machine learning, artificial intelligence algorithms, or smart analytics. Below are some types of databases and platforms with AI functionalities:

---

### Text2SQL

- [Chat2DB](https://github.com/CodePhiliaX/Chat2DB) is an intelligent, universal SQL client and data reporting tool that integrates AI capabilities. Chat2DB helps you write SQL queries faster, manage databases, generate reports, explore data, ER model, data migration, data structure synchronization and interact with multiple databases. ***System Requirements***：
      - Docker 19.03.0 or later
      - Docker Compose 1.25.0 or later
      - CPU >= 2 Cores
      - RAM >= 4 GiB

![[chat2db.png]]

- [SQLChat](https://github.com/sqlchat/sqlchat) is a chat-based SQL client, which uses natural language to communicate with the database to implement operations such as query, modification, addition, and deletion of the database.

![[sqlchat.png]]

- [vanna](https://github.com/vanna-ai/vanna)  is an MIT-licensed open-source Python RAG (Retrieval-Augmented Generation) framework for SQL generation and related functionality.

![[vanna.png]]

- [supersonic](https://github.com/tencentmusic/supersonic) is the next-generation AI+BI platform that unifies Chat BI (powered by LLM) and Headless BI (powered by semantic layer) paradigms. This unification ensures that Chat BI has access to the same curated and governed semantic data models as traditional BI. Furthermore, the implementation of both paradigms benefit from each other:

  - Chat BI's Text2SQL gets augmented with context-retrieval from semantic models.
  - Headless BI's query interface gets extended with natural language API.


### Data Analyst

- [PandasAI](https://github.com/sinaptik-ai/pandas-ai) Chat with your database or your datalake (SQL, CSV, parquet). PandasAI makes data analysis conversational using LLMs and RAG.

![[pandasai.gif]]

- [ChatDB](https://chatdatabase.github.io/) Augmenting LLMs with Databases as Their Symbolic Memory

![[chatdb.png]]

### Agent 

- [WrenAI](https://github.com/Canner/WrenAI) Open-source GenBI AI Agent that empowers data-driven teams to chat with their data to generate Text-to-SQL, charts, spreadsheets, reports, dashboards and BI.

![[wrenai.png]]