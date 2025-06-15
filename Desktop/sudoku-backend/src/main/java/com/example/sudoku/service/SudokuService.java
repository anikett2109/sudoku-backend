package com.example.sudoku.service;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class SudokuService {

    private static final int SIZE = 9;

    public int[][] generateRandomBoard() {
        int[][] board = new int[9][9];
        solve(board); // fill a fully solved board

        // Remove 40 random cells to make it a puzzle
        int cellsToRemove = 40;
        Random rand = new Random();
        while (cellsToRemove > 0) {
            int row = rand.nextInt(9);
            int col = rand.nextInt(9);
            if (board[row][col] != 0) {
                board[row][col] = 0;
                cellsToRemove--;
            }
        }
        return board;
    }

    public int[][] solve(int[][] board) {
        if (!isValidBoard(board)) {
            throw new IllegalArgumentException("Invalid Sudoku Board");
        }

        if (!solveSudokuRecursive(board, 0, 0)) {
            throw new IllegalStateException("Sudoku puzzle is unsolvable");
        }

        return board;
    }

    private boolean solveSudokuRecursive(int[][] board, int row, int col) {
        if (row == SIZE) {
            return true;
        }

        int nextRow = (col == SIZE - 1) ? row + 1 : row;
        int nextCol = (col == SIZE - 1) ? 0 : col + 1;

        if (board[row][col] != 0) {
            return solveSudokuRecursive(board, nextRow, nextCol);
        }

        for (int num = 1; num <= SIZE; num++) {
            if (isSafe(board, row, col, num)) {
                board[row][col] = num;
                if (solveSudokuRecursive(board, nextRow, nextCol)) {
                    return true;
                }
                board[row][col] = 0;
            }
        }
        return false;
    }

    private boolean isSafe(int[][] board, int row, int col, int num) {
        for (int x = 0; x < SIZE; x++) {
            if (board[row][x] == num || board[x][col] == num) {
                return false;
            }
        }

        int boxRowStart = row - row % 3;
        int boxColStart = col - col % 3;

        for (int i = boxRowStart; i < boxRowStart + 3; i++) {
            for (int j = boxColStart; j < boxColStart + 3; j++) {
                if (board[i][j] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    public boolean isValidBoard(int[][] board) {
        for (int i = 0; i < SIZE; i++) {
            for (int j = 0; j < SIZE; j++) {
                if (board[i][j] != 0) {
                    if (board[i][j] < 1 || board[i][j] > 9) {
                        return false;
                    }
                }
            }

            boolean[] rowCheck = new boolean[SIZE];
            boolean[] colCheck = new boolean[SIZE];
            boolean[] boxCheck = new boolean[SIZE];

            for (int j = 0; j < SIZE; j++) {
                if (board[i][j] != 0 && rowCheck[board[i][j] - 1]) {
                    return false;
                }
                if (board[i][j] != 0) {
                    rowCheck[board[i][j] - 1] = true;
                }

                if (board[j][i] != 0 && colCheck[board[j][i] - 1]) {
                    return false;
                }
                if (board[j][i] != 0) {
                    colCheck[board[j][i] - 1] = true;
                }

                int boxRow = (i / 3) * 3 + j / 3;
                int boxCol = (i % 3) * 3 + j % 3;

                if (board[boxRow][boxCol] != 0 && boxCheck[board[boxRow][boxCol] - 1]) {
                    return false;
                }
                if (board[boxRow][boxCol] != 0) {
                    boxCheck[board[boxRow][boxCol] - 1] = true;
                }
            }
        }

        return true;
    }
}
