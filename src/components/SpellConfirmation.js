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

export default function SpellConfirmation(props) {
  const {
    abilityCost,
    isAbility,
    isTrick,
    isSpell,
    preparedSpellStatus,
    spellName,
    toggleConfirmationDialog,
  } = props;
  const { currentWP, currentHP, saveCharacter } =
    useContext(ApplicationContext);
  const [wpCost, setWpCost] = useState(0);
  const [hpCost, setHpCost] = useState(0);
  const [isInside, setInside] = useState(false);
  const [isMagicItem, setisMagicItem] = useState(true);

  const isUnprepared = preparedSpellStatus === "unprepared" || false;
  const actionType = isAbility ? "activate" : "cast";
  const actionCost = wpCost * (isInside ? 2 : 1);
  const hasEnoughWP = currentWP - wpCost * (isInside ? 2 : 1) >= 0;

  useEffect(() => {
    const setBaseWp = async () => {
      if (isAbility) setWpCost(abilityCost);
      if (isTrick) setWpCost(1);
      if (isSpell) setWpCost(spellName === "Charge" ? 1 : 2);

      switch (preparedSpellStatus) {
        case "magicitem1":
          setWpCost(2);
          break;
        case "magicitem2":
          setWpCost(4);
          break;
        case "magicitem3":
          setWpCost(6);
          break;
        default:
          setisMagicItem(false);
      }
    };
    setBaseWp();
  }, [
    setWpCost,
    isAbility,
    abilityCost,
    isTrick,
    isSpell,
    preparedSpellStatus,
    spellName,
  ]);

  function toggleDialogAccept() {
    toggleConfirmationDialog();

    let newCurrentWP = 0;
    if (hasEnoughWP) {
      newCurrentWP = currentWP - actionCost;
    } else {
      let newCurrentHP = currentHP - hpCost;
      saveCharacter({ name: "currentHP", value: newCurrentHP });
    }
    saveCharacter({ name: "currentWP", value: newCurrentWP });

    const undoAction = {
      isAbility: isAbility,
      actionName: spellName,
      wpSpent: hasEnoughWP ? actionCost : currentWP,
      hpSpent: hpCost,
    };
    saveCharacter({ name: "undoAction", value: undoAction });
  }

  const hasPowerLevel = !["Charge"].includes(spellName);

  const isLightningSpell = [
    "Lightning Flash",
    "Lightning Bolt",
    "Thunderbolt",
  ].includes(spellName);

  const needsValueEditor = [
    "Charge",
    "Catlike",
    "Master Blacksmith",
    "Master Carpenter",
    "Master Tanner",
  ].includes(spellName);

  return (
    <Box>
      <DialogTitle id="alert-dialog-title">
        {isAbility && "Activate Ability?"}
        {isTrick && "Cast Trick?"}
        {isSpell && "Cast Spell?"}
      </DialogTitle>
      <DialogContent>
        {isUnprepared && isSpell && (
          <Typography color="warning.main" fontSize={20} mb={1}>
            This spell is unprepared and will require double the casting time.
          </Typography>
        )}
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
        {needsValueEditor && (
          <div>
            <ValueEditor
              callback={setWpCost}
              defaultValue={1}
              min={1}
              max={spellName === "Charge" ? 10 : undefined}
            />
          </div>
        )}
        {isSpell && hasPowerLevel && (
          <div style={{ marginBottom: 8, marginTop: 8 }}>
            Power Level{" "}
            <ButtonGroup size="small">
              <Button
                disabled={isMagicItem && wpCost !== 2}
                onClick={() => setWpCost(2)}
                variant={wpCost / 2 === 1 ? "contained" : "outlined"}
              >
                1
              </Button>
              <Button
                disabled={isMagicItem && wpCost !== 4}
                onClick={() => setWpCost(4)}
                variant={wpCost / 2 === 2 ? "contained" : "outlined"}
              >
                2
              </Button>
              <Button
                disabled={isMagicItem && wpCost !== 6}
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
            <Typography color="error.main">
              You need <strong>{actionCost} WP</strong> to cast this spell. Do
              you want to use <strong>HP</strong> to help fuel the spell?
            </Typography>
            <ValueEditor
              callback={setHpCost}
              defaultValue={0}
              dieTypes={[4, 6, 8, 10, 12, 20]}
              min={0}
              max={currentHP}
            />
          </div>
        )}
        <Typography color="info.main">
          Are you sure you want to {actionType} <strong>{spellName}</strong> for{" "}
          {(hasEnoughWP || isAbility) && <strong>{actionCost} WP</strong>}
          {!hasEnoughWP && !isAbility && (
            <span>
              <strong>{currentWP} WP</strong> and <strong>{hpCost} HP</strong>
            </span>
          )}
          ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleConfirmationDialog} size="small">
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
