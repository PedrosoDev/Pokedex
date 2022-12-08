import { useQuery } from "react-query";

export type PokeDetailsQueryType = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
  height: number;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
};

export async function pokeDetailsRequest(pokeName: string) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
}

export default function usePokeDetailsQuery(pokeName: string) {
  return useQuery<PokeDetailsQueryType>(
    ["poke", "details", pokeName],
    async () => {
      const response = await pokeDetailsRequest(pokeName);

      return await response.json();
    }
  );
}
