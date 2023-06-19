import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Singlepoke() {
  const [data, setData] = useState({});
  const { id, name } = useParams();
  console.log("id", data);
  useEffect(() => {
    handle();
  }, []);

  async function handle() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
      setData(res.data);
    });
    await console.log(data);
  }
  return (
    <div className="container">
      <Navbar />
      <div className="box">
        <img
          src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
          alt="logo"
          width="250px"
        />
        <div>{data?.name}</div>
        <div className="poke_type">
          {data?.types?.map((el) => (
            <span>{el.type.name + " "}</span>
          ))}
        </div>
        <div className="poke_ability">
          {data?.abilities?.map((el) => (
            <span>{el.ability.name + " "}</span>
          ))}
        </div>
        <div className="poke_stat">
          {data?.stats?.map((el) => (
            <div>
              {el.stat.name}:{el.base_stat}
            </div>
          ))}
        </div>
        <div className="poke_height">{"height:" + data.height}</div>
      </div>
    </div>
  );
}

export default Singlepoke;
