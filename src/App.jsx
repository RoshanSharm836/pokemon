import { useEffect, useRef, useState } from "react";
// import Card from "./Card";
import "./App.css";
import axios from "axios";
import Card from "./component/Card";
import { NavLink } from "react-router-dom";
import Navbar from "./component/Navbar";
export default function App() {
  const [allpoke, setAllPoke] = useState([]);
  const [filterpoke, setfilterpoke] = useState([]);
  const [typ, setTyp] = useState([]);
  const [next, setNext] = useState(0);
  const [message, setMessage] = useState("loading....");
  const [loading, setLoading] = useState(true);
  // let next = 0;
  useEffect(() => {
    filter(); // to get type of pokemon
    if (filterpoke.length > 0) {
      // checking if filterpoke have some then display that beacuse it means that user had click on any filter.
      setAllPoke([]); // remove previuos data
      setAllPoke(filterpoke); // setting filter data to display
    } else {
      getdata(next);
    }
  }, [filterpoke]);

  useEffect(() => {
    // InfinityScroll method
    window.addEventListener("scroll", InfinityScroll);
    return () => {
      window.removeEventListener("scroll", InfinityScroll);
    };
  }, [next]);

  async function getdata(len) {
    // getting data when load
    setNext(next + 1);
    setLoading(true);
    const data = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${len * 20}&limit=10`
    );
    getPokemon(data.data.results);
    setLoading(false);
  }
  // function of InfinityScroll
  async function InfinityScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight + 1 >=
      document.documentElement.scrollHeight
    ) {
      console.log("next2", next);
      getdata(next);
    }
  }
  // function of filter
  async function filter() {
    const data = await axios.get(`https://pokeapi.co/api/v2/type`);
    setTyp(data.data.results);
  }
  // getting full data of pokemon
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
  const getFilterPokemon = (result) => {
    setfilterpoke([]);
    result.map(async (el, i) => {
      try {
        if (i < 30) {
          let poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${el.pokemon.name}`
          );

          setfilterpoke((data) => [...data, poke.data]);
        }
      } catch (error) {
        console.log("error");
      }
    });

    console.log("filterpoke", filterpoke);
  };

  async function filterchange(name) {
    const data = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
    getFilterPokemon(data.data.pokemon);
  }

  return (
    <div className="App">
      <Navbar />
      <div className="wrapper">
        <div className="f"></div>
        <div className="filter">
          <span>Filter's </span>
          {typ.map((el, i) => {
            return (
              <div
                onClick={() => {
                  filterchange(el.name);
                }}
              >
                {el.name}
              </div>
            );
          })}
        </div>
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
    </div>
  );
}
