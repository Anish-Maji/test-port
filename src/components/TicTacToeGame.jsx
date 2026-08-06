import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Sparkles, User, Bot, Award } from 'lucide-react';
import '../styles/PlayPage.css';

// Winning line combinations (3x3 grid)
const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Helper to check for a winner
const checkWinner = (board) => {
  for (let combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'DRAW', combo: [] };
  }
  return null;
};

// Minimax algorithm for unbeatable/smart AI
const minimax = (board, depth, isMaximizing) => {
  const result = checkWinner(board);
  if (result) {
    if (result.winner === 'O') return 10 - depth;
    if (result.winner === 'X') return depth - 10;
    if (result.winner === 'DRAW') return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const getBestMove = (board) => {
  // Add 15% randomness for casual fun so AI isn't strictly brutal every single time
  if (Math.random() < 0.15) {
    const emptyIndices = board.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
    if (emptyIndices.length > 0) {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
  }

  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = 'O';
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};

export const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // User is 'X', AI is 'O'
  const [isThinking, setIsThinking] = useState(false);
  const [gameResult, setGameResult] = useState(null); // null | { winner: 'X'|'O'|'DRAW', combo: [] }
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });

  // Handle cell click by user (X)
  const handleCellClick = (index) => {
    if (board[index] || !isXNext || isThinking || gameResult) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winStatus = checkWinner(newBoard);
    if (winStatus) {
      setGameResult(winStatus);
      updateScores(winStatus.winner);
    } else {
      setIsXNext(false);
    }
  };

  // AI Turn (O)
  useEffect(() => {
    if (!isXNext && !gameResult) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const aiMove = getBestMove([...board]);
        if (aiMove !== -1) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);

          const winStatus = checkWinner(newBoard);
          if (winStatus) {
            setGameResult(winStatus);
            updateScores(winStatus.winner);
          } else {
            setIsXNext(true);
          }
        }
        setIsThinking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, board, gameResult]);

  const updateScores = (winner) => {
    setScores((prev) => {
      if (winner === 'X') return { ...prev, xWins: prev.xWins + 1 };
      if (winner === 'O') return { ...prev, oWins: prev.oWins + 1 };
      if (winner === 'DRAW') return { ...prev, draws: prev.draws + 1 };
      return prev;
    });
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameResult(null);
    setIsThinking(false);
  };

  // Status message
  const getStatusMessage = () => {
    if (gameResult) {
      if (gameResult.winner === 'X') return 'You Won! 🎉 (X)';
      if (gameResult.winner === 'O') return 'Computer Won! (O)';
      return "It's a draw!";
    }
    if (isThinking) return 'Computer is thinking... (O)';
    return isXNext ? 'Your turn (X)' : "Computer's turn (O)";
  };

  return (
    <div className="ttt-game-container">
      {/* Left side text header */}
      <div className="ttt-header-content">
        <p className="ttt-sub-label">Can you beat me?</p>
        <h1 className="ttt-main-title">Tic-tac-toe, on the house.</h1>
        <p className="ttt-description">
          A short break from case studies. <br />You're X, AI is playing O. Let's take turns and see who removes the last bit of friction.
        </p>

        {/* Scorecard Pill */}
        <div className="ttt-scorecard">
          <div className="score-item">
            <span className="score-label">You (X)</span>
            <span className="score-val">{scores.xWins}</span>
          </div>
          <div className="score-divider">•</div>
          <div className="score-item">
            <span className="score-label">Draws</span>
            <span className="score-val">{scores.draws}</span>
          </div>
          <div className="score-divider">•</div>
          <div className="score-item">
            <span className="score-label">AI (O)</span>
            <span className="score-val">{scores.oWins}</span>
          </div>
        </div>
      </div>

      {/* Right side board & controls */}
      <div className="ttt-board-section">
        <div className="ttt-status-banner">{getStatusMessage()}</div>

        {/* 3x3 Board */}
        <div className="ttt-board-card">
          <div className="ttt-grid">
            {board.map((cell, idx) => {
              const isWinningCell = gameResult?.combo?.includes(idx);
              return (
                <button
                  key={idx}
                  className={`ttt-cell ${isWinningCell ? 'winning-cell' : ''} ${cell ? `marked-${cell.toLowerCase()}` : ''}`}
                  onClick={() => handleCellClick(idx)}
                  disabled={Boolean(cell) || !isXNext || isThinking || Boolean(gameResult)}
                  aria-label={`Cell ${idx + 1}, ${cell ? `Marked ${cell}` : 'Empty'}`}
                >
                  {cell && <span className="ttt-cell-mark">{cell}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reset button matching design mock */}
        <button className="ttt-reset-btn" onClick={resetBoard}>
          <span>Reset board</span>
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
};

export default TicTacToeGame;
