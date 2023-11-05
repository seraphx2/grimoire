import { useContext, useState } from "react";

import { ApplicationContext } from "../ApplicationContext";
import SupplementalSpellInfo from "./SupplementalSpellInfo";
import SpellHeader from "./SpellHeader";
import SpellProperties from "./SpellProperties";
import { DarkTheme } from "./utility";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import SpellConfirmation from "./SpellConfirmation";
import { css } from "@emotion/css";

const accordion = css`
  background: unset !important;
  border: unset !important;
  box-shadow: unset !important;
  font-size: 10pt !important;
`;

const accordionSummary = css`
  padding: 0 0 !important;
  & .MuiAccordionSummary-expandIconWrapper {
    order: -1;
  }
`;

const accordionDetails = css`
  padding: 0 0 !important;
`;

export default function SpellFormatter(props) {
  const { isSpellChecked, spell, type } = props;
  const { inEditMode, preparedSpells, tempPreparedSpells, tempSelectedSpells } =
    useContext(ApplicationContext);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  //console.log(tempSelectedSpells);
  const isAbility = type === "ability";
  const isTrick = type === "trick";
  const isSpell = type === "spell";
  const isPrepared = preparedSpells.includes(spell.name);

  function toggleConfirmationDialog() {
    setOpenConfirmationDialog(!openConfirmationDialog);
  }

  return (
    <div>
      {inEditMode && (
        <SpellHeader
          isAbility={isAbility}
          isTrick={isTrick}
          isSpell={isSpell}
          isSpellChecked={isSpellChecked}
          spell={spell}
          tempPreparedSpells={tempPreparedSpells}
          tempSelectedSpells={tempSelectedSpells}
          toggleConfirmationDialog={toggleConfirmationDialog}
        />
      )}
      {!inEditMode && (
        <Accordion className={accordion} disableGutters>
          <AccordionSummary
            className={accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <SpellHeader
              isAbility={isAbility}
              isTrick={isTrick}
              isSpell={isSpell}
              isSpellChecked={isSpellChecked}
              spell={spell}
              tempPreparedSpells={tempPreparedSpells}
              tempSelectedSpells={tempSelectedSpells}
              toggleConfirmationDialog={toggleConfirmationDialog}
            />
          </AccordionSummary>

          <AccordionDetails className={accordionDetails}>
            {!isAbility && !isTrick && <SpellProperties spell={spell} />}
            <div>{spell.description}</div>
            <SupplementalSpellInfo spellName={spell.name} />
          </AccordionDetails>
        </Accordion>
      )}

      <DarkTheme>
        <Dialog open={openConfirmationDialog}>
          <SpellConfirmation
            isAbility={isAbility}
            isTrick={isTrick}
            isSpell={isSpell}
            isUnprepared={!isPrepared}
            spellName={spell.name}
            tempPreparedSpells={tempPreparedSpells}
            tempSelectedSpells={tempSelectedSpells}
            toggleConfirmationDialog={toggleConfirmationDialog}
          ></SpellConfirmation>
        </Dialog>
      </DarkTheme>
    </div>
  );
}
