import Tippy from "@tippyjs/react";
import { HTMLAttributes, useState } from "react";
import { useQuery } from "react-query";
import "tippy.js/dist/tippy.css";
import usePokeDetailsQuery from "../queries/PokeDetailsQuery";
import PokeBallLoading from "./PokeBallLoading";

type PropsType = HTMLAttributes<HTMLButtonElement> & {
  pokeName: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PokeCard({ pokeName, ...props }: PropsType) {
  const { data, isFetching } = usePokeDetailsQuery(pokeName);

  if (isFetching) {
    return (
      <div className="flex flex-col cursor-pointer items-start bg-white p-4 shadow-md rounded-md transition-all hover:-translate-y-1 hover:shadow-xl">
        <div className="flex justify-center items-center mx-auto h-36 w-36 bg-slate-100 p-6 rounded-full">
          <PokeBallLoading />
        </div>
      </div>
    );
  }

  if (!data?.sprites.other.dream_world.front_default) {
    return null;
  }

  return (
    <button
      {...props}
      className="h-fit flex flex-col items-start bg-white p-4 shadow-md rounded-md transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex justify-center items-center mx-auto h-36 w-36 bg-slate-100 p-6 rounded-full">
        <img
          src={data?.sprites.other.dream_world.front_default}
          alt={`${data?.name} image`}
          className="h-28"
        />
      </div>
      <span className="text-slate-400 font-medium text-sm">
        #{data?.id.toString().padStart(3, "0")}
      </span>
      <div className="flex flex-row w-full">
        <h1 className="font-medium text-lg capitalize mr-auto">{data?.name}</h1>
        {data?.types.map(({ type }) => (
          <Tippy
            key={`${data.name} - ${type.name}`}
            content={type.name}
            className="capitalize"
          >
            <img
              src={`https://codeboost.com.br/projetos/pokeapi/img/${type.name}.svg`}
              className="ml-2"
            />
          </Tippy>
        ))}
      </div>
    </button>
  );
}
