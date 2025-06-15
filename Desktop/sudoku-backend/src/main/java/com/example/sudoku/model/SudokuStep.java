package com.example.sudoku.model;

public class SudokuStep {

    public int row;
    public int col;
    public int value;

    public SudokuStep(int row, int col, int value) {
        this.row = row;
        this.col = col;
        this.value = value;
    }
}
