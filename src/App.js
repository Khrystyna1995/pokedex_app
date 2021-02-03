import React, { useState, useEffect } from 'react';
import {getAllPokemon, getPokemon} from "./services/pokemon";
import Card from './components/Card';
import NavBar from "./components/NavBar";
import './App.css';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loadMoreUrl, setLoadMoreUrl ] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setLoadMoreUrl(response.next);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const loadMore = async () => {
    setLoading(true);
    let data = await getAllPokemon(loadMoreUrl);
    await loadPokemon(data.results)
    setLoadMoreUrl(data.next);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      console.log(pokemonRecord);
      return pokemonRecord
    }))

    setPokemonData(_pokemonData)
  }
  return (
    <div>
      {loading ? <h1>Loading...</h1>: (
          <>
          <NavBar/>
          <div className="container">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon}/>
            })}
          </div>
            <div className="btn">
              <button onClick={loadMore}> Load More </button>
            </div>

          </>
      )}
    </div>
  );
}

export default App;
