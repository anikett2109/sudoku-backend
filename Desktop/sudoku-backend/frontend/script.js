import gsap from "gsap"

class SudokuSolver {
  constructor() {
    this.grid = Array(9)
      .fill()
      .map(() => Array(9).fill(0))
    this.originalGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(0))
    this.isAnimating = false
    this.startTime = null
    this.timerInterval = null
    this.apiBaseUrl = "http://localhost:8080/api/sudoku"

    this.initializeGrid()
    this.initializeEventListeners()
    this.initializeAnimations()
    this.createParticles()
  }

  initializeGrid() {
    const gridElement = document.getElementById("sudokuGrid")
    gridElement.innerHTML = ""

    for (let i = 0; i < 81; i++) {
      const cell = document.createElement("input")
      cell.type = "text"
      cell.className = "cell"
      cell.maxLength = 1
      cell.dataset.index = i

      cell.addEventListener("input", (e) => this.handleCellInput(e))
      cell.addEventListener("keydown", (e) => this.handleKeyDown(e))

      gridElement.appendChild(cell)
    }
  }

  initializeEventListeners() {
    document.getElementById("solveBtn").addEventListener("click", () => this.solveSudoku())
    document.getElementById("randomBtn").addEventListener("click", () => this.generateRandomBoard())
    document.getElementById("clearBtn").addEventListener("click", () => this.clearBoard())
  }

  initializeAnimations() {
    // Animate title on load
    gsap.from(".title-main", {
      duration: 2,
      y: -100,
      opacity: 0,
      ease: "bounce.out",
    })

    gsap.from(".title-sub", {
      duration: 1.5,
      x: -200,
      opacity: 0,
      delay: 0.5,
      ease: "power2.out",
    })

    // Animate grid cells
    gsap.from(".cell", {
      duration: 1,
      scale: 0,
      rotation: 180,
      stagger: 0.02,
      delay: 1,
      ease: "back.out(1.7)",
    })

    // Animate buttons
    gsap.from(".btn", {
      duration: 1,
      y: 100,
      opacity: 0,
      stagger: 0.2,
      delay: 1.5,
      ease: "power2.out",
    })

    // Animate floating numbers
    this.animateFloatingNumbers()
  }

  animateFloatingNumbers() {
    const numbers = document.querySelectorAll(".floating-numbers span")
    numbers.forEach((num, index) => {
      gsap.set(num, {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 100,
      })

      gsap.to(num, {
        y: -100,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        repeat: -1,
        ease: "none",
      })
    })
  }

  createParticles() {
    const particlesContainer = document.getElementById("particles")

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"
      particlesContainer.appendChild(particle)

      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5,
      })

      gsap.to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: Math.random() * 10 + 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }

  handleCellInput(e) {
    const value = e.target.value
    if (!/^[1-9]$/.test(value)) {
      e.target.value = ""
      return
    }

    const index = Number.parseInt(e.target.dataset.index)
    const row = Math.floor(index / 9)
    const col = index % 9

    this.grid[row][col] = Number.parseInt(value)
    this.originalGrid[row][col] = Number.parseInt(value)

    e.target.classList.add("given")

    // Animate cell input
    gsap.fromTo(
      e.target,
      { scale: 1.3, backgroundColor: "rgba(64, 224, 255, 0.5)" },
      { scale: 1, backgroundColor: "rgba(196, 113, 237, 0.2)", duration: 0.3 },
    )
  }

  handleKeyDown(e) {
    if (e.key === "Backspace" || e.key === "Delete") {
      const index = Number.parseInt(e.target.dataset.index)
      const row = Math.floor(index / 9)
      const col = index % 9

      this.grid[row][col] = 0
      this.originalGrid[row][col] = 0
      e.target.classList.remove("given", "solved")
    }
  }

  async solveSudoku() {
    if (this.isAnimating) return

    // Check if there's any input in the grid
    const hasInput = this.grid.some((row) => row.some((cell) => cell !== 0))
    if (!hasInput) {
      this.updateStatus("Please enter some numbers first", "error")
      return
    }

    this.isAnimating = true
    this.updateStatus("Solving...", "solving")
    this.startTimer()

    // Animate solve button
    const solveBtn = document.getElementById("solveBtn")
    solveBtn.classList.add("loading")

    try {
      const response = await fetch(`${this.apiBaseUrl}/solve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.grid),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const solvedGrid = await response.json()

      if (solvedGrid && this.isValidSolution(solvedGrid)) {
        await this.animateSolution(solvedGrid)
        this.updateStatus("Solved!", "success")
        this.celebrateSuccess()
      } else {
        this.updateStatus("No solution found", "error")
      }
    } catch (error) {
      console.error("Error solving sudoku:", error)
      this.updateStatus("Connection error - check if backend is running", "error")
    }

    solveBtn.classList.remove("loading")
    this.isAnimating = false
    this.stopTimer()
  }

  async animateSolution(solvedGrid) {
    const cells = document.querySelectorAll(".cell")
    const animationPromises = []

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cellIndex = row * 9 + col
        const cell = cells[cellIndex]

        // Only animate cells that were empty (solved by the algorithm)
        if (this.originalGrid[row][col] === 0 && solvedGrid[row][col] !== 0) {
          const promise = new Promise((resolve) => {
            setTimeout(
              () => {
                cell.value = solvedGrid[row][col]
                cell.classList.add("solving")

                // Animate solving process
                gsap.fromTo(
                  cell,
                  { scale: 0.8, backgroundColor: "rgba(255, 107, 157, 0.5)" },
                  {
                    scale: 1,
                    backgroundColor: "rgba(64, 224, 255, 0.3)",
                    duration: 0.3,
                    onComplete: () => {
                      cell.classList.remove("solving")
                      cell.classList.add("solved")
                      resolve()
                    },
                  },
                )
              },
              (row * 9 + col) * 50,
            ) // Staggered animation
          })

          animationPromises.push(promise)
        }
      }
    }

    // Update the grid state
    this.grid = solvedGrid.map((row) => [...row])

    // Wait for all animations to complete
    await Promise.all(animationPromises)
    this.updateProgress(100)
  }

  isValidSolution(grid) {
    // Basic validation to check if the solution is a 9x9 grid with numbers 1-9
    if (!Array.isArray(grid) || grid.length !== 9) return false

    for (const row of grid) {
      if (!Array.isArray(row) || row.length !== 9) return false
      for (const cell of row) {
        if (!Number.isInteger(cell) || cell < 1 || cell > 9) return false
      }
    }

    return true
  }

  async generateRandomBoard() {
    if (this.isAnimating) return

    this.clearBoard()
    this.updateStatus("Generating...", "generating")

    // Animate random button
    const randomBtn = document.getElementById("randomBtn")
    randomBtn.classList.add("loading")

    try {
      const response = await fetch(`${this.apiBaseUrl}/generate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const generatedGrid = await response.json()

      if (generatedGrid && Array.isArray(generatedGrid)) {
        await this.animateGeneratedBoard(generatedGrid)
        this.updateStatus("Ready", "ready")
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      console.error("Error generating board:", error)
      this.updateStatus("Connection error - check if backend is running", "error")

      // Fallback to local generation if backend is not available
      this.generateFallbackBoard()
    }

    randomBtn.classList.remove("loading")
  }

  async animateGeneratedBoard(generatedGrid) {
    const cells = document.querySelectorAll(".cell")

    // Clear existing state
    this.grid = Array(9)
      .fill()
      .map(() => Array(9).fill(0))
    this.originalGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(0))

    // Animate board generation
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9)
      const col = i % 9
      const value = generatedGrid[row][col]
      const cell = cells[i]

      await new Promise((resolve) => {
        setTimeout(() => {
          if (value !== 0) {
            cell.value = value
            this.grid[row][col] = value
            this.originalGrid[row][col] = value
            cell.classList.add("given")

            gsap.fromTo(
              cell,
              { scale: 0, rotation: 180 },
              {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "back.out(1.7)",
                onComplete: resolve,
              },
            )
          } else {
            cell.value = ""
            cell.classList.remove("given", "solved")
            resolve()
          }
        }, 20)
      })
    }

    this.updateProgress()
  }

  generateFallbackBoard() {
    // Fallback puzzle if backend is not available
    const puzzle = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ]

    this.animateGeneratedBoard(puzzle)
    this.updateStatus("Using offline puzzle", "ready")
  }

  clearBoard() {
    if (this.isAnimating) return

    const cells = document.querySelectorAll(".cell")

    // Animate clearing
    gsap.to(cells, {
      scale: 0,
      rotation: -180,
      duration: 0.3,
      stagger: 0.01,
      ease: "back.in(1.7)",
      onComplete: () => {
        cells.forEach((cell, index) => {
          cell.value = ""
          cell.classList.remove("given", "solved", "solving")
          const row = Math.floor(index / 9)
          const col = index % 9
          this.grid[row][col] = 0
          this.originalGrid[row][col] = 0
        })

        gsap.to(cells, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          stagger: 0.01,
          ease: "back.out(1.7)",
        })
      },
    })

    this.updateStatus("Cleared", "ready")
    this.updateProgress(0)
  }

  celebrateSuccess() {
    // Create celebration particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div")
      particle.style.position = "fixed"
      particle.style.width = "10px"
      particle.style.height = "10px"
      particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`
      particle.style.borderRadius = "50%"
      particle.style.pointerEvents = "none"
      particle.style.zIndex = "1000"

      document.body.appendChild(particle)

      gsap.set(particle, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      })

      gsap.to(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      })
    }

    // Pulse the grid
    gsap.to(".sudoku-wrapper", {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    })
  }

  updateStatus(text, type) {
    const statusText = document.getElementById("statusText")
    statusText.textContent = text
    statusText.className = `status-value ${type}`
  }

  updateProgress(percentage = null) {
    if (percentage === null) {
      const filledCells = this.grid.flat().filter((cell) => cell !== 0).length
      percentage = (filledCells / 81) * 100
    }

    const progressFill = document.getElementById("progressFill")
    gsap.to(progressFill, {
      width: `${percentage}%`,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  startTimer() {
    this.startTime = Date.now()
    this.timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000)
      const minutes = Math.floor(elapsed / 60)
        .toString()
        .padStart(2, "0")
      const seconds = (elapsed % 60).toString().padStart(2, "0")
      document.getElementById("timeText").textContent = `${minutes}:${seconds}`
    }, 1000)
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
      this.timerInterval = null
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

// Initialize the Sudoku Solver when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new SudokuSolver()
})
