import { useContext, useLayoutEffect, useState } from "react";
import {
  Box,
  IconButton,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForever from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SaveIcon from "@mui/icons-material/Save";
import Sizzle from "sizzle";
import "./App.css";

import { ApplicationContext } from "./ApplicationContext";
import CharacterDrawer from "./components/CharacterDrawer";
import Grimoire from "./components/Grimoire";
import SupplementalDrawer from "./components/SupplementalDrawer";
import WillpowerTracker from "./components/WillpowerTracker";
import { AreaContainer, DarkTheme, FlexContainer } from "./components/utility";

export default function App() {
  const {
    inEditMode,
    setEditMode,
    name,
    isCharacterListEmpty,
    deleteCharacter,
    loadCharacters,
    saveCharacter,
  } = useContext(ApplicationContext);
  const [openSupplementalDrawer, setOpenSupplementalDrawer] = useState(false);
  const [openCharacterDrawer, setOpenCharacterDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  function toggleDeleteDialog() {
    setOpenDeleteDialog(!openDeleteDialog);
  }

  function toggleDeleteDialogAccept() {
    deleteCharacter();
    toggleDeleteDialog();
  }

  useLayoutEffect(() => {
    const runEffect = async () => {
      loadCharacters();
      localStorage.removeItem("baseHP");
      localStorage.removeItem("baseWP");
      localStorage.removeItem("currentHP");
      localStorage.removeItem("currentWP");
      localStorage.removeItem("preparedSpells");
      localStorage.removeItem("selectedSpells");
    };
    runEffect();
    //eslint-disable-next-line
  }, []);

  function toggleEditMode() {
    window.scrollTo(0, 0);

    if (inEditMode) {
      const name = Sizzle("#name-editor")[0].value.trim();
      const baseHP = parseInt(Sizzle("#baseHP-editor")[0].textContent);
      const baseWP = parseInt(Sizzle("#baseWP-editor")[0].textContent);
      const preparedSpells = Sizzle("[name=prepared]:checked").map(
        (e, i) => e.value
      );
      const selectedSpells = Sizzle("[name=spell]:checked").map(
        (e, i) => e.value
      );

      saveCharacter([
        { name: "name", value: name },
        { name: "baseHP", value: baseHP },
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
          <FlexContainer>
            {!inEditMode && (
              <IconButton
                size="small"
                onClick={() => setOpenCharacterDrawer(true)}
              >
                <MenuOpenIcon />
              </IconButton>
            )}
            <CharacterDrawer
              open={openCharacterDrawer}
              set={setOpenCharacterDrawer}
            />
            {isCharacterListEmpty() ? (
              "Create Character"
            ) : (
              <div>
                {!inEditMode && <strong>{name}</strong>}
                {inEditMode && (
                  <div>
                    <TextField
                      id="name-editor"
                      size="small"
                      defaultValue={name}
                    />
                  </div>
                )}
              </div>
            )}
          </FlexContainer>
          <div>
            {!inEditMode && (
              <IconButton
                size="small"
                onClick={() => setOpenSupplementalDrawer(true)}
              >
                <InfoIcon color="info" />
              </IconButton>
            )}
            {inEditMode && (
              <div>
                <IconButton
                  size="small"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  <DeleteForever color="error" />
                </IconButton>

                <DarkTheme>
                  <Dialog open={openDeleteDialog}>
                    <DialogTitle>Undo Action?</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Are you sure you want to delete <strong>{name}</strong>?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <IconButton onClick={toggleDeleteDialog} size="small">
                        <CancelIcon color="error" />
                      </IconButton>
                      <IconButton
                        onClick={toggleDeleteDialogAccept}
                        size="small"
                      >
                        <CheckCircleIcon color="success" />
                      </IconButton>
                    </DialogActions>
                  </Dialog>
                </DarkTheme>
              </div>
            )}
            <SupplementalDrawer
              open={openSupplementalDrawer}
              set={setOpenSupplementalDrawer}
            />
          </div>
        </FlexContainer>
      </AreaContainer>

      {!isCharacterListEmpty() && (
        <div>
          <WillpowerTracker />
          <Grimoire />
        </div>
      )}

      {!isCharacterListEmpty() && (
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          {inEditMode && (
            <Fab
              color="error"
              onClick={() => setEditMode(false)}
              size="small"
              style={{
                margin: 0,
                top: "auto",
                right: 80,
                bottom: 16,
                left: "auto",
                position: "fixed",
              }}
            >
              <ClearIcon />
            </Fab>
          )}
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
            {inEditMode && <SaveIcon />}
          </Fab>
        </Box>
      )}
    </div>
  );
}
