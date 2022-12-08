import React, { useState } from "react";

type PokeShortDetailsType = {
  name: string;
  url: string;
};

interface PokeModalContextType {
  pokemon?: PokeShortDetailsType;
  openModal: (pokemon: PokeShortDetailsType) => void;
  closeModal: () => void;
}

export const PokeModalContext = React.createContext({} as PokeModalContextType);

export const PokeModalContextProvider = (props: React.PropsWithChildren) => {
  const [pokemon, setPokemon] = useState<PokeShortDetailsType | undefined>(
    undefined
  );

  function openModal(pokemon: PokeShortDetailsType) {
    setPokemon(pokemon);
  }

  function closeModal() {
    setPokemon(undefined);
  }

  return (
    <PokeModalContext.Provider value={{ pokemon, openModal, closeModal }}>
      {props.children}
    </PokeModalContext.Provider>
  );
};
