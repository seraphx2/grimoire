import { useContext } from "react";

import { ApplicationContext } from "../ApplicationContext";
import SupplementalSpellInfo from "./SupplementalSpellInfo";
import SpellHeader from "./SpellHeader";
import SpellProperties from "./SpellProperties";

export default function SpellFormatter(props) {
  const { isSpellChecked, spell, type } = props;
  const { inEditMode } = useContext(ApplicationContext);

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
      />
      {!isAbility && !isTrick && !inEditMode && (
        <SpellProperties spell={spell} />
      )}
      {!inEditMode && <div>{spell.description}</div>}
      {!inEditMode && <SupplementalSpellInfo spellName={spell.name} />}
    </div>
  );
}
