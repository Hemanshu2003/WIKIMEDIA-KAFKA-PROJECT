
# Start our kafka cluster
docker-compose up kafka-cluster
# Wait 2 minutes for the kafka cluster to be started

###############
# A) FileStreamSourceConnector in standalone mode
# Look at the docker/run/worker.properties file and edit bootstrap
# Look at the docker/run/file-stream-demo.properties file
# Look at the run-file.txt file

# Linux / Mac
docker run --rm -it -v "$(pwd)":/tutorial --net=host landoop/fast-data-dev:cp3.3.0 bash
# Windows Command Line:
docker run --rm -it -v %cd%:/tutorial --net=host landoop/fast-data-dev:cp3.3.0 bash


# We launch the kafka connector in standalone mode:
cd /tutorial/run
# Create the topic we write to with 3 partitions
kafka-topics --create --topic wikimedia-recent-change --partitions 3 --replication-factor 1 --bootstrap-server 127.0.0.1:9092
# Usage is connect-standalone worker.properties connector1.properties 
connect-standalone worker.properties file-stream-demo-standalone.properties
# write some data to the demo-file.txt !
# shut down the terminal when you're done.
###############
#kafka-topics --delete --topic demo-1-standalone
###############
