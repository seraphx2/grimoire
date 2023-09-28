import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ApplicationContext } from "../ApplicationContext";
import ValueEditor from "./ValueEditor";
import { saveLocalStorage } from "./utility";

export default function SpellConfirmation(props) {
  const { isAbility, isTrick, isSpell, spellName, toggleDialog } = props;
  const { currentWP, setCurrentWP, currentHP, setCurrentHP, setUndoAction } =
    useContext(ApplicationContext);
  const [wpCost, setWpCost] = useState(0);
  const [hpCost, setHpCost] = useState(0);
  const [isInside, setInside] = useState(false);

  const actionType = isAbility ? "activate" : "cast";
  const actionCost = wpCost * (isInside ? 2 : 1);
  const hasEnoughWP = currentWP - wpCost * (isInside ? 2 : 1) >= 0;

  useEffect(() => {
    const setBaseWp = async () => {
      if (isAbility) setWpCost(3);
      if (isTrick) setWpCost(1);
      if (isSpell) setWpCost(spellName === "Charge" ? 1 : 2);
    };
    setBaseWp();
  }, [setWpCost, isAbility, isTrick, isSpell, spellName]);

  function toggleDialogAccept() {
    toggleDialog();

    let newCurrentWP = 0;
    if (hasEnoughWP) {
      newCurrentWP = currentWP - actionCost;
    } else {
      let newCurrentHP = currentHP - hpCost;
      setCurrentHP(newCurrentHP);
      saveLocalStorage("currentHP", newCurrentHP);
    }
    setCurrentWP(newCurrentWP);
    saveLocalStorage("currentWP", newCurrentWP);

    const undoAction = {
      isAbility: isAbility,
      actionName: spellName,
      wpSpent: hasEnoughWP ? actionCost : currentWP,
      hpSpent: hpCost,
    };
    setUndoAction(undoAction);
    saveLocalStorage("undoAction", undoAction);
  }

  const hasPowerLevel = !["Charge"].includes(spellName);

  const isLightningSpell = [
    "Lightning Flash",
    "Lightning Bolt",
    "Thunderbolt",
  ].includes(spellName);

  return (
    <Box sx={{}}>
      <DialogTitle id="alert-dialog-title">
        {isAbility && "Activate Ability?"}
        {isTrick && "Cast Trick?"}
        {isSpell && "Cast Spell?"}
      </DialogTitle>
      <DialogContent>
        <div>
          You currently have <strong>{currentWP} WP</strong>
          {!hasEnoughWP && !isAbility && (
            <span>
              {" "}
              and <strong>{currentHP} HP</strong>
            </span>
          )}
          .
        </div>
        {spellName === "Charge" && (
          <div>
            <ValueEditor
              callback={setWpCost}
              defaultValue={1}
              min={1}
              max={10}
            />
          </div>
        )}
        {isSpell && hasPowerLevel && (
          <div style={{ marginBottom: 8, marginTop: 8 }}>
            Power Level{" "}
            <ButtonGroup size="small">
              <Button
                onClick={() => setWpCost(2)}
                variant={wpCost / 2 === 1 ? "contained" : "outlined"}
              >
                1
              </Button>
              <Button
                onClick={() => setWpCost(4)}
                variant={wpCost / 2 === 2 ? "contained" : "outlined"}
              >
                2
              </Button>
              <Button
                onClick={() => setWpCost(6)}
                variant={wpCost / 2 === 3 ? "contained" : "outlined"}
              >
                3
              </Button>
            </ButtonGroup>
          </div>
        )}
        {isLightningSpell && (
          <div style={{ marginBottom: 8, marginTop: 8 }}>
            <FormControlLabel
              value="bottom"
              control={
                <Checkbox name="spell" defaultChecked={false} size="small" />
              }
              label="Casting Inside?"
              labelPlacement="end"
              onChange={() => setInside(!isInside)}
            />
          </div>
        )}
        {!hasEnoughWP && !isAbility && (
          <div>
            <Typography variant="body2" color="warning.main">
              You need <strong>{actionCost} WP</strong> to cast this spell. Do
              you want to use <strong>Life</strong> to help fuel the spell?
            </Typography>
            <ValueEditor
              callback={setHpCost}
              defaultValue={0}
              min={0}
              max={currentHP}
            />
          </div>
        )}
        <div>
          Are you sure you want to {actionType} <strong>{spellName}</strong> for{" "}
          {(hasEnoughWP || isAbility) && <strong>{actionCost} WP</strong>}
          {!hasEnoughWP && !isAbility && (
            <span>
              <strong>{currentWP} WP</strong> and <strong>{hpCost} HP</strong>
            </span>
          )}
          ?
        </div>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleDialog} size="small">
          <CancelIcon color="error" />
        </IconButton>
        <IconButton
          disabled={!(hpCost + currentWP >= actionCost)}
          onClick={toggleDialogAccept}
          size="small"
        >
          <CheckCircleIcon
            color={hpCost + currentWP >= actionCost ? "success" : "disabled"}
          />
        </IconButton>
      </DialogActions>
    </Box>
  );
}
