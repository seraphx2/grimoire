import { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Fab,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import Sizzle from "sizzle";
import "./App.css";

import { ApplicationContext } from "./ApplicationContext";
import Grimoire from "./components/Grimoire";
import SupplementalInfo from "./components/SupplementalInfo";
import WillpowerTracker from "./components/WillpowerTracker";
import {
  AreaContainer,
  DarkTheme,
  FlexContainer,
  saveLocalStorage,
} from "./components/utility";

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
  const [openDrawer, setOpenDrawer] = useState(false);

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
    window.scrollTo(0, 0);

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

  return (
    <div className="App">
      <AreaContainer>
        <FlexContainer>
          <div>Grimoire</div>
          <div>
            <IconButton size="small" onClick={() => setOpenDrawer(true)}>
              <InfoIcon color="info" />
            </IconButton>

            <DarkTheme>
              <Drawer
                anchor="right"
                open={openDrawer}
                style={{ fontSize: "0.9rem" }}
              >
                <FlexContainer>
                  <Typography variant="h5" style={{ padding: 8 }}>
                    Supplemental Info
                  </Typography>
                  <IconButton
                    onClick={() => setOpenDrawer(false)}
                    size="small"
                    style={{ marginRight: 10 }}
                  >
                    <CloseIcon />
                  </IconButton>
                </FlexContainer>
                <Divider />
                <SupplementalInfo />
              </Drawer>
            </DarkTheme>
          </div>
        </FlexContainer>
      </AreaContainer>

      <WillpowerTracker />
      <Grimoire />

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
    </div>
  );
}
