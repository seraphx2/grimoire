import { useContext, useState } from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Sizzle from "sizzle";

import { ApplicationContext } from "../ApplicationContext";
import { FlexContainer, SquishedFlexContainer } from "./utility";

export default function SpellHeader(props) {
  const {
    isAbility,
    isSpell,
    isSpellChecked,
    spell,
    tempPreparedSpells,
    tempSelectedSpells,
    toggleConfirmationDialog,
  } = props;
  const {
    inEditMode,
    spellPrereqs,
    setTempPreparedSpells,
    setTempSelectedSpells,
    pruneTempSelectedSpells,
  } = useContext(ApplicationContext);
  const [isSpellSelected, setSpellSelected] = useState(isSpellChecked);
  const isPrepared = tempPreparedSpells.includes(spell.name);
  const hasPrereq = checkPrereqs(spell.name, tempSelectedSpells, spellPrereqs);

  if (!hasPrereq && isSpellSelected) setSpellSelected(false);

  function openConfirmationDialog(e) {
    e.stopPropagation();
    toggleConfirmationDialog();
  }

  function selectSpell(e) {
    if (e.target.name === "spell") setSpellSelected(!isSpellSelected);

    const preparedSpells = Sizzle("[name=prepared]:checked").map(
      (e, i) => e.value
    );
    setTempPreparedSpells(preparedSpells);

    const selectedSpells = Sizzle("[name=spell]:checked").map(
      (e, i) => e.value
    );
    console.log(selectedSpells);
    //if (!e.checked) updatePrereqs(e.target.value, spellPrereqs, selectedSpells);
    //setTempSelectedSpells(selectedSpells);
    pruneTempSelectedSpells(e.target.value, e.target.checked, selectedSpells);
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
            />
          </div>
        )}
        {isSpell && !isSpellSelected && spell.rank > 1 && (
          <div>{spell.prerequisites}</div>
        )}
      </FlexContainer>
    );

  return (
    <FlexContainer>
      <SquishedFlexContainer
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
      </SquishedFlexContainer>
      <div>
        <Button onClick={(e) => openConfirmationDialog(e)} size="small">
          {isAbility ? "Activate" : "Cast"}
        </Button>
      </div>
    </FlexContainer>
  );
}

function checkPrereqs(spellName, selectedSpells, spellPrereqs) {
  const prereqs = spellPrereqs[spellName];
  if (prereqs === undefined) return true;

  if (spellName === "Magic Shield") {
    if (
      selectedSpells.includes(prereqs[0]) ||
      selectedSpells.includes(prereqs[1])
    )
      return true;
    else return false;
  }

  if (spellName === "Firestorm") {
    if (
      selectedSpells.includes(prereqs[0]) &&
      selectedSpells.includes(prereqs[1])
    )
      return true;
    else return false;
  }

  if (selectedSpells.includes(prereqs[0])) return true;

  return false;
}
