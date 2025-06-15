package com.example.sudoku.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.sudoku.model.SudokuStep;

@Service
public class SudokuSolver {

    public boolean solveWithSteps(int[][] board, SseEmitter emitter) throws IOException, InterruptedException {
        return solve(board, emitter);
    }

    public boolean isValidBoard(int[][] board) {
        // Reuse the validation logic from SudokuService
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] != 0) {
                    // Check value range
                    if (board[i][j] < 1 || board[i][j] > 9) {
                        return false;
                    }

                    // Check row and column
                    for (int k = 0; k < 9; k++) {
                        if (k != j && board[i][k] == board[i][j]) {
                            return false;
                        }
                        if (k != i && board[k][j] == board[i][j]) {
                            return false;
                        }
                    }

                    // Check 3x3 box
                    int boxRow = 3 * (i / 3);
                    int boxCol = 3 * (j / 3);
                    for (int r = boxRow; r < boxRow + 3; r++) {
                        for (int c = boxCol; c < boxCol + 3; c++) {
                            if ((r != i || c != j) && board[r][c] == board[i][j]) {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return true;
    }

    private boolean solve(int[][] board, SseEmitter emitter) throws IOException, InterruptedException {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == 0) {
                    for (int num = 1; num <= 9; num++) {
                        if (isSafe(board, row, col, num)) {
                            board[row][col] = num;
                            emitter.send(new SudokuStep(row, col, num));
                            Thread.sleep(50);

                            if (solve(board, emitter)) {
                                return true;
                            }

                            board[row][col] = 0;
                            emitter.send(new SudokuStep(row, col, 0));
                            Thread.sleep(50);
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    private boolean isSafe(int[][] board, int row, int col, int num) {
        for (int x = 0; x < 9; x++) {
            if (board[row][x] == num || board[x][col] == num) {
                return false;
            }

            int boxRow = 3 * (row / 3) + x / 3;
            int boxCol = 3 * (col / 3) + x % 3;
            if (board[boxRow][boxCol] == num) {
                return false;
            }
        }
        return true;
    }

    public int[][] getSampleBoard() {
        return new int[][]{
            {5, 3, 0, 0, 7, 0, 0, 0, 0},
            {6, 0, 0, 1, 9, 5, 0, 0, 0},
            {0, 9, 8, 0, 0, 0, 0, 6, 0},
            {8, 0, 0, 0, 6, 0, 0, 0, 3},
            {4, 0, 0, 8, 0, 3, 0, 0, 1},
            {7, 0, 0, 0, 2, 0, 0, 0, 6},
            {0, 6, 0, 0, 0, 0, 2, 8, 0},
            {0, 0, 0, 4, 1, 9, 0, 0, 5},
            {0, 0, 0, 0, 8, 0, 0, 7, 9}
        };
    }
}
