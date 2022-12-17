import React from "react";

export default function Cell({ id, handleClick, player }) {
  return (
    <div
      className="cell"
      onClick={() => {
        handleClick(id);
      }}
    >
      {player}
    </div>
  );
}
