import { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ApplicationContext } from "../ApplicationContext";
import { AreaContainer, DarkTheme, FlexContainer } from "./utility";
import ValueEditor from "./ValueEditor";
import Sizzle from "sizzle";

export default function RestTracker() {
  const { baseHP, baseWP, usedRoundRest, usedStretchRest, saveCharacter } =
    useContext(ApplicationContext);
  const [tempUsedRoundRest, setTempUsedRoundRest] = useState(usedRoundRest);
  const [tempUsedStretchRest, setTempUsedStretchRest] =
    useState(usedStretchRest);
  const [openRoundRestDialog, setOpenRoundRestDialog] = useState(false);
  const [openStretchRestDialog, setOpenStretchRestDialog] = useState(false);
  const [openLongRestDialog, setOpenLongRestDialog] = useState(false);

  function toggleRoundRestStatus() {
    const isChecked = Sizzle("#roundStatus.checked").length > 0;
    if (isChecked) setTempUsedRoundRest(false);
    else setOpenRoundRestDialog(true);
  }

  function toggleStretchRestStatus(e) {
    const isChecked = Sizzle("#stretchStatus.checked").length > 0;
    if (isChecked) setTempUsedStretchRest(false);
    else setOpenStretchRestDialog(true);
  }

  function toggleLongRestDialog() {
    setOpenLongRestDialog(!openLongRestDialog);
  }

  function toggleLongRestDialogAccept() {
    saveCharacter([
      { name: "currentHP", value: baseHP },
      { name: "currentWP", value: baseWP },
      { name: "usedRoundRest", value: false },
      { name: "usedStretchRest", value: false },
      { name: "undoAction", value: null },
    ]);
    setTempUsedRoundRest(false);
    setTempUsedStretchRest(false);
    toggleLongRestDialog();
  }

  return (
    <AreaContainer>
      <FlexContainer>
        <Button
          id="roundStatus"
          className={tempUsedRoundRest ? "checked" : ""}
          onClick={toggleRoundRestStatus}
          variant="outlined"
          startIcon={
            tempUsedRoundRest ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />
          }
        >
          Round
        </Button>
        <Button
          id="stretchStatus"
          className={tempUsedStretchRest ? "checked" : ""}
          onClick={toggleStretchRestStatus}
          variant="outlined"
          startIcon={
            tempUsedStretchRest ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )
          }
        >
          Stretch
        </Button>
        <Button
          color="secondary"
          onClick={toggleLongRestDialog}
          variant="outlined"
        >
          Shift Rest
        </Button>
      </FlexContainer>

      <DarkTheme>
        <Dialog open={openRoundRestDialog}>
          <OtherRestDialog
            saveCharacter={saveCharacter}
            setOpenRestDialog={setOpenRoundRestDialog}
            setTempUsedRest={setTempUsedRoundRest}
            type="Round"
          />
        </Dialog>

        <Dialog open={openStretchRestDialog}>
          <OtherRestDialog
            saveCharacter={saveCharacter}
            setOpenRestDialog={setOpenStretchRestDialog}
            setTempUsedRest={setTempUsedStretchRest}
            type="Stretch"
          />
        </Dialog>

        <Dialog open={openLongRestDialog}>
          <DialogTitle>Take Shift Rest?</DialogTitle>
          <DialogContent>
            This action will reset your WP, HP and available rests.
            <Typography color="warning.main" variant="body1">
              Before finalizing this Shift Rest, be sure your DM has verified a
              successful rest period. This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={toggleLongRestDialog} size="small">
              <CancelIcon color="error" />
            </IconButton>
            <IconButton onClick={toggleLongRestDialogAccept} size="small">
              <CheckCircleIcon color="success" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </DarkTheme>
    </AreaContainer>
  );
}

function OtherRestDialog(props) {
  const { saveCharacter, setOpenRestDialog, setTempUsedRest, type } = props;

  const { baseHP, baseWP, currentHP, currentWP } =
    useContext(ApplicationContext);

  function closeCancel() {
    setTempUsedRest(false);
    setOpenRestDialog(false);
  }

  function closeAccept() {
    let saveArray = [{ name: "undoAction", value: null }];

    let modifyWP = parseInt(Sizzle("#modifyWP-editor")[0].textContent);
    const deltaWP = baseWP - currentWP;
    if (modifyWP >= deltaWP) modifyWP = deltaWP;
    saveArray.push({ name: "currentWP", value: currentWP + modifyWP });

    if (type === "Round")
      saveArray.push({ name: "usedRoundRest", value: true });

    if (type === "Stretch") {
      let modifyHP = parseInt(Sizzle("#modifyHP-editor")[0].textContent);
      const deltaHP = baseHP - currentHP;
      if (modifyHP >= deltaHP) modifyHP = deltaHP;
      saveArray.push({ name: "currentHP", value: currentHP + modifyHP });
      saveArray.push({ name: "usedStretchRest", value: true });
    }

    saveCharacter(saveArray);
    setTempUsedRest(true);
    setOpenRestDialog(false);
  }

  return (
    <div>
      <DialogTitle>Take {type} Rest?</DialogTitle>
      <DialogContent>
        <FlexContainer>
          <strong>WP</strong>{" "}
          <ValueEditor
            defaultValue={0}
            id={`modifyWP-editor`}
            min={0}
            max={20}
            dieTypes={6}
          />
        </FlexContainer>
        {type === "Stretch" && (
          <FlexContainer>
            <strong>HP</strong>
            <ValueEditor
              defaultValue={0}
              id={`modifyHP-editor`}
              min={0}
              max={20}
              dieTypes={6}
            />
          </FlexContainer>
        )}
        <Typography color="warning.main" variant="body1">
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={closeCancel} size="small">
          <CancelIcon color="error" />
        </IconButton>
        <IconButton onClick={closeAccept} size="small">
          <CheckCircleIcon color="success" />
        </IconButton>
      </DialogActions>
    </div>
  );
}
