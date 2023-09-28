import { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  FormControlLabel,
  Typography,
} from "@mui/material";

import { ApplicationContext } from "../ApplicationContext";
import SpellConfirmation from "./SpellConfirmation";
import { FlexContainer } from "./utility";

export default function SpellHeader(props) {
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
            value="bottom"
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
              value="bottom"
            />
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

      <Dialog open={openModal}>
        <SpellConfirmation
          isAbility={isAbility}
          isTrick={isTrick}
          isSpell={isSpell}
          spellName={spell.name}
          toggleDialog={toggleDialog}
        ></SpellConfirmation>
      </Dialog>
    </FlexContainer>
  );
}
