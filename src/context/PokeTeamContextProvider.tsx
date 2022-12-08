import React, { useState } from "react";

type PokeShortDetailsType = {
  name: string;
  url: string;
};

interface PokeTeamContextType {
  pokeNamesOfTeam: string[];
  addPokeTeam: (pokeName: string) => boolean;
  removePokeTeam: (pokeName: string) => void;
}

export const PokeTeamContext = React.createContext({} as PokeTeamContextType);

export const PokeTeamContextProvider = (props: React.PropsWithChildren) => {
  const [pokeNamesOfTeam, setPokesNameOfTeam] = useState<string[]>([]);

  function addPokeTeam(pokeName: string): boolean {
    if (pokeNamesOfTeam.length >= 5) {
      return false;
    }

    setPokesNameOfTeam((value) => {
      return [...value, pokeName];
    });

    return true;
  }

  function removePokeTeam(pokeName: string) {
    setPokesNameOfTeam((value) => value.filter((poke) => poke != pokeName));
  }

  return (
    <PokeTeamContext.Provider
      value={{
        pokeNamesOfTeam,
        addPokeTeam,
        removePokeTeam,
      }}
    >
      {props.children}
    </PokeTeamContext.Provider>
  );
};
