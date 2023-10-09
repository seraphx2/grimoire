import { useContext, useRef, useState } from "react";
import {
  IconButton,
  Drawer,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import { ApplicationContext } from "../ApplicationContext";
import {
  DarkTheme,
  FlexContainer,
  SquishedFlexContainer,
  sortByProperty,
} from "./utility";

export default function CharacterDrawer(props) {
  const { openDrawer, setDrawer, newCharacter } = props;
  const {
    version,
    addCharacter,
    characters,
    isCharacterListEmpty,
    loadCharacter,
    selectedCharacterId,
    setImportedData,
  } = useContext(ApplicationContext);

  const [openFileErrorDialog, setOpenFileErrorDialog] = useState(false);

  function selectCharacter(character) {
    loadCharacter(character);
    setDrawer(false);
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
    setDrawer(false);
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
        setDrawer(false);
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
    setDrawer(false);
  };

  return (
    <DarkTheme>
      <Drawer anchor="top" open={openDrawer} style={{ fontSize: "0.9rem" }}>
        <FlexContainer>
          <Typography variant="h5" style={{ padding: 8 }}>
            Characters
          </Typography>
          <IconButton
            onClick={() => setDrawer(false)}
            size="small"
            style={{ marginRight: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </FlexContainer>
        <Divider />
        <Button onClick={() => newCharacter(true)}>
          <AddCircleIcon style={{ marginRight: 4 }} /> Create Character
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
