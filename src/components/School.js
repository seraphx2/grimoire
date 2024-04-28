import { useContext } from "react";

import { ApplicationContext } from "../ApplicationContext";
import SpellFormatter from "./SpellFormatter";
import { AreaContainer } from "./utility";

export default function School(props) {
  const { inEditMode, selectedSpells } = useContext(ApplicationContext);
  const { school } = props;

  const abilities =
    school.abilities?.filter(
      (ability) => selectedSpells.includes(ability.name) || inEditMode
    ) ?? [];

  const tricks =
    school.tricks?.filter(
      (spell) => selectedSpells.includes(spell.name) || inEditMode
    ) ?? [];

  const spells =
    school.spells?.filter(
      (spell) => selectedSpells.includes(spell.name) || inEditMode
    ) ?? [];

  const hasAbilities = abilities.length > 0;
  const hasTricks = tricks.length > 0;
  const hasSpells = spells.length > 0;

  return (
    <div>
      {(hasAbilities || hasTricks || hasSpells) && (
        <AreaContainer>
          <div
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "16pt",
              WebkitTextStroke: "1px black",
            }}
          >
            {school.school}
          </div>
          {hasAbilities && (
            <div>
              {abilities.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="ability"
                ></SpellFormatter>
              ))}
            </div>
          )}
          {hasTricks && (
            <div>
              {tricks.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="trick"
                ></SpellFormatter>
              ))}
            </div>
          )}
          {hasSpells && (
            <div>
              {spells.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="spell"
                ></SpellFormatter>
              ))}
            </div>
          )}
        </AreaContainer>
      )}
    </div>
  );
}
