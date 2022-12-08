import Tippy from "@tippyjs/react";
import { useContext, useEffect, useState } from "react";
import { PokeModalContext } from "../context/PokeModalContextProvider";
import { PokeTeamContext } from "../context/PokeTeamContextProvider";
import usePokeDetailsQuery from "../queries/PokeDetailsQuery";
import usePokeEvoDetailsQuery, {
  EvolvesToType,
} from "../queries/PokeEvoDetailsQuery";
import EllipseLoading from "./EllipseLoading";
import PokeBallLoading from "./PokeBallLoading";

type PropsType = {
  pokeName: string;
};

export default function PokeModal({ pokeName }: PropsType) {
  const {
    data: pokeData,
    isFetching: isPokeDataFetching,
    isError: isPokeDataError,
  } = usePokeDetailsQuery(pokeName);
  const { data: evoData, isFetching: isPokeEvoFetching } =
    usePokeEvoDetailsQuery(pokeName);
  const { openModal } = useContext(PokeModalContext);
  const { pokeNamesOfTeam, addPokeTeam, removePokeTeam } =
    useContext(PokeTeamContext);

  function allEvolution() {
    if (!evoData?.chain) {
      return [];
    }

    const list: EvolvesToType[] = [];

    list.push(evoData.chain);

    function evolvesLoop(evolves: EvolvesToType[]) {
      for (const evolve of evolves) {
        if (evolve) {
          list.push(evolve);
          evolvesLoop(evolve.evolves_to);
        }
      }
    }

    const evolve = evoData?.chain?.evolves_to;

    if (evolve.length > 0) {
      evolvesLoop(evolve);
    }

    return list;
  }

  const evoList = allEvolution();

  if (isPokeDataError) {
    return (
      <div className="flex flex-col justify-center items-center p-4 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white w-2/3 h-2/3 rounded-md shadow-md">
        <img
          src="https://raw.githubusercontent.com/jnovack/pokemon-svg/master/svg/25.svg"
          className="grayscale opacity-40"
        />
        <h1 className="text-3xl text-slate-300 font-medium">
          Pokemon not found!
        </h1>
      </div>
    );
  }

  if (isPokeDataFetching) {
    return (
      <div className="flex justify-center items-center p-4 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white w-2/3 h-2/3 rounded-md shadow-md">
        <PokeBallLoading />
      </div>
    );
  }

  return (
    <div className="grid p-4 grid-cols-2 gap-8 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white w-2/3 h-min-2/3 rounded-md shadow-md">
      <div className="m-auto h-full w-full flex flex-col">
        <img
          className="m-auto h-3/4"
          src={pokeData?.sprites.other.dream_world.front_default}
        />
        <div>
          <h1 className="text-xl font-medium">Evolutions:</h1>
          {isPokeEvoFetching && <EllipseLoading />}
          {evoList.map((evo) => (
            <Tippy
              key={`${evo.species.name} - Evolucion`}
              className="capitalize"
              content={`${evo.species.name}${
                evo.evolution_details[0] && evo.evolution_details[0].min_level
                  ? ` - lvl${evo.evolution_details[0].min_level}`
                  : ""
              }`}
            >
              <button
                className="capitalize ml-3 py-1 px-2 rounded-sm hover:shadow-sm hover:bg-slate-100"
                onClick={() => openModal(evo.species)}
              >
                {evo.species.name}
              </button>
            </Tippy>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl capitalize font-medium">
          {pokeData?.name}
          <span className="my-auto ml-3 text-slate-400 font-medium text-base">
            #{pokeData?.id.toString().padStart(3, "0")}
          </span>
        </h1>

        <div className="flex flex-row my-3">
          {pokeData?.types.map(({ type }) => (
            <h2
              className="border border-slate-400 bg-slate-200 text-slate-700 py-0.5 px-1 rounded capitalize text-sm shadow-sm ml-2"
              key={`${type.name} - ${pokeData.name}`}
            >
              {type.name}
            </h2>
          ))}
        </div>

        <div className="flex flex-row justify-between items-start">
          <h2 className="flex flex-col items-start font-medium">
            Height
            <span className="text-slate-400 text-sm">
              {pokeData?.height.toFixed(2)}m
            </span>
          </h2>
          <h2 className="flex flex-col items-start font-medium">
            Weight
            <span className="text-slate-400 text-sm">
              {pokeData?.weight.toFixed(2)}kg
            </span>
          </h2>
          <h2 className="flex flex-col items-start font-medium">
            Abilities
            {pokeData?.abilities.map(({ ability }) => (
              <span
                key={ability.name}
                className="text-slate-400 text-sm capitalize"
              >
                {ability.name}
              </span>
            ))}
          </h2>
        </div>

        <div>
          <h1 className="text-xl font-medium">Stats</h1>
          {pokeData?.stats.map((stat) => (
            <div
              key={`${pokeData.name} - ${stat.stat.name}`}
              className="flex flex-row items-center justify-between mt-3"
            >
              <h1 className="capitalize text-sm text-slate-800">
                {stat.stat.name.replace("special-", "sp. ")}
              </h1>
              <progress
                value={stat.base_stat}
                max="100"
                className="progress"
              ></progress>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-row justify-center mt-8">
          <button
            onClick={() => {
              if (pokeNamesOfTeam.indexOf(pokeName) >= 0) {
                removePokeTeam(pokeName);
              } else {
                addPokeTeam(pokeName);
              }
            }}
            className="btn-primary"
          >
            {pokeNamesOfTeam.indexOf(pokeName) >= 0
              ? "Remove to your team"
              : "Add to your team"}
          </button>
        </div>
      </div>
    </div>
  );
}
