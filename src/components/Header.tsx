import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-white px-6 py-3 shadow-md">
      <Link to="/" className="text-2xl font-medium text-slate-700">
        POKEDEX
      </Link>
      <Link className="btn-primary" to="/myteam">
        {" "}
        Your team
      </Link>
    </header>
  );
}
