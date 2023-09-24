import { Box, IconButton, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import "./App.css";
import Grimoire from "./components/Grimoire";
import { useContext, useState } from "react";
import styled from "@emotion/styled";
import Sizzle from "sizzle";
import { useEffect } from "react";
import WillpowerTracker from "./components/WillpowerTracker";
import { saveLocalStorage } from "./components/utility";
import { ApplicationContext } from "./context/ApplicationContext";

export default function App() {
  const { inEditMode, setEditMode } = useContext(ApplicationContext);
  //console.log(inEditMode);

  // const [inEditMode, setEditMode] = useState(false);
  const [spellList, setSpellList] = useState([]);
  const [baseWillpower, setBaseWillpower] = useState(0);
  const [currentWillpower, setCurrentWillpower] = useState(0);

  useEffect(() => {
    const loadLocalStorage = async () => {
      const spellList = JSON.parse(
        localStorage.getItem("spellList") || JSON.stringify([])
      );
      setSpellList(spellList);

      const baseWillpower = JSON.parse(
        localStorage.getItem("baseWillpower") || 0
      );
      setBaseWillpower(baseWillpower);

      const currentWillpower = JSON.parse(
        localStorage.getItem("currentWillpower") || 0
      );
      setCurrentWillpower(currentWillpower);
    };
    loadLocalStorage();
  }, [setBaseWillpower, setCurrentWillpower, setSpellList]);

  function toggleEditMode() {
    if (inEditMode) {
      const selectedSpells = Sizzle("[data-testid=CheckBoxIcon]").map(
        (e, i) => e.parentElement.firstChild.defaultValue
      );
      setSpellList(selectedSpells);
      saveLocalStorage("spellList", selectedSpells);

      const baseWillpower = Sizzle("#baseWillpower")[0].value;
      setBaseWillpower(baseWillpower);
      saveLocalStorage("baseWillpower", baseWillpower);
    }
    setEditMode(!inEditMode);
  }

  const HeaderContainer = styled.div`
    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  return (
    <div className="App">
      <HeaderContainer>
        <div>Grimoire</div>
        <div>
          <IconButton size="small">
            <InfoIcon color="info" />
          </IconButton>
        </div>
      </HeaderContainer>

      <WillpowerTracker
        baseWillpower={baseWillpower}
        currentWillpower={currentWillpower}
        inEditMode={inEditMode}
        setBaseWillpower={setBaseWillpower}
        setCurrentWillpower={setCurrentWillpower}
      ></WillpowerTracker>

      <Grimoire
        currentWillpower={currentWillpower}
        setCurrentWillpower={setCurrentWillpower}
        inEditMode={inEditMode}
        spellList={spellList}
      ></Grimoire>

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          size="small"
          color="primary"
          style={{
            margin: 0,
            top: "auto",
            right: 16,
            bottom: 16,
            left: "auto",
            position: "fixed",
          }}
          onClick={toggleEditMode}
        >
          {!inEditMode && <EditIcon />}
          {inEditMode && <CloseIcon />}
        </Fab>
      </Box>
    </div>
  );
}
