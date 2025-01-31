import React from "react";

const Colors = ({ colors }) => {
  return (
    <div className="product__colors">
      {colors.map((color, index) => (
        <button style={{ background: color }} key={index}></button>
      ))}
    </div>
  );
};

export default Colors;
