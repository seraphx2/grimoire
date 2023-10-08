import { useContext, useRef, useState } from "react";
import {
  IconButton,
  Drawer,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Sizzle from "sizzle";

import { ApplicationContext } from "../ApplicationContext";
import {
  DarkTheme,
  FlexContainer,
  SquishedFlexContainer,
  sortByProperty,
} from "./utility";

export default function CharacterDrawer(props) {
  const { open, set } = props;
  const {
    version,
    addCharacter,
    characters,
    isCharacterListEmpty,
    loadCharacter,
    selectedCharacterId,
    setImportedData,
  } = useContext(ApplicationContext);
  const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
  const [openFileErrorDialog, setOpenFileErrorDialog] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  function toggleCharacterDialog() {
    setOpenCharacterDialog(!openCharacterDialog);
  }

  function toggleCharacterDialogAccept() {
    const characterName = Sizzle("#new-character-name")
      .map((e, i) => e.value)[0]
      .trim();

    if (characterName === "") {
      setIsNameEmpty(true);
    } else {
      setIsNameEmpty(false);
      addCharacter(characterName);
      set(false);
      toggleCharacterDialog();
    }
  }

  function selectCharacter(character) {
    loadCharacter(character);
    set(false);
  }

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify({
        version: version,
        selectedCharacterId: selectedCharacterId,
        characters: characters,
      })
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `grimoire-${Date.now()}.json`;

    link.click();
    set(false);
  };

  let fileRef = useRef();
  const importData = (event) => {
    const fileReader = new FileReader();
    const { files } = event.target;

    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = (e) => {
      const content = e.target.result;
      let data;

      try {
        data = JSON.parse(content);
      } catch (e) {
        setOpenFileErrorDialog(true);
        set(false);
        return;
      }

      if (
        data.version === undefined ||
        data.selectedCharacterId === undefined ||
        data.characters === undefined
      )
        setOpenFileErrorDialog(true);
      else setImportedData(data);
    };
    set(false);
  };

  return (
    <DarkTheme>
      <Drawer anchor="top" open={open} style={{ fontSize: "0.9rem" }}>
        <FlexContainer>
          <Typography variant="h5" style={{ padding: 8 }}>
            Characters
          </Typography>
          <IconButton
            onClick={() => set(false)}
            size="small"
            style={{ marginRight: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </FlexContainer>
        <Divider />
        <Button onClick={toggleCharacterDialog}>
          <AddCircleIcon /> Create Character
        </Button>
        <Divider />
        <SquishedFlexContainer>
          {!isCharacterListEmpty() && (
            <Button color="secondary" onClick={exportData} fullWidth>
              <FileDownloadIcon /> Export
            </Button>
          )}
          <Button
            color="secondary"
            onClick={() => fileRef.current.click()}
            fullWidth
          >
            <FileUploadIcon /> Import
          </Button>
          <input
            ref={fileRef}
            type="file"
            onChange={importData}
            style={{ visibility: "hidden", display: "none" }}
          />
        </SquishedFlexContainer>
        {!isCharacterListEmpty() && (
          <div>
            <Divider />
            <List>
              {characters.sort(sortByProperty("name")).map((x, i) => (
                <ListItem
                  disablePadding
                  key={x.id}
                  onClick={() => selectCharacter(x)}
                >
                  <ListItemButton>
                    <ListItemText>{x.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </Drawer>

      <Dialog open={openCharacterDialog}>
        <DialogTitle>Add Character</DialogTitle>
        <DialogContent>
          <TextField
            error={isNameEmpty}
            id="new-character-name"
            label="Character Name"
            size="small"
            style={{ marginTop: 16 }}
          />
        </DialogContent>
        <DialogActions>
          <IconButton onClick={toggleCharacterDialog} size="small">
            <CancelIcon color="error" />
          </IconButton>
          <IconButton onClick={toggleCharacterDialogAccept} size="small">
            <CheckCircleIcon color="success" />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openFileErrorDialog}>
        <DialogContent>
          The selected file does not appear to contain character grimoire data.
        </DialogContent>
        <DialogActions>
          <IconButton
            onClick={() => setOpenFileErrorDialog(false)}
            size="small"
          >
            <CancelIcon color="primary" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </DarkTheme>
  );
}
