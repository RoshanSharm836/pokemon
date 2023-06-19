import { useEffect, useRef, useState } from "react";
// import Card from "./Card";
import "./App.css";
import axios from "axios";
import Card from "./component/Card";
import { NavLink } from "react-router-dom";
import Navbar from "./component/Navbar";
export default function App() {
  const [allpoke, setAllPoke] = useState([]);
  const [next, setNext] = useState(0);
  const [message, setMessage] = useState("loading....");
  const [loading, setLoading] = useState(true);
  // let next = 0;
  useEffect(() => {
    getdata(next);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", InfinityScroll);
    return () => {
      window.removeEventListener("scroll", InfinityScroll);
    };
  }, [next]);

  async function getdata(len) {
    console.log(len);
    // next++;
    setNext(next + 1);
    setLoading(true);
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${len * 20}&limit=10`
    );
    getPokemon(data.data.results);
    setLoading(false);
  }
  async function InfinityScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      console.log("next2", next);
      getdata(next);
    }
  }

  const getPokemon = (result) => {
    result.map(async (el) => {
      try {
        let poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${el.name}`
        );
        setAllPoke((data) => [...data, poke.data]);
        setLoading(false);
      } catch (error) {
        setMessage("error");
      }
    });
  };

  return (
    <div className="App">
      <Navbar />

      <div className="card">
        {!loading
          ? allpoke
              ?.sort((a, b) => {
                return a.id - b.id;
              })
              .map((el, i) => {
                return (
                  <NavLink to={`/poke/${el.name}/${el.id}`}>
                    <Card
                      key={i}
                      id={el.id}
                      name={el.name}
                      img={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${el.id}.svg`}
                    />
                  </NavLink>
                );
              })
          : message}
      </div>
    </div>
  );
}
