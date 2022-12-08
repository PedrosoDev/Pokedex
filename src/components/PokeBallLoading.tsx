export default function PokeBallLoading({ size = "64px" }: { size?: string }) {
  return (
    <img
      src={`https://codeboost.com.br/projetos/pokeapi/img/icon-poke-red.svg`}
      style={{ height: size }}
      className="animate-spin"
    />
  );
}
