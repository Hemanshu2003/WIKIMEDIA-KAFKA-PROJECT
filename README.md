
# Wikimedia Recent Changes Analyzer

This project analyzes recent changes on Wikimedia properties using Apache Kafka. It provides real-time visualizations of the data, allowing users to interact with the charts and filter dynamically. The charts update with new events as they are fetched from the API.

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)
8. [Acknowledgements](#acknowledgements)

## Overview
The Wikimedia Recent Changes Analyzer is a project that showcases the working and implementation of basic concepts of Apache Kafka. The application fetches real-time data on recent changes made on Wikimedia properties, processes this data using Kafka, and displays it through interactive charts on a web interface.

## Features
- Real-time data processing with Apache Kafka
- Interactive charts for data visualization
- Dynamic filtering and updating of charts with new events
- Scalable architecture using Docker and Confluent Cloud

## Tech Stack
- **Apache Kafka**: For real-time data streaming and processing
- **HTML/CSS/JavaScript**: Frontend technologies for the web interface
- **Java**: Backend processing and Kafka integration
- **Confluent Cloud**: Managed Kafka service
- **Docker**: Containerization of the application
- **Landoop**: For easy setup of Kafka environment
- **Express**: Backend framework for serving the web application

## Installation
1. **Clone the Repository**
   ```
   git clone https://github.com/yourusername/Wikimedia-Recent-Changes-Analyzer.git
   cd Wikimedia-Recent-Changes-Analyzer
   ```

2. **Setup Kafka Environment**
   - Install Docker and start the Landoop Kafka environment.
   - Configure Confluent Cloud (if used) and update the configuration files accordingly.

3. **Build and Run the Application**
   - Start the Kafka producer and consumer services using Java.
   - Launch the web application using Express.

## Usage
Once the application is running, open your browser and navigate to `http://localhost:3000` (or the specified port) to view the real-time data visualizations. You can interact with the charts to filter data and observe the changes as new events are fetched from the Wikimedia API.

## Contributing
We welcome contributions to enhance the project! Please fork the repository, create a new branch, and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- [Apache Kafka](https://kafka.apache.org/)
- [Confluent Cloud](https://www.confluent.io/)
- [Landoop](https://www.lenses.io/)
- Wikimedia for providing the API

---

Feel free to customize the README with specific details and instructions relevant to your project!
