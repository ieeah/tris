import React, { useState, useEffect } from "react";
import Cell from "./Cell";

export default function Field() {
  const [p1cells, setP1Cells] = useState([]);
  const [p2cells, setP2Cells] = useState([]);
  const [turno, setTurno] = useState("p1");
  const [cells] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [clickedCells, setClickedCells] = useState([]);
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

  const checkCells = () => {
    if(!checkP1()) {
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
      }
    });
    // return win;
  };

  const checkP2 = () => {
    let win = false;
    winningRows.forEach((combo) => {
      if (!win) {
        win = combo.every((id) => p2cells.indexOf(id) > -1);
      } else {
        setWinner("p2");
      }
    });
    // return win;
  };

  const handleCellContent = (id) => {
    if(p1cells.includes(id)) {
      return "X"
    } else if(p2cells.includes(id)) {
      return "O"
    } else {
      return ""
    }
  }

  useEffect(() => {
    console.log({ p1cells, p2cells });
    checkCells();
  }, [p1cells, p2cells]);

  useEffect(() => {
    if(winner !== "") {
      alert(`ha vinto ${winner}`);
    }
  }, [winner])

  return (
    <div className="field-wrapper">
      <h1 className="display">Welcome to tris game!</h1>
      <div className="field">
        {cells.map((cell) => {
          return <Cell id={cell} handleClick={handleClick} key={cell} player={handleCellContent(cell)} />;
        })}
      </div>
      <div>È il turno del {turno}</div>
    </div>
  );
}
