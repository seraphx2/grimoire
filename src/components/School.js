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
  const {
    currentWillpower,
    setCurrentWillpower,
    inEditMode,
    school,
    spellList,
  } = props;

  const abilities =
    school.abilities?.filter(
      (ability) => spellList.includes(ability.name) || inEditMode
    ) ?? [];

  const tricks = school.tricks.filter(
    (spell) => spellList.includes(spell.name) || inEditMode
  );

  const spells = school.spells.filter(
    (spell) => spellList.includes(spell.name) || inEditMode
  );

  return (
    <div>
      {(abilities.length > 0 || tricks.length > 0 || spells.length > 0) && (
        <SchoolContainer>
          <SchoolHeader>{school.school}</SchoolHeader>
          <AbilityContainer>
            {abilities.map((t, i) => (
              <SpellFormatter
                key={t.name}
                currentWillpower={currentWillpower}
                setCurrentWillpower={setCurrentWillpower}
                isChecked={spellList.includes(t.name)}
                inEditMode={inEditMode}
                spell={t}
                willpowerType="ability"
              ></SpellFormatter>
            ))}
          </AbilityContainer>
          <TrickContainer>
            {tricks.map((t, i) => (
              <SpellFormatter
                key={t.name}
                currentWillpower={currentWillpower}
                setCurrentWillpower={setCurrentWillpower}
                isChecked={spellList.includes(t.name)}
                inEditMode={inEditMode}
                spell={t}
                willpowerType="trick"
              ></SpellFormatter>
            ))}
          </TrickContainer>
          <SpellContainer>
            {spells.map((s, i) => (
              <SpellFormatter
                key={s.name}
                currentWillpower={currentWillpower}
                setCurrentWillpower={setCurrentWillpower}
                isChecked={spellList.includes(s.name)}
                inEditMode={inEditMode}
                spell={s}
                willpowerType="spell"
              ></SpellFormatter>
            ))}
          </SpellContainer>
        </SchoolContainer>
      )}
    </div>
  );
}
