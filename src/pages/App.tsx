import { Route, Routes } from "react-router-dom";
import PokeModal from "../components/PokeModal";
import { PokeModalContextProvider } from "../context/PokeModalContextProvider";
import { PokeTeamContextProvider } from "../context/PokeTeamContextProvider";
import LayoutPage from "./LayoutPage";
import PokeListOfTypePage from "./PokeListOfTypePage";
import PokeListPage from "./PokeListPage";
import PokeListTeamPage from "./PokeTeamListPage";

export default function App() {
  return (
    <PokeModalContextProvider>
      <PokeTeamContextProvider>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<PokeListPage />} />
            <Route path="/:typeName" element={<PokeListOfTypePage />} />
          </Route>
          <Route path="/myteam" element={<PokeListTeamPage />} />
        </Routes>
      </PokeTeamContextProvider>
    </PokeModalContextProvider>
  );
}
