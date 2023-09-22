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
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { saveLocalStorage } from "./utility";

export default function SpellFormatter(props) {
  const {
    currentWillpower,
    setCurrentWillpower,
    inEditMode,
    isChecked,
    spell,
    willpowerType,
  } = props;

  const isAbility = willpowerType === "ability";
  const isTrick = willpowerType === "trick";
  const isSpell = willpowerType === "spell";

  return (
    <div
      style={{
        marginBottom: "15px",
        fontSize: "10pt",
      }}
    >
      <SpellHeader
        currentWillpower={currentWillpower}
        setCurrentWillpower={setCurrentWillpower}
        isAbility={isAbility}
        isTrick={isTrick}
        isSpell={isSpell}
        isChecked={isChecked}
        inEditMode={inEditMode}
        spell={spell}
      ></SpellHeader>
      {!isTrick && !inEditMode && (
        <SpellProperties spell={spell}></SpellProperties>
      )}
      {!inEditMode && <div>{spell.description}</div>}
    </div>
  );
}

function SpellHeader(props) {
  const {
    currentWillpower,
    setCurrentWillpower,
    inEditMode,
    isAbility,
    isTrick,
    isSpell,
    isChecked,
    spell,
  } = props;
  const [openModal, setOpenModal] = useState(false);

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
                defaultChecked={isChecked}
                value={spell.name}
                size="small"
              />
            }
            label={spell.name}
            labelPlacement="end"
          />
        </div>
        <div>{spell.prerequisite}</div>
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
      <div
        style={{
          fontWeight: "bold",
          fontSize: "12pt",
        }}
      >
        {spell.name}
      </div>
      <div>
        <Button onClick={toggleDialog} size="small">
          {isAbility ? "Activate" : "Cast"}
        </Button>
      </div>

      <Dialog open={openModal}>
        <SpellConfirmation
          currentWillpower={currentWillpower}
          setCurrentWillpower={setCurrentWillpower}
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
    <div style={{borderLeft: "2px solid gray", paddingLeft: 4, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}>
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
  const [wpCost, setWpCost] = useState(0);
  const [isInside, setInside] = useState(false);

  const {
    currentWillpower,
    setCurrentWillpower,
    isAbility,
    isTrick,
    isSpell,
    spellName,
    toggleDialog,
  } = props;

  useEffect(() => {
    const setBaseWp = async () => {
      if (isAbility) setWpCost(3);
      if (isTrick) setWpCost(1);
      if (isSpell) setWpCost(2);
    };
    setBaseWp();
  }, [setWpCost, isAbility, isTrick, isSpell]);

  function toggleDialogAccept() {
    let newCurrentWillpower = currentWillpower - (wpCost * (isInside ? 2 : 1));
    setCurrentWillpower(newCurrentWillpower);
    saveLocalStorage("currentWillpower", newCurrentWillpower);
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
          You currently have <strong>{currentWillpower} WP</strong>.
        </div>
        <div>
          Are you sure you want to {isAbility ? "activate" : "cast"}{" "}
          <strong>{spellName}</strong> for <strong>{wpCost * (isInside ? 2 : 1)} WP</strong>?
        </div>
        {isSpell && (
          <div style={{ marginTop: 8 }}>
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
          <div style={{ marginTop: 8 }}>
            <Checkbox onClick={() => setInside(!isInside)} name="spell" defaultChecked={false} size="small" /> Casting Inside?
            {/* <FormControlLabel
              onClick={() => setInside(!isInside)}
              value="bottom"
              control={
                <Checkbox onClick={() => setInside(!isInside)} name="spell" defaultChecked={false} size="small" />
              }
              label="Casting Inside?"
              labelPlacement="end"
            /> */}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <IconButton onClick={toggleDialog} size="small">
          <CancelIcon color="error" />
        </IconButton>
        <IconButton disabled={currentWillpower - (wpCost * (isInside ? 2 : 1)) < 0} onClick={toggleDialogAccept} size="small">
          <CheckCircleIcon color={currentWillpower - (wpCost * (isInside ? 2 : 1)) < 0 ? "disabled" : "success"} />
        </IconButton>
      </DialogActions>
    </Box>
  );
}
