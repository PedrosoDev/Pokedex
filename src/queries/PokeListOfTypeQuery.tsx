import { useQuery } from "react-query";

export type PokeListOfTypeQueryType = {
  id: number;
  name: string;
  pokemon: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: 1;
  }[];
};

export async function pokeListOfTypeRequest(type: string) {
  return await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
}

export default function usePokeListOfTypeQuery(type: string) {
  return useQuery<PokeListOfTypeQueryType>(
    ["poke", "list", "type", type],
    async () => {
      const response = await pokeListOfTypeRequest(type);

      return await response.json();
    }
  );
}
