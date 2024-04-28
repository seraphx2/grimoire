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
  const { inEditMode, preparedSpells } = useContext(ApplicationContext);
  const { isSpellChecked, spell, type } = props;
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const isAbility = type === "ability";
  const isTrick = type === "trick";
  const isSpell = type === "spell";

  const preparedSpell =
    preparedSpells.filter((s) => s.name === spell.name)[0] || undefined;

  function toggleConfirmationDialog() {
    setOpenConfirmationDialog(!openConfirmationDialog);
  }

  return (
    <div>
      {inEditMode && (
        <SpellHeader
          isAbility={isAbility}
          isSpell={isSpell}
          isTrick={isTrick}
          isSpellChecked={isSpellChecked}
          preparedSpell={preparedSpell}
          spell={spell}
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
              preparedSpell={preparedSpell}
              spell={spell}
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
            abilityCost={spell.cost ?? 0}
            isAbility={isAbility}
            isTrick={isTrick}
            isSpell={isSpell}
            preparedSpellStatus={preparedSpell?.status || undefined}
            spellName={spell.name}
            toggleConfirmationDialog={toggleConfirmationDialog}
          ></SpellConfirmation>
        </Dialog>
      </DarkTheme>
    </div>
  );
}
