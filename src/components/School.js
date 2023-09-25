import { useContext } from "react";
import { ApplicationContext } from "../ApplicationContext";
import SpellFormatter from "./SpellFormatter";
import styled from "@emotion/styled";

const SchoolContainer = styled.div`
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8px;
  border-radius: 8px;
`;

const SchoolHeader = styled.div`
  font-weight: bold;
  font-size: 16pt;
  color: green;
  border: red;
  -webkit-text-stroke: 1px black;
`;

const AbilityContainer = styled.div`
  margin-bottom: 32px;
`;

const TrickContainer = styled.div`
  margin-bottom: 32px;
`;

const SpellContainer = styled.div``;

export default function School(props) {
  const { inEditMode, selectedSpells } = useContext(ApplicationContext);
  const { school } = props;

  const abilities =
    school.abilities?.filter(
      (ability) => selectedSpells.includes(ability.name) || inEditMode
    ) ?? [];

  const tricks = school.tricks.filter(
    (spell) => selectedSpells.includes(spell.name) || inEditMode
  );

  const spells = school.spells.filter(
    (spell) => selectedSpells.includes(spell.name) || inEditMode
  );

  const hasAbilities = abilities.length > 0;
  const hasTricks = tricks.length > 0;
  const hasSpells = spells.length > 0;

  return (
    <div>
      {(hasAbilities || hasTricks || hasSpells) && (
        <SchoolContainer>
          <SchoolHeader>{school.school}</SchoolHeader>
          {hasAbilities && (
            <AbilityContainer>
              {abilities.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="ability"
                ></SpellFormatter>
              ))}
            </AbilityContainer>
          )}
          {hasTricks && (
            <TrickContainer>
              {tricks.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="trick"
                ></SpellFormatter>
              ))}
            </TrickContainer>
          )}
          {hasSpells && (
            <SpellContainer>
              {spells.map((x, i) => (
                <SpellFormatter
                  key={`${i}-${x.name}`}
                  isSpellChecked={selectedSpells.includes(x.name)}
                  spell={x}
                  type="spell"
                ></SpellFormatter>
              ))}
            </SpellContainer>
          )}
        </SchoolContainer>
      )}
    </div>
  );
}
