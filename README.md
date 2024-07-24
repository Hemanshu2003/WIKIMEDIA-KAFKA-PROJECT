
# Wikimedia Kafka Project

This project analyzes recent changes on Wikimedia properties using Apache Kafka. It provides real-time visualizations of the data, allowing users to interact with the charts and filter dynamically. The charts update with new events as they are fetched from the API.


## Overview
The Wikimedia Recent Changes Analyzer is a project that showcases the working and implementation of basic concepts of Apache Kafka. The application fetches real-time data on recent changes made on Wikimedia properties, processes this data using Kafka, and displays it through interactive charts on a web interface.

#### The working model shown as below

![working](https://github.com/Hemanshu2003/WIKIMEDIA-KAFKA-PROJECT/blob/main/client/img/wikimedia-project-working.png)

## Features
- Real-time data processing with Apache Kafka
- Interactive charts for data visualization
- Dynamic filtering and updating of charts with new events
- Scalable architecture using Confluent Cloud

## Tech Stack
- **Apache Kafka**: For real-time data streaming and processing
- **HTML/CSS/JavaScript**: Frontend technologies for the web interface
- **Java**: Producing Data to Kafka topic
- **Confluent Cloud**: Managed Kafka service (*production mode*)
- **Docker**: Containerization of the application (*development mode*)
- **Landoop**: For easy setup of Kafka environment (*development mode*)
- **Express**: Backend framework for consuming data from Kafka topic and  serving the web application

## Installation
1. **Clone the Repository**
   ```
   git clone https://github.com/Hemanshu2003/WIKIMEDIA-KAFKA-PROJECT.git
   cd WIKIMEDIA-KAFKA-PROJECT
   ```

2. **Setup docker Environment ( for devlopment )**
   - Download Docker Desktop from the [Docker official website](https://www.docker.com/).
   - Run Docker Application.
   - In `WIKIMEDIA-KAFKA-PROJECT`
   ```
   cd doker
   docker-compose up kafka-cluster
   ```
   - Run landoop
      - Linux / Mac:
   ```
   docker run --rm -it -v "$(pwd)":/tutorial --net=host landoop/fast-data-dev:cp3.3.0 bash
   ```
      - Windows Command Line:
   ```
   docker run --rm -it -v %cd%:/tutorial --net=host landoop/fast-data-dev:cp3.3.0 bash
   ```
   - Launch the kafka in standalone mode
   ```
   cd /tutorial/run
   ```
   - Create the topic we write to with 3 partitions
   ```
   kafka-topics --create --topic wikimedia-recent-change --partitions 3 --replication-factor 1 --bootstrap-server 127.0.0.1:9092

   connect-standalone worker.properties file-stream-demo-standalone.properties
   ```

3. **Start Producer Class**
   - Open `producer` in `IntelliJ IDEA`
   - Install Dependencies `build.gradle`
   - Add your kafka configration in `WikimediaProducer.java`
   - run `WikimediaProducer` class

4. **Start Server**
   - Open `server`
   - Add your kafka configration in `App.js`
   ```
   npm install
   nodemon start
   ```

   - `locahost:3000`
   ![API](https://github.com/Hemanshu2003/WIKIMEDIA-KAFKA-PROJECT/blob/main/client/img/api.png)

   - `locahost:3000/data-source`
   ![data-source](https://github.com/Hemanshu2003/WIKIMEDIA-KAFKA-PROJECT/blob/main/client/img/datasource.png)- `locahost:3000/data-source`
   

5. **Start LiveServer**
   - Open `client`
   - Open `index.html`
   ![frontend](https://github.com/Hemanshu2003/WIKIMEDIA-KAFKA-PROJECT/blob/main/client/img/frontend.png)



## Acknowledgements
- All copyrights reverved to [@Hemanshu2003](https://github.com/Hemanshu2003).
- Special thanks to the open-source community for providing the tools and libraries that made this project possible.
- [Apache Kafka](https://kafka.apache.org/)
- [Confluent Cloud](https://www.confluent.io/)
- [Landoop](https://www.lenses.io/)
- [Wikitech Wikimedia](https://wikitech.wikimedia.org/)
- [Docker](https://www.docker.com/)

