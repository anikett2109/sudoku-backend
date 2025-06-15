# Sudoku Solver Backend

A high-performance Sudoku solver backend with real-time algorithm visualization, built with Spring Boot and Docker.

## ✨ Features

- **Puzzle Generation**: Creates random Sudoku puzzles with varying difficulties
- **Step-by-Step Solving**: Visualizes backtracking algorithm via Server-Sent Events (SSE)
- **REST API**: Fully documented endpoints for integration
- **Dockerized**: Ready for deployment with containerization
- **Validation**: Checks for valid Sudoku boards before solving

## 🔗 Frontend Integration

The matching frontend repository is available here:  

[Frontend Repository](https://github.com/anikett2109/sudoku-frontend)

Live Demo: (https://sudokubyaniket.netlify.app/)

## 🚀 Deployment

### Prerequisites
- Java 17+
- Docker (for containerized deployment)

### Local Development
```bash
./mvnw spring-boot:run
