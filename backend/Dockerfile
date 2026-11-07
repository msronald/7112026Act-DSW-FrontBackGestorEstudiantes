# Etapa 1: compilar con Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

# Etapa 2: imagen liviana solo con Java para ejecutar
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Ajustes para el plan gratuito (512 MB de RAM, poca CPU)
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:TieredStopAtLevel=1 -Xss512k"
EXPOSE 8080
CMD ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
