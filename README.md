# Kafka In Podman

## Create a podman network  
`podman network create kafkanet`  

## Start Kafka in your local podman instance  
`podman run -it --net kafkanet --name kafkaserver -p 9092-9093:9092-9093 -e KAFKA_NODE_ID=1 -e KAFKA_PROCESS_ROLES=broker,controller -e KAFKA_LISTENERS=PLAINTEXT://:9092,CONTROLLER://:9093 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafkaserver:9092 -e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,EXTERNAL:PLAINTEXT -e KAFKA_CONTROLLER_QUORUM_VOTERS=1@kafkaserver:9093 -e KAFKA_CONTROLLER_LISTENER_NAMES=CONTROLLER -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -e KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR=1 -e KAFKA_TRANSACTION_STATE_LOG_MIN_ISR=1 docker.io/apache/kafka:4.1.0`



## Start Producer  
`podman run -it --net kafkanet --name kafkaproducer quay.io/rhdevelopers/node-kafka-producer:latest`  


## Start Consumer  
`podman run -it --net kafkanet --name kafkaconsumer quay.io/rhdevelopers/node-kafka-consumer:latest`  
