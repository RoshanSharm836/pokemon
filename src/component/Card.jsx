import React from "react";

export default function Card({ name, img, key, id }) {
  function handle(params) {
    console.log(name);
  }
  return (
    <div className="card_item" onClick={handle}>
      <img src={img} alt="logo" width="200px" />
      <div>{name}</div>
      <div>{id}</div>
      <span>{"more details -->"}</span>
    </div>
  );
}
