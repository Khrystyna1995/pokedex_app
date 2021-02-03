import React, { useState } from 'react';
import './style.css';
import '../../css/media.css';
import typeColors from "../../helpers/typeColors";
import ShowInfo from "../ShowInfo";
import {getAllPokemon, getPokemon} from "../../services/pokemon";

function Card({ pokemon }) {
    const [pokemonData, setPokemonData] = useState([]);
    const initialUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=12';

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon.url);
            console.log(pokemonRecord);
            return pokemonRecord
        }))

        setPokemonData(_pokemonData)
    }
    const [pokemonInfo, pokemonInfoShow] = ShowInfo(
        <div className="Card-info">
            <div>
                <table className="styled-table">
                    <tbody>
                    <tr>
                        <td>Type</td>
                        <td>{pokemon.types.map(type => {
                            return (
                                <div>
                                    {type.type.name}
                                </div>
                            )
                        })}</td>
                    </tr>
                    <tr>
                        <td>Attack</td>
                        <td>{pokemon.stats[1].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Defense</td>
                        <td>{pokemon.stats[2].base_stat}</td>
                    </tr>
                    <tr>
                        <td>HP</td>
                        <td>{pokemon.stats[0].base_stat}</td>
                    </tr>
                    <tr>
                        <td>SP Attack</td>
                        <td>{pokemon.stats[3].base_stat}</td>
                    </tr>
                    <tr>
                        <td>SP Defense</td>
                        <td>{pokemon.stats[4].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Speed</td>
                        <td>{pokemon.stats[5].base_stat}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>{pokemon.weight}</td>
                    </tr>
                    <tr>
                        <td>Total moves</td>
                        <td>{pokemon.weight}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
    return (
        <div className="Card" onClick={pokemonInfoShow}>
                <div className="Card_img">
                    <img src={pokemon.sprites.front_default} alt="" />
                </div>
                <div className="Card_Name">
                    {pokemon.name}
                </div>
                <div className="Card_types">
                    {pokemon.types.map(type => {
                        return (
                            <div className="Card_type" style={{backgroundColor: typeColors[type.type.name] }}>
                                {type.type.name}
                            </div>
                        )
                    })}
                </div>
            <div>
                {pokemonInfo}
            </div>
        </div>


    )
}

export default Card;
