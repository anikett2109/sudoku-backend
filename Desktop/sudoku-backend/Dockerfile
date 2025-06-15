FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy from the sudoku-backend subdirectory
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Copy files from nested structure
COPY ./Desktop/sudoku-backend/mvnw .
COPY ./Desktop/sudoku-backend/.mvn .mvn
COPY ./Desktop/sudoku-backend/pom.xml .
COPY ./Desktop/sudoku-backend/src ./src

RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/sudoku-backend-0.0.1-SNAPSHOT.jar"]