import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import PokeModal from "../components/PokeModal";
import { PokeModalContext } from "../context/PokeModalContextProvider";
import usePokeListOfTypeQuery from "../queries/PokeListOfTypeQuery";
import usePokeListQuery from "../queries/PokeListQuery";

export default function PokeListOfTypePage() {
  const { openModal } = useContext(PokeModalContext);

  const { typeName } = useParams<"typeName">();

  if (!typeName) {
    // TODO: Tratar melhor este error
    return <h1>Ocorreu um error</h1>;
  }

  const { data } = usePokeListOfTypeQuery(typeName.toLowerCase());

  return (
    <section className="w-full grid grid-cols-3 gap-4">
      {data?.pokemon.map(({ pokemon }) => (
        <PokeCard
          key={pokemon.name}
          pokeName={pokemon.name}
          onClick={() => openModal(pokemon)}
        />
      ))}
    </section>
  );
}
