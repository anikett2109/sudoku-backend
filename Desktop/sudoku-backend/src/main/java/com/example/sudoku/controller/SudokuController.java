package com.example.sudoku.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sudoku.service.SudokuService;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin(origins = "*") // optional: allows frontend to talk to this backend
public class SudokuController {

    @Autowired
    private SudokuService sudokuService;

    @PostMapping("/solve")
    public int[][] solveSudoku(@RequestBody int[][] board) {
        return sudokuService.solve(board);
    }

    @GetMapping("/generate")
    public int[][] generateBoard() {
        return sudokuService.generateRandomBoard();
    }

    @PostMapping("/validate")
    public boolean validateBoard(@RequestBody int[][] board) {
        return sudokuService.isValidBoard(board);
    }
}
