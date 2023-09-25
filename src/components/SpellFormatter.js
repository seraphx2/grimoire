import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext, useEffect, useState } from "react";
import { FlexContainer, saveLocalStorage } from "./utility";
import { ApplicationContext } from "../ApplicationContext";
import ValueEditor from "./ValueEditor";

export default function SpellFormatter(props) {
  const { inEditMode } = useContext(ApplicationContext);
  const { isSpellChecked, spell, type } = props;

  const isAbility = type === "ability";
  const isTrick = type === "trick";
  const isSpell = type === "spell";

  return (
    <div
      style={{
        marginBottom: "15px",
        fontSize: "10pt",
      }}
    >
      <SpellHeader
        isAbility={isAbility}
        isTrick={isTrick}
        isSpell={isSpell}
        isSpellChecked={isSpellChecked}
        spell={spell}
      ></SpellHeader>
      {!isAbility && !isTrick && !inEditMode && (
        <SpellProperties spell={spell}></SpellProperties>
      )}
      {!inEditMode && <div>{spell.description}</div>}
    </div>
  );
}

function SpellHeader(props) {
  const { inEditMode, preparedSpells } = useContext(ApplicationContext);
  const { isAbility, isTrick, isSpell, isSpellChecked, spell } = props;
  const [openModal, setOpenModal] = useState(false);
  const [isSpellSelected, setSpellSelected] = useState(isSpellChecked);
  const isPrepared = preparedSpells.includes(spell.name);

  function toggleDialog() {
    setOpenModal(!openModal);
  }

  if (inEditMode)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            value="bottom"
            control={
              <Checkbox
                name="spell"
                defaultChecked={isSpellSelected}
                value={spell.name}
                size="small"
              />
            }
            label={spell.name}
            labelPlacement="end"
            onChange={() => setSpellSelected(!isSpellSelected)}
          />
        </div>
        {isSpell && isSpellSelected && (
          <div>
            <FormControlLabel
              value="bottom"
              control={
                <Checkbox
                  name="prepared"
                  defaultChecked={preparedSpells.includes(spell.name)}
                  value={spell.name}
                  size="small"
                />
              }
              label="Prepare?"
              labelPlacement="start"
            />
          </div>
        )}
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <FlexContainer
        style={{
          fontWeight: "bold",
          fontSize: "12pt",
        }}
      >
        {spell.name}
        {isSpell && (
          <Typography
            variant="body2"
            fontWeight={700}
            color={isPrepared ? "success.main" : "warning.main"}
            style={{ marginLeft: 8 }}
          >
            {isPrepared ? " PREPARED" : "UNPREPARED"}
          </Typography>
        )}
      </FlexContainer>
      <div>
        <Button onClick={toggleDialog} size="small">
          {isAbility ? "Activate" : "Cast"}
        </Button>
      </div>

      <Dialog open={openModal}>
        <SpellConfirmation
          isAbility={isAbility}
          isTrick={isTrick}
          isSpell={isSpell}
          spellName={spell.name}
          toggleDialog={toggleDialog}
        ></SpellConfirmation>
      </Dialog>
    </div>
  );
}

function SpellProperties(props) {
  const { spell } = props;

  return (
    <div
      style={{
        borderLeft: "2px solid gray",
        paddingLeft: 4,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>{spell.castingTime}</div>
        <div>{spell.duration}</div>
        <div>{spell.range}</div>
      </div>
      <div>{spell.requirement}</div>
    </div>
  );
}

function SpellConfirmation(props) {
  const { currentWP, setCurrentWP, currentHP, setCurrentHP } =
    useContext(ApplicationContext);
  const { isAbility, isTrick, isSpell, spellName, toggleDialog } = props;
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
      if (isSpell) setWpCost(2);
    };
    setBaseWp();
  }, [setWpCost, isAbility, isTrick, isSpell]);

  function toggleDialogAccept() {
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
    toggleDialog();
  }

  const isLightningSpell =
    spellName === "Lightning Flash" ||
    spellName === "Lightning Bolt" ||
    spellName === "Thunderbolt";

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
        {isSpell && (
          <div style={{ marginTop: 8, marginBottom: 8 }}>
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
          <div style={{ marginTop: 8, marginBottom: 8 }}>
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
              defaultValue={0}
              callback={setHpCost}
              min={0}
              max={currentHP}
            ></ValueEditor>
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
