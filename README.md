# Kafka In Podman

## Start Kafka in your local podman instance  
`podman run -p 9092-9093:9092-9093 docker.io/apache/kafka:4.1.0`


## Start Producer
`cd node-kafka-producer`  
`node producer.js`

## Start Consumer  
`cd node-kafka-consumer`  
`node consumer.js`