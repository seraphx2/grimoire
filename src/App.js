import { useContext, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Fab,
  Drawer,
  Divider,
  Typography,
} from "@mui/material";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import Sizzle from "sizzle";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

import "./App.css";
import Grimoire from "./components/Grimoire";
import WillpowerTracker from "./components/WillpowerTracker";
import {
  DarkTheme,
  FlexContainer,
  saveLocalStorage,
} from "./components/utility";
import { ApplicationContext } from "./ApplicationContext";
import SupplementalInfo from "./components/SupplementalInfo";

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
          <IconButton size="small" onClick={() => setOpenDrawer(true)}>
            <InfoIcon color="info" />
          </IconButton>

          <DarkTheme>
            <Drawer
              anchor="right"
              open={openDrawer}
              className={css`
                font-size: 0.9rem;
              `}
            >
              <FlexContainer>
                <Typography variant="h5" style={{ padding: 8 }}>
                  Supplemental Info
                </Typography>
                <IconButton
                  size="small"
                  style={{ marginRight: 10 }}
                  onClick={() => setOpenDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              </FlexContainer>
              <Divider />
              <SupplementalInfo />
            </Drawer>
          </DarkTheme>
        </div>
      </HeaderContainer>

      <WillpowerTracker />
      <Grimoire />

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
