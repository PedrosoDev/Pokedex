import { useQuery } from "react-query";

export type PokeSpecieDetailsQueryType = {
  id: number;
  name: string;
  evolution_chain_id?: number;
  evolution_chain: { url: string };
};

export async function pokeSpecieDetailsRequest(pokeName: string) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}/`);
}

export default function usePokeSpecieDetailsQuery(pokeName: string) {
  return useQuery<PokeSpecieDetailsQueryType>(
    ["poke", "specie", "details", pokeName],
    async () => {
      const response = await pokeSpecieDetailsRequest(pokeName);

      const data: PokeSpecieDetailsQueryType = await response.json();

      const evoUrlSplit = data.evolution_chain.url.split("/");

      data.evolution_chain_id = Number(evoUrlSplit[evoUrlSplit.length - 2]);

      return data;
    }
  );
}
