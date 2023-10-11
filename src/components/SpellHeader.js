import { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Typography,
} from "@mui/material";
import Sizzle from "sizzle";

import { ApplicationContext } from "../ApplicationContext";
import SpellConfirmation from "./SpellConfirmation";
import { DarkTheme, FlexContainer } from "./utility";

export default function SpellHeader(props) {
  const { isAbility, isTrick, isSpell, isSpellChecked, spell } = props;
  const {
    inEditMode,
    spellPrereqs,
    tempPreparedSpells,
    tempSelectedSpells,
    setTempPreparedSpells,
    setTempSelectedSpells,
  } = useContext(ApplicationContext);
  const [openModal, setOpenModal] = useState(false);
  const [isSpellSelected, setSpellSelected] = useState(isSpellChecked);
  const isPrepared = tempPreparedSpells.includes(spell.name);
  const hasPrereq = checkPrereqs(spell.name, tempSelectedSpells, spellPrereqs);

  if (!hasPrereq && isSpellSelected) setSpellSelected(false);

  function selectSpell(e) {
    if (e.target.name === "spell") setSpellSelected(!isSpellSelected);

    const preparedSpells = Sizzle("[name=prepared]:checked").map(
      (e, i) => e.value
    );
    setTempPreparedSpells(preparedSpells);

    const selectedSpells = Sizzle("[name=spell]:checked").map(
      (e, i) => e.value
    );
    setTempSelectedSpells(selectedSpells);
  }

  function toggleDialog() {
    setOpenModal(!openModal);
  }

  if (inEditMode)
    return (
      <FlexContainer>
        <div style={{ alignItems: "center", display: "flex" }}>
          <FormControlLabel
            control={
              <Checkbox
                //defaultChecked={isSpellSelected}
                disabled={!hasPrereq}
                name="spell"
                size="small"
                value={spell.name}
              />
            }
            checked={isSpellSelected}
            label={spell.name}
            labelPlacement="end"
            onChange={(e) => selectSpell(e)}
            value="bottom"
          />
        </div>
        {isSpell && isSpellSelected && (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={isPrepared}
                  name="prepared"
                  size="small"
                  value={spell.name}
                />
              }
              label="Prepare?"
              labelPlacement="start"
              onChange={(e) => selectSpell(e)}
              value="bottom"
            />
          </div>
        )}
        {isSpell && !isSpellSelected && (
          <div>
            {spell.prerequisites}
          </div>
        )}
      </FlexContainer>
    );

  return (
    <FlexContainer>
      <FlexContainer
        style={{
          fontSize: "12pt",
          fontWeight: "bold",
        }}
      >
        {spell.name}
        {isSpell && (
          <Typography
            color={isPrepared ? "success.main" : "warning.main"}
            fontWeight={700}
            style={{ marginLeft: 8 }}
            variant="body2"
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

      <DarkTheme>
        <Dialog open={openModal}>
          <SpellConfirmation
            isAbility={isAbility}
            isTrick={isTrick}
            isSpell={isSpell}
            isUnprepared={!isPrepared}
            spellName={spell.name}
            toggleDialog={toggleDialog}
          ></SpellConfirmation>
        </Dialog>
      </DarkTheme>
    </FlexContainer>
  );
}

function checkPrereqs(spellName, selectedSpells, spellPrereqs) {
  const prereqs = spellPrereqs[spellName];
  if (prereqs === undefined) return true;

  if (spellName === "Magic Shield") {
    if (
      selectedSpells.includes(prereqs[0] || selectedSpells.includes(prereqs[1]))
    )
      return true;
  }

  if (spellName === "Firestorm") {
    if (
      selectedSpells.includes(prereqs[0] && selectedSpells.includes(prereqs[1]))
    )
      return true;
  }

  if (selectedSpells.includes(prereqs[0])) return true;

  return false;
}
