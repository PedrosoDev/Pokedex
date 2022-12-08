import { useQuery } from "react-query";
import {
  PokeSpecieDetailsQueryType,
  pokeSpecieDetailsRequest,
} from "./PokeSpecieDetailsQuery";

export type EvolutionDetailsType = {
  min_level: number;
  trigger: {
    name: string;
  };
};

export type EvolvesToType = {
  evolution_details: EvolutionDetailsType[];
  evolves_to: EvolvesToType[];
  species: {
    name: string;
    url: string;
  };
};

export type PokeEvoDetailsType = {
  chain: EvolvesToType;
};

export async function pokeEvoDetailsRequest(pokeName: string) {
  const response = await pokeSpecieDetailsRequest(pokeName);
  const data: PokeSpecieDetailsQueryType = await response.json();

  return await fetch(data.evolution_chain.url);
}

export default function usePokeEvoDetailsQuery(pokeName: string) {
  return useQuery<PokeEvoDetailsType>(
    ["poke", "evo", "details", pokeName],
    async () => {
      const response = await pokeEvoDetailsRequest(pokeName);

      return await response.json();
    }
  );
}
