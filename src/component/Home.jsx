import axios from "axios";
import React, { useRef, useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar";

export default function Home() {
  const [name, setName] = useState(null);
  const [data, setAllPoke] = useState([]);
  const [message, setMessage] = useState("loading....");
  const [loading, setLoading] = useState(true);

  const handle = async () => {
    try {
      console.log(name);
      let poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setAllPoke((data) => [poke.data]);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setMessage("error");
    }
  };

  return (
    <div className="home_container">
      <Navbar />
      <div className="home">
        <h1>pokemon card</h1>
        <div className="home_box">
          <input
            type="text"
            placeholder="serach"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={handle}>serach</button>
        </div>
        {!loading ? (
          <div className="home_item">
            <Card
              id={data[0].id}
              name={data[0].name}
              img={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data[0].id}.svg`}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
