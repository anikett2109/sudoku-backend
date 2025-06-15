package com.example.sudoku.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.example.sudoku.service.SudokuSolver;

@RestController
@RequestMapping("/api/sudoku")
@CrossOrigin(origins = "*")
public class StreamController {

    @Autowired
    private SudokuSolver sudokuSolver;

    @PostMapping(value = "/stream", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamSolve(@RequestBody int[][] board) {
        SseEmitter emitter = new SseEmitter();

        new Thread(() -> {
            try {
                if (!sudokuSolver.isValidBoard(board)) {
                    emitter.send(SseEmitter.event()
                            .data("INVALID_BOARD")
                            .name("validation"));
                    emitter.complete();
                    return;
                }
                sudokuSolver.solveWithSteps(board, emitter);
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }).start();

        return emitter;
    }
}
