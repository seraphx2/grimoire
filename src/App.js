import { useContext, useEffect } from "react";
import { Box, IconButton, Fab } from "@mui/material";
import styled from "@emotion/styled";
import Sizzle from "sizzle";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import "./App.css";
import Grimoire from "./components/Grimoire";
import WillpowerTracker from "./components/WillpowerTracker";
import { saveLocalStorage } from "./components/utility";
import { ApplicationContext } from "./ApplicationContext";

export default function App() {
  const {
    inEditMode,
    setEditMode,
    setSelectedSpells,
    setPreparedSpells,
    setBaseWP,
    setCurrentWP,
    setBaseHP,
    setCurrentHP,
    setUndoAction,
  } = useContext(ApplicationContext);

  useEffect(() => {
    const runEffect = async () => {
      const selectedSpells = JSON.parse(
        localStorage.getItem("selectedSpells") || JSON.stringify([])
      );
      setSelectedSpells(selectedSpells);

      const preparedSpells = JSON.parse(
        localStorage.getItem("preparedSpells") || JSON.stringify([])
      );
      setPreparedSpells(preparedSpells);

      const baseWP = JSON.parse(parseInt(localStorage.getItem("baseWP")) || 0);
      setBaseWP(baseWP);

      const currentWP = JSON.parse(
        parseInt(localStorage.getItem("currentWP")) || 0
      );
      setCurrentWP(currentWP);

      const baseHP = JSON.parse(parseInt(localStorage.getItem("baseHP")) || 0);
      setBaseHP(baseHP);

      const currentHP = JSON.parse(
        parseInt(localStorage.getItem("currentHP")) || 0
      );
      setCurrentHP(currentHP);

      const undoAction = JSON.parse(localStorage.getItem("undoAction") || null);
      setUndoAction(undoAction);
    };
    runEffect();
  }, [
    setSelectedSpells,
    setPreparedSpells,
    setBaseWP,
    setCurrentWP,
    setBaseHP,
    setCurrentHP,
    setUndoAction,
  ]);

  function toggleEditMode() {
    if (inEditMode) {
      const selectedSpells = Sizzle("[name=spell]:checked").map(
        (e, i) => e.value
      );
      setSelectedSpells(selectedSpells);
      saveLocalStorage("selectedSpells", selectedSpells);

      const preparedSpells = Sizzle("[name=prepared]:checked").map(
        (e, i) => e.value
      );
      setPreparedSpells(preparedSpells);
      saveLocalStorage("preparedSpells", preparedSpells);

      const baseWP = Sizzle("#baseWP-editor")[0].textContent;
      setBaseWP(parseInt(baseWP));
      saveLocalStorage("baseWP", baseWP);

      const baseHP = Sizzle("#baseHP-editor")[0].textContent;
      setBaseHP(parseInt(baseHP));
      saveLocalStorage("baseHP", baseHP);
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

      <WillpowerTracker></WillpowerTracker>
      <Grimoire></Grimoire>

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
