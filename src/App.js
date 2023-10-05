import { useContext, useLayoutEffect, useState } from "react";
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
    name,
    isCharacterListEmpty,
    loadCharacters,
    saveCharacter,
  } = useContext(ApplicationContext);
  const [openSupplementalDrawer, setOpenSupplementalDrawer] = useState(false);
  const [openCharacterDrawer, setOpenCharacterDrawer] = useState(false);

  useLayoutEffect(() => {
    const runEffect = async () => {
      loadCharacters();
    };
    runEffect();
  }, [loadCharacters]);

  function toggleEditMode() {
    window.scrollTo(0, 0);

    if (inEditMode) {
      const baseHP = Sizzle("#baseHP-editor")[0].textContent;
      const baseWP = Sizzle("#baseWP-editor")[0].textContent;
      const preparedSpells = Sizzle("[name=prepared]:checked").map(
        (e, i) => e.value
      );
      const selectedSpells = Sizzle("[name=spell]:checked").map(
        (e, i) => e.value
      );

      saveCharacter([
        { name: "baseHp", value: baseHP },
        { name: "baseWP", value: baseWP },
        { name: "preparedSpells", value: preparedSpells },
        { name: "selectedSpells", value: selectedSpells },
      ]);
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
