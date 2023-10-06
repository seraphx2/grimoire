import { useContext, useState } from "react";
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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import Sizzle from "sizzle";

import { ApplicationContext } from "../ApplicationContext";
import { DarkTheme, FlexContainer, sortByProperty } from "./utility";

export default function CharacterDrawer(props) {
  const { open, set } = props;
  const { addCharacter, characters, loadCharacter } =
    useContext(ApplicationContext);
  const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
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
        <Button onClick={toggleCharacterDialog}>Add Character</Button>
        <Divider />
        <List>
          {characters.sort(sortByProperty("name")).map((x, i) => (
            <ListItem disablePadding key={x.id} onClick={() => selectCharacter(x)}>
              <ListItemButton>
                <ListItemText>{x.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
    </DarkTheme>
  );
}
