import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { listPokemon } from "../store";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useRecoilState(listPokemon);
  useEffect(() => {
    const getPokemon = async () => {
      const url = "https://pokeapi.co/api/v2/pokemon";
      const response = await fetch(url);
      const body = await response.json();
      setPokemon(body.results);
    };

    getPokemon();
  }, []);

  return (
    <>
      <div className="tw-grid tw-grid-cols-4 tw-gap-y-2 tw-gap-x-2 tw-mt-10 container">
        {pokemon.map((poke) => (
          <div key={poke.url}>
            <div className="tw-p-4 tw-text-white tw-capitalize tw-border tw-rounded-lg hover:tw-text-indigo-950 hover:tw-border-neutral-400 tw-cursor-pointer">
              {poke.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
