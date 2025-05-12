FROM eclipse-temurin:24-jdk-alpine
WORKDIR /app
COPY target/publicaciones-0.0.1-SNAPSHOT.jar app.jar
COPY src/main/resources/Wallet_FullStack3 /app/src/main/resources/Wallet_FullStack3
ENTRYPOINT ["java", "-jar", "app.jar"]