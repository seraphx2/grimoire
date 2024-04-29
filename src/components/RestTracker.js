import { useContext, useLayoutEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
  const {
    baseHP,
    baseWP,
    hasStrCondition,
    hasConCondition,
    hasAglCondition,
    hasIntCondition,
    hasWilCondition,
    hasChaCondition,
    selectedSpells,
    usedRoundRest,
    usedStretchRest,
    saveCharacter,
  } = useContext(ApplicationContext);
  const [tempUsedRoundRest, setTempUsedRoundRest] = useState(false);
  const [tempUsedStretchRest, setTempUsedStretchRest] = useState(false);
  const [openRoundRestDialog, setOpenRoundRestDialog] = useState(false);
  const [openStretchRestDialog, setOpenStretchRestDialog] = useState(false);
  const [openLongRestDialog, setOpenLongRestDialog] = useState(false);

  useLayoutEffect(() => {
    const runEffect = async () => {
      setTempUsedRoundRest(usedRoundRest);
      setTempUsedStretchRest(usedStretchRest);
    };
    runEffect();
    //eslint-disable-next-line
  }, [usedRoundRest, usedStretchRest]);

  const hasFastHealer =
    selectedSpells.filter((s) => s === "Fast Healer").length > 0 ? true : false;

  console.log(selectedSpells);

  function toggleRoundRestStatus() {
    const isChecked = Sizzle("#roundStatus.checked").length > 0;
    if (isChecked) {
      setTempUsedRoundRest(false);
      saveCharacter([{ name: "usedRoundRest", value: false }]);
    } else setOpenRoundRestDialog(true);
  }

  function toggleStretchRestStatus(e) {
    const isChecked = Sizzle("#stretchStatus.checked").length > 0;
    if (isChecked) {
      setTempUsedStretchRest(false);
      saveCharacter([{ name: "usedStretchRest", value: false }]);
    } else setOpenStretchRestDialog(true);
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
      { name: "hasStrCondition", value: false },
      { name: "hasConCondition", value: false },
      { name: "hasAglCondition", value: false },
      { name: "hasIntCondition", value: false },
      { name: "hasWilCondition", value: false },
      { name: "hasChaCondition", value: false },
      { name: "undoAction", value: null },
    ]);
    setTempUsedRoundRest(false);
    setTempUsedStretchRest(false);
    toggleLongRestDialog();
  }

  function toggleCondition(condition) {
    // eslint-disable-next-line
    saveCharacter([{ name: condition, value: !eval(condition) }]);
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
      <Divider size="small" sx={{ marginTop: "10px" }} textAlign="left">
        Conditions
      </Divider>
      <FlexContainer>
        <Button
          color={hasStrCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasStrCondition")}
          size="small"
          variant="text"
        >
          Exhausted (STR)
        </Button>
        <Button
          color={hasConCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasConCondition")}
          size="small"
          variant="text"
        >
          Sickly (CON)
        </Button>
        <Button
          color={hasAglCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasAglCondition")}
          size="small"
          variant="text"
        >
          Dazed (AGL)
        </Button>
      </FlexContainer>

      <FlexContainer>
        <Button
          color={hasIntCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasIntCondition")}
          size="small"
          variant="text"
        >
          Angry (INT)
        </Button>
        <Button
          color={hasWilCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasWilCondition")}
          size="small"
          variant="text"
        >
          Scared (WIL)
        </Button>
        <Button
          color={hasChaCondition ? "error" : "success"}
          onClick={() => toggleCondition("hasChaCondition")}
          size="small"
          variant="text"
        >
          Disheartened (CHA)
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
            hasFastHealer={hasFastHealer}
            saveCharacter={saveCharacter}
            setOpenRestDialog={setOpenStretchRestDialog}
            setTempUsedRest={setTempUsedStretchRest}
            type="Stretch"
          />
        </Dialog>

        <Dialog open={openLongRestDialog}>
          <DialogTitle>Take Shift Rest?</DialogTitle>
          <DialogContent>
            This action will reset your WP, HP, all Conditions, and both Rests.
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
  const {
    hasFastHealer,
    saveCharacter,
    setOpenRestDialog,
    setTempUsedRest,
    type,
  } = props;

  const {
    baseHP,
    baseWP,
    currentHP,
    currentWP,
    hasStrCondition,
    hasConCondition,
    hasAglCondition,
    hasIntCondition,
    hasWilCondition,
    hasChaCondition,
  } = useContext(ApplicationContext);

  const [healCondition, setHealCondition] = useState("");

  const hasCondition =
    hasStrCondition ||
    hasConCondition ||
    hasAglCondition ||
    hasIntCondition ||
    hasWilCondition ||
    hasChaCondition;

  function closeCancel() {
    setTempUsedRest(false);
    setOpenRestDialog(false);
  }

  function highlightCondition(condition) {
    return healCondition === condition ? "contained" : "outlined";
  }

  function closeAccept() {
    let saveArray = [{ name: "undoAction", value: null }];

    let modifyWP = parseInt(Sizzle("#modifyWP-editor")[0].textContent);
    const deltaWP = baseWP - currentWP;
    if (modifyWP >= deltaWP) modifyWP = deltaWP;

    if (type === "Round")
      saveArray.push({ name: "usedRoundRest", value: true });

    if (type === "Stretch") {
      let modifyHP = parseInt(Sizzle("#modifyHP-editor")[0].textContent);
      let modifyHP2 = 0;
      if (hasFastHealer && currentWP >= 2)
        modifyHP2 = parseInt(Sizzle("#modifyHP2-editor")[0].textContent);
      if (modifyHP2 > 0) {
        modifyWP -= 2;
        modifyHP += modifyHP2;
      }
      const deltaHP = baseHP - currentHP;
      if (modifyHP >= deltaHP) modifyHP = deltaHP;
      saveArray.push({ name: "currentHP", value: currentHP + modifyHP });
      saveArray.push({ name: "usedStretchRest", value: true });
      saveArray.push({ name: healCondition, value: false });
    }

    saveArray.push({ name: "currentWP", value: currentWP + modifyWP });

    saveCharacter(saveArray);
    setTempUsedRest(true);
    setOpenRestDialog(false);
  }

  let healButtons = [];
  const healStrButton = (
    <Button
      onClick={() => setHealCondition("hasStrCondition")}
      variant={highlightCondition("hasStrCondition")}
    >
      Exhausted (STR)
    </Button>
  );
  const healConButton = (
    <Button
      onClick={() => setHealCondition("hasConCondition")}
      variant={highlightCondition("hasConCondition")}
    >
      Sickly (CON)
    </Button>
  );
  const healAglButton = (
    <Button
      onClick={() => setHealCondition("hasAglCondition")}
      variant={highlightCondition("hasAglCondition")}
    >
      Dazed (AGL)
    </Button>
  );
  const healIntButton = (
    <Button
      onClick={() => setHealCondition("hasIntCondition")}
      variant={highlightCondition("hasIntCondition")}
    >
      Angry (INT)
    </Button>
  );
  const healWilButton = (
    <Button
      onClick={() => setHealCondition("hasWilCondition")}
      variant={highlightCondition("hasWilCondition")}
    >
      Scared (WIL)
    </Button>
  );
  const healChaButton = (
    <Button
      onClick={() => setHealCondition("hasChaCondition")}
      variant={highlightCondition("hasChaCondition")}
    >
      Disheartened (CHA)
    </Button>
  );

  if (hasStrCondition) healButtons.push(healStrButton);
  if (hasConCondition) healButtons.push(healConButton);
  if (hasAglCondition) healButtons.push(healAglButton);
  if (hasIntCondition) healButtons.push(healIntButton);
  if (hasWilCondition) healButtons.push(healWilButton);
  if (hasChaCondition) healButtons.push(healChaButton);

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
            max={6}
            dieTypes={6}
          />
        </FlexContainer>
        {type === "Stretch" && (
          <>
            <FlexContainer>
              <strong>HP</strong>
              <ValueEditor
                defaultValue={0}
                id={`modifyHP-editor`}
                min={0}
                max={6}
                dieTypes={6}
              />
            </FlexContainer>
            {hasFastHealer && currentWP >= 2 && (
              <>
                <Box color="success.main">Fast Healer</Box>
                <FlexContainer>
                  <strong>HP</strong>
                  <ValueEditor
                    defaultValue={0}
                    id={`modifyHP2-editor`}
                    min={0}
                    max={6}
                    dieTypes={6}
                  />
                </FlexContainer>
                <Box color="info.main">
                  Selecting a value for <strong>Fast Healer</strong> will reduce
                  your current <strong>WP</strong> by <strong>2</strong>.
                </Box>
              </>
            )}
          </>
        )}
        {type === "Stretch" && hasCondition && (
          <Box marginY={1}>
            <Typography color="success.main">
              Choose a Condition to Heal
            </Typography>
            <FlexContainer>
              <ButtonGroup orientation="vertical" fullWidth>
                {healButtons}
              </ButtonGroup>
            </FlexContainer>
          </Box>
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
