import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  useContext,
  useState,
} from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import EllipseLoading from "../components/EllipseLoading";
import Header from "../components/Header";
import PokeModal from "../components/PokeModal";
import { PokeModalContext } from "../context/PokeModalContextProvider";
import useTypeListQuery from "../queries/TypeListQuery";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function LayoutPage() {
  const { pokemon, openModal, closeModal } = useContext(PokeModalContext);
  const [inputValue, setInputValue] = useState("");

  const { data, isFetching } = useTypeListQuery();

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      openModal({ name: event.currentTarget.value.toLowerCase(), url: "" });
      event.currentTarget.value = "";
      return;
    }
  }

  return (
    <>
      <Header />
      <main className="flex flex-col">
        <div className="flex flex-row items-center justify-between py-16 px-6 bg-slate-100">
          <h1 className="text-4xl font-medium text-slate-700">
            Select pokemons <br />
            for your team!
          </h1>
          <input
            type="text"
            placeholder="Search name or code"
            className="h-fit px-3 py-2 rounded-sm"
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="flex flex-row bg-white shadow-t-md py-6">
          <section className="w-1/4 max-w-xs border-r mr-5">
            <ul>
              <li className="px-3 my-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "text-slate-600 font-medium"
                        : "text-slate-400 hover:text-slate-800",
                      "flex flex-row items-center text-lg capitalize"
                    )
                  }
                >
                  <img
                    src={`https://codeboost.com.br/projetos/pokeapi/img/icon-poke-red.svg`}
                    className="mr-2 h-4 text-slate-400 hover:text-slate-800"
                  />
                  All
                </NavLink>
              </li>
              {isFetching && <EllipseLoading />}
              {data?.results.map((type) => {
                if (type.name == "unknown" || type.name == "shadow") {
                  return null;
                }
                return (
                  <li key={type.name} className="px-3 my-1">
                    <NavLink
                      to={`/${type.name}`}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "text-slate-600 font-medium"
                            : "text-slate-400 hover:text-slate-800",
                          "flex flex-row items-center text-lg capitalize"
                        )
                      }
                    >
                      <img
                        src={`https://codeboost.com.br/projetos/pokeapi/img/${type.name}.svg`}
                        className="mr-2 h-4 text-slate-400 hover:text-slate-800"
                      />
                      {type.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </section>
          <Outlet />
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
