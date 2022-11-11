---
layout: post
project-id: 5
date: 2019-05-15
title: DBMS
project-date: May 2019
img: dbms.jpg
alt: A computer analysing data

summary: An end-to-end framework that queries data from 3 different sources simultaneously for a flat view for data collection.

description: If a user wanted to query data from  <a href="https://azure.microsoft.com/en-us/solutions/data-lake/" target="_blank">Data Lake</a>, <a href="https://www.sap.com/products/sybase-iq-big-data-management.html" target="_blank">Sybase IQ</a>, and <a href="https://www.elastic.co/elasticsearch/" target="_blank">Elasticsearch</a>, they would have to go to the 3 platforms, get results from each of them, and manually merge them. The idea behind this project was to create a framework that queries these sources simultaneously to create a black box for database querying. The user would then have to just run a single query from a comprehensive UI, and the framework would execute it on different sources internally to produce a consolidated result. This design facilitates smooth lateral data extraction and increases the efficiency of the database management system considerably. <br /> <br /> We also designed and implemented a user interface for this project. <a href="https://en.wikipedia.org/wiki/SQL" target="_blank">SQL</a> queries compiled from the user's selections on the UI are sent as calls to the middleware. The responsive web interface is developed in <a href="https://reactjs.org/" target="_blank">ReactJS</a>, integrated with the backend services using <a href="https://restfulapi.net/" target="_blank">RESTful APIs</a> to create a consistent user experience.


---
