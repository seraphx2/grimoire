import { useContext, useEffect, useState } from "react";
import { Box, IconButton, Fab } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import Sizzle from "sizzle";
import "./App.css";

import { ApplicationContext } from "./ApplicationContext";
import CharacterDrawer from "./components/CharacterDrawer";
import Grimoire from "./components/Grimoire";
import SupplementalDrawer from "./components/SupplementalDrawer";
import WillpowerTracker from "./components/WillpowerTracker";
import { AreaContainer, FlexContainer } from "./components/utility";

export default function App() {
  const {
    inEditMode,
    setEditMode,
    // setBaseWP,
    // setCurrentWP,
    // setBaseHP,
    // setCurrentHP,
    // setUndoAction,
    getCharacter,
    name,
    isCharacterListEmpty,
    loadCharacters,
    saveEditScreenValues,
  } = useContext(ApplicationContext);
  const [openSupplementalDrawer, setOpenSupplementalDrawer] = useState(false);
  const [openCharacterDrawer, setOpenCharacterDrawer] = useState(false);

  useEffect(() => {
    const runEffect = async () => {
      loadCharacters();
    };
    runEffect();
  }, [loadCharacters]);

  function toggleEditMode() {
    window.scrollTo(0, 0);

    if (inEditMode) {
      const selectedSpells = Sizzle("[name=spell]:checked").map(
        (e, i) => e.value
      );
      // setSelectedSpells(selectedSpells);
      // saveLocalStorage("selectedSpells", selectedSpells);

      const preparedSpells = Sizzle("[name=prepared]:checked").map(
        (e, i) => e.value
      );
      // setPreparedSpells(preparedSpells);
      // saveLocalStorage("preparedSpells", preparedSpells);

      const baseWP = Sizzle("#baseWP-editor")[0].textContent;
      // setBaseWP(parseInt(baseWP));
      // saveLocalStorage("baseWP", baseWP);

      const baseHP = Sizzle("#baseHP-editor")[0].textContent;
      // setBaseHP(parseInt(baseHP));
      // saveLocalStorage("baseHP", baseHP);

      saveEditScreenValues(baseHP, baseWP, preparedSpells, selectedSpells);
    }

    setEditMode(!inEditMode);
  }

  return (
    <div className="App">
      <AreaContainer>
        <FlexContainer>
          <div>
            <IconButton
              size="small"
              onClick={() => setOpenCharacterDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <CharacterDrawer
              open={openCharacterDrawer}
              set={setOpenCharacterDrawer}
            />
          </div>
          <div>{isCharacterListEmpty() ? "Grimoire" : name}</div>
          <div>
            <IconButton
              size="small"
              onClick={() => setOpenSupplementalDrawer(true)}
            >
              <InfoIcon color="info" />
            </IconButton>
            <SupplementalDrawer
              open={openSupplementalDrawer}
              set={setOpenSupplementalDrawer}
            />
          </div>
        </FlexContainer>
      </AreaContainer>

      {isCharacterListEmpty() && <div>test</div>}
      {!isCharacterListEmpty() && (
        <div>
          <WillpowerTracker />
          <Grimoire />
        </div>
      )}

      {!isCharacterListEmpty() && (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            color="primary"
            onClick={toggleEditMode}
            size="small"
            style={{
              margin: 0,
              top: "auto",
              right: 16,
              bottom: 16,
              left: "auto",
              position: "fixed",
            }}
          >
            {!inEditMode && <EditIcon />}
            {inEditMode && <CloseIcon />}
          </Fab>
        </Box>
      )}
    </div>
  );
}
