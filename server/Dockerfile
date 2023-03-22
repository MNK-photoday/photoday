FROM openjdk:11-jre
COPY build/libs/photoday-0.0.1-SNAPSHOT.jar photoday.jar
EXPOSE 8080
ENTRYPOINT exec java -jar -Duser.timezone=Asia/Seoul photoday.jar
