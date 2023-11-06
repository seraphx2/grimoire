import { useContext, useState } from "react";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

import { ApplicationContext } from "../ApplicationContext";
import { FlexContainer, SquishedFlexContainer } from "./utility";

export default function SpellHeader(props) {
  const { inEditMode, preparedSpells } = useContext(ApplicationContext);
  const {
    isAbility,
    isSpell,
    isPrepared,
    isSpellChecked,
    spell,
    toggleConfirmationDialog,
  } = props;

  function openConfirmationDialog(e) {
    e.stopPropagation();
    toggleConfirmationDialog();
  }

  const [isSpellSelected, setSpellSelected] = useState(isSpellChecked);

  if (inEditMode)
    return (
      <FlexContainer>
        <div style={{ alignItems: "center", display: "flex" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isSpellSelected}
                name="spell"
                size="small"
                value={spell.name}
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
              control={
                <Checkbox
                  defaultChecked={preparedSpells.includes(spell.name)}
                  name="prepared"
                  size="small"
                  value={spell.name}
                />
              }
              label="Prepare?"
              labelPlacement="start"
            />
          </div>
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
