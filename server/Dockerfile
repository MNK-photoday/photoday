FROM openjdk:11-jdk-slim
COPY build/libs/photoday-0.0.1-SNAPSHOT.jar photoday.jar
EXPOSE 8080
ENTRYPOINT exec java -jar photoday.jar