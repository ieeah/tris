import React, { useState, useEffect } from "react";
import Cell from "./Cell";

export default function Field() {
  const [p1cells, setP1Cells] = useState([]);
  const [p2cells, setP2Cells] = useState([]);
  const [cells] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [clickedCells, setClickedCells] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [turno, setTurno] = useState("p1");
  const [winner, setWinner] = useState("");
  const [winningRows] = useState([
    [0, 1, 2],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
  ]);

  const handleClick = (id) => {
    if (!clickedCells.find((item) => item === id)) {
      setClickedCells([...clickedCells, id]);
      if (turno === "p1") {
        setTurno("p2");
        setP1Cells([...p1cells, id]);
      } else {
        setTurno("p1");
        setP2Cells([...p2cells, id]);
      }
    }
  };

  const checkIfDraft = () => {
    if (clickedCells.length === 9 && winner === "") {
      setEndGame(true);
    }
  };

  const checkCells = () => {
    if (!checkP1()) {
      checkP2();
    }
  };

  const checkP1 = () => {
    let win = false;
    winningRows.forEach((combo) => {
      if (!win) {
        win = combo.every((id) => p1cells.indexOf(id) > -1);
      } else {
        setWinner("p1");
        setEndGame(true);
      }
    });
  };

  const checkP2 = () => {
    let win = false;
    winningRows.forEach((combo) => {
      if (!win) {
        win = combo.every((id) => p2cells.indexOf(id) > -1);
      } else {
        setWinner("p2");
        setEndGame(true);
      }
    });
  };

  const resetGame = () => {
    setP1Cells([]);
    setP2Cells([]);
    setTurno("p1");
    setClickedCells([]);
    setWinner("");
    setEndGame(false);
  };

  const handleCellContent = (id) => {
    if (p1cells.includes(id)) {
      return "X";
    } else if (p2cells.includes(id)) {
      return "O";
    } else {
      return "";
    }
  };

  useEffect(() => {
    checkCells();
  }, [p1cells, p2cells]);

  useEffect(() => {
    checkIfDraft();
  }, [clickedCells]);

  return (
    <div className="field-wrapper">
      {!endGame && (
        <>
          <h1 className="display">Welcome to tris game!</h1>
          <div className="field">
            {cells.map((cell) => {
              return (
                <Cell
                  id={cell}
                  handleClick={handleClick}
                  key={cell}
                  player={handleCellContent(cell)}
                />
              );
            })}
          </div>
          <div>È il turno del {turno}</div>
        </>
      )}

      {endGame && (
        <>
          {winner !== "" && <h1>HA VINTO {winner.toUpperCase()}</h1>}
          {winner === "" && <h1>PAREGGIO!</h1>}
          <button
            onClick={resetGame}
            style={{
              height: "50px",
              backgroundColor: "rgb(50, 210, 157)",
              color: "white",
              fontWeight: "bold",
              display: "grid",
              placeContent: "center",
              marginTop: "2rem",
              borderRadius: "10px",
              cursor: "pointer",
              border:"none"
            }}
          >
            Ricomincia a giocare!
          </button>
        </>
      )}
    </div>
  );
}
