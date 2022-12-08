import { useContext, useState } from "react";
import { createSearchParams, Link, useSearchParams } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import PokeModal from "../components/PokeModal";
import { PokeModalContext } from "../context/PokeModalContextProvider";
import usePokeListQuery from "../queries/PokeListQuery";

export default function PokeListPage() {
  const { openModal } = useContext(PokeModalContext);

  const [searchParams] = useSearchParams();
  let page = Number.parseInt(searchParams.get("page") || "1");

  if (Number.isNaN(page)) {
    page = 1;
  }

  const { data } = usePokeListQuery(page <= 1 ? 1 : page);

  return (
    <section className="w-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.results.map((poke) => (
          <PokeCard
            key={poke.name}
            pokeName={poke.name}
            onClick={() => openModal(poke)}
          />
        ))}
      </div>
      <div className="flex flex-row justify-between items-center px-6 py-3">
        <Link
          to={{
            search: createSearchParams({
              page: `${!data?.previous ? 1 : page - 1}`,
            }).toString(),
          }}
          className="btn-primary"
        >
          Previous
        </Link>
        <Link
          to={{
            search: createSearchParams({
              page: `${!data?.next ? page : page + 1}`,
            }).toString(),
          }}
          className="btn-primary"
        >
          Next
        </Link>
      </div>
    </section>
  );
}
