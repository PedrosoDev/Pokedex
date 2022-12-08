import { Disclosure, Listbox } from "@headlessui/react";
import { KeyboardEvent, useContext, useEffect } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
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
  const { data, isFetching } = useTypeListQuery();
  const { typeName } = useParams<"typeName">();

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
        <div className="flex flex-col sm:flex-row items-center justify-between py-16 px-6 bg-slate-100">
          <h1 className="text-4xl font-medium text-slate-700">
            Select pokemons <br />
            for your team!
          </h1>
          <input
            type="text"
            placeholder="Search name or code"
            className="h-fit px-3 py-2 rounded-sm mt-9 sm:mt-0 border"
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="flex flex-col w-full sm:flex-row bg-white shadow-t-md py-6">
          <Listbox
            as="div"
            className="relative bg-white border-2 rounded py-2 px-4 w-56 mx-auto sm:hidden z-10"
          >
            <Listbox.Button className="w-fit capitalize text-slate-400">
              Show:{" "}
              <strong className="text-slate-500">
                {typeName ? typeName : "all"}
              </strong>
            </Listbox.Button>
            <Listbox.Options className="w-full left-0 absolute mt-3 bg-white shadow-md h-52 overflow-auto overscroll-none">
              <Listbox.Option value="all" className="flex px-3 my-1">
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
              </Listbox.Option>
              {isFetching && <EllipseLoading />}
              {data?.results.map((type) => {
                if (type.name == "unknown" || type.name == "shadow") {
                  return null;
                }
                return (
                  <Listbox.Option
                    value={type.name}
                    key={type.name}
                    className="px-3 my-1"
                  >
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
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Listbox>
          <section className="hidden sm:block w-1/4 max-w-xs border-r mr-5">
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
          <div className="w-full px-6 pt-6 sm:p-0">
            <Outlet />
          </div>
        </div>
      </main>
      {pokemon && (
        <div>
          <button
            onClick={closeModal}
            className="z-10 fixed flex justify-center items-center top-0 w-full h-full bg-black bg-opacity-50"
          ></button>
          <PokeModal pokeName={pokemon.name} />
        </div>
      )}
    </>
  );
}
