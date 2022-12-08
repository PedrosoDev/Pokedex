import { useCallback, useContext } from "react";
import Header from "../components/Header";
import PokeCard from "../components/PokeCard";
import PokeModal from "../components/PokeModal";
import { PokeModalContext } from "../context/PokeModalContextProvider";
import { PokeTeamContext } from "../context/PokeTeamContextProvider";

export default function PokeListTeamPage() {
  const { pokemon, openModal, closeModal } = useContext(PokeModalContext);
  const { pokeNamesOfTeam } = useContext(PokeTeamContext);

  return (
    <>
      <Header />
      <main className="w-full">
        <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pokeNamesOfTeam?.map((pokeName) => (
            <PokeCard
              key={pokeName}
              pokeName={pokeName}
              onClick={() => openModal({ name: pokeName, url: "" })}
            />
          ))}
        </div>
      </main>
      {pokemon && (
        <div>
          <button
            onClick={closeModal}
            className="fixed flex justify-center items-center top-0 w-full h-full bg-black bg-opacity-50"
          ></button>
          <PokeModal pokeName={pokemon.name} />
        </div>
      )}
    </>
  );
}
