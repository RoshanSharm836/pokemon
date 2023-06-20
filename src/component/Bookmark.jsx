import React, { useEffect, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

function Bookmark() {
  const [data, setData] = useState([]);
  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("pokemon")) || [];
    setData(arr);
  }, []);

  function remove(i) {
    let arr = JSON.parse(localStorage.getItem("pokemon")) || [];
    arr.splice(i, 1);
    localStorage.setItem("pokemon", JSON.stringify(arr));
    setData(arr);
    console.log(i);
  }
  return (
    <div className="bookmark">
      <Navbar />
      <div className="detail">
        {data?.map((el, i) => {
          return (
            <div className="book_item">
              <NavLink to={`/poke/${el.name}/${el.id}`}>
                <Card
                  key={i}
                  id={el.id}
                  name={el.name}
                  img={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${el.id}.svg`}
                />
              </NavLink>
              <button
                className="button-6"
                onClick={() => {
                  remove(i);
                }}
              >
                remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
