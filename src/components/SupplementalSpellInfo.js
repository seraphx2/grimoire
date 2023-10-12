import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FlexContainer } from "./utility";

export default function SupplementalSpellInfo(props) {
  const { spellName } = props;
  let Content = null;

  switch (spellName) {
    case "Frost":
      Content = <Frost />;
      break;
    case "Gust Of Wind":
      Content = <GustOfWind />;
      break;
    case "Pillar":
      Content = <Pillar />;
      break;
    case "Gnome":
      Content = <Gnome />;
      break;
    case "Salamander":
      Content = <Salamander />;
      break;
    case "Sylph":
      Content = <Sylph />;
      break;
    case "Undine":
      Content = <Undine />;
      break;
    default:
      Content = null;
  }

  if (Content == null) return null;

  return (
    <Accordion style={{ backgroundColor: "transparent" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <strong>Supplemental</strong>
      </AccordionSummary>
      <AccordionDetails>
        {Content}
      </AccordionDetails>
    </Accordion>
  );
}

function Section(props) {
  const { header, children } = props;

  return (
    <div>
      <div>
        <strong>{header}</strong>
      </div>
      <div style={{ padding: 8 }}>{children}</div>
    </div>
  );
}

function Frost() {
  return (
    <Section header={"COLD (page 54)"}>
      <div>
        On failure you lose D6 HP and D6 WP, and can no longer heal these or
        conditions except through magic. You must then keep making rolls to
        withstand the cold, with the same effect if you fail. If you reach zero
        HP while cold, you die when it is time for the next roll. Only when you
        get warm, if only by a campfire, can you stop making rolls and heal
        normally again.
      </div>
    </Section>
  );
}

function GustOfWind() {
  return (
    <Section header={"MONSTER SIZES (page 83)"}>
      <div>
        <strong>Large</strong> A large monster can block an area of 4x4 meters
        and pass through a 1-meter-wide passage.
      </div>
      <div>
        <strong>Huge</strong> A huge monster can block an area of 8x8 meters and
        pass through a 2-meter-wide passage.
      </div>
      <div>
        <strong>Swarm</strong> A swarm can range in size from Normal to Huge,
        but never blocks the area it is in, and can pass through tiny passages.
      </div>
    </Section>
  );
}

function Pillar() {
  return (
    <Section header={"FALLING (page 53)"}>
      <div>
        Falling on a hard surface inflicts a number of D6s of bludgeoning damage
        equal to half of the height of the fall in meters, rounded down. A fall
        of less than two meters inflicts no damage. A successful ACROBATICS roll
        reduces the number of D6 by half (rounded up). Armor does not protect
        against falling damage.
      </div>
    </Section>
  );
}

function Gnome() {
  return (
    <Section header="STAT BLOCK">
      <Monster
        movement={8}
        armor={4}
        weaponName="Fists Of Stone"
        weaponDetail="Hits automatically in melee combat (but can be dodged or parried) and inflicts D6 bludgeoning damage per power level."
        spellName="Pillar"
        spellDetail="The gnome can cast PILLAR at the same power level as its own, using the mage's WP."
        resistance={null}
        immunity={null}
      />
    </Section>
  );
}

function Salamander() {
  return (
    <Section header="STAT BLOCK">
      <Monster
        movement={12}
        armor={null}
        weaponName="Flaming Grip"
        weaponDetail="Hits automatically in melee combat (but can be dodged) and inflicts D6 damage per power level. Armor has no effect."
        spellName="Fire Orb"
        spellDetail="The salamander can cast FIRE BLAST at the same power level as its own, using the mage's WP."
        resistance="Piercing"
        immunity="Fire, Magical Fire"
      />
    </Section>
  );
}

function Sylph() {
  return (
    <Section header="STAT BLOCK">
      <Monster
        movement={24}
        armor={null}
        weaponName="Howling Winds"
        weaponDetail="Hits automatically in melee combat (but can be dodged). The attack hurls the victim D4 meters per power level and inflicts the same amount of bludgeoning damage."
        spellName="Gust Of Wind"
        spellDetail="The sylph can cast GUST OF WIND at the same power level as its own, using the mage's WP."
        resistance="Piercing"
        immunity={null}
      />
    </Section>
  );
}

function Undine() {
  return (
    <Section header="STAT BLOCK">
      <Monster
        movement={12}
        armor={null}
        weaponName="Wet Embrace"
        weaponDetail="Hits automatically in melee combat (but can be dodged) and inflicts D6 damage per power level. Armor has no effect."
        spellName="Tidal Wave"
        spell="The undine can cast TIDAL WAVE at the same power level as its own, using the mage's WP."
        resistance="Piercing"
        immunity={null}
      />
    </Section>
  );
}

function Monster(props) {
  const {
    movement,
    armor,
    weaponName,
    weaponDetail,
    spellName,
    spellDetail,
    resistance,
    immunity,
  } = props;

  return (
    <div>
      <FlexContainer>
        <div>
          <strong>Movement</strong> {movement}
        </div>
        {armor != null && (
          <div>
            <strong>Armor</strong> {armor}
          </div>
        )}
      </FlexContainer>
      <FlexContainer>
        <div>
          <strong>Life</strong> 5x Power Level (5, 10, 15)
        </div>
        {resistance != null && (
          <div>
            <strong>Resistance</strong> {resistance}
          </div>
        )}
      </FlexContainer>
      {immunity != null && (
        <div>
          <strong>Immunity</strong> {immunity}
        </div>
      )}
      <div>
        <strong>{weaponName}</strong> {weaponDetail}
      </div>
      <div>
        <strong>{spellName}</strong> {spellDetail}
      </div>
    </div>
  );
}
