# Use official OpenJDK 17 image
FROM eclipse-temurin:17-jdk-jammy

# Set working directory
WORKDIR /app

# First copy the Maven Wrapper files
COPY mvnw .
COPY .mvn .mvn

# Then copy the rest of the files
COPY pom.xml .
COPY src ./src

# Build the application
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

# Expose the port your app runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/sudoku-backend-0.0.1-SNAPSHOT.jar"]