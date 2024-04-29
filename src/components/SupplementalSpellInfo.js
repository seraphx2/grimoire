import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FlexContainer } from "./utility";

export default function SupplementalSpellInfo(props) {
  const { spellName } = props;
  let Content = null;

  switch (spellName) {
    case "Assassin":
      Content = <Assassin />;
      break;
    case "Defensive":
      Content = <Defensive />;
      break;
    case "Fast Footwork":
      Content = <FastFootwork />;
      break;
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
      <AccordionDetails>{Content}</AccordionDetails>
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

function Assassin() {
  return (
    <Section header={"SNEAK ATTACK (page 43)"}>
      <div>
        When you sneak up on someone unde- tected and perform an attack, it is
        called a sneak attack. First you make a SNEAKING roll. Moving close
        enough to attack in melee combat (within 2 meters for most weapons)
        gives you a bane. If you fail, the enemy notices you – draw initiative.
      </div>
      <div>
        If you succeed your attack counts as surprising, which means that you
        can choose any initiative card you want. You also get a boon on the
        attack, and the target can nei- ther dodge nor parry. Using a subtle
        weapon increases the damage by one die (for example 2D8 instead of D8).
        Sneak attacks are always performed individually, by one attacker against
        one target.
      </div>
    </Section>
  );
}

function Defensive() {
  return (
    <Section header={"Parry (page 46)"}>
      <div>
        When hit by an attack in close combat, you can choose to parry the
        attack with a drawn weapon or shield. Note that you cannot draw a weapon
        to parry, as free actions can only be performed on your own turn. You
        must declare that you are going to parry before the attacker rolls for
        damage. You cannot parry unarmed. It is also impossible to both parry
        and dodge the same attack. You can parry while prone. When parrying, you
        roll against your skill level for the weapon.
      </div>
      <div>
        <strong>Reaction</strong>: Parrying is a reaction, as it breaks the
        initiative order. It replaces your regular action, and you must imme-
        diately flip your initiative card. This means that you cannot parry if
        you have already performed your action in the round (but see the heroic
        ability Defensive).
      </div>
      <div>
        <strong>Durability</strong>: If your parry succeeds, the enemy's attack
        hits your weapon or shield, and you suffer no damage. How- ever, if the
        damage exceeds your weapon's durability, the weapon is damaged and
        cannot be used until it is repaired with a CRAFTING roll.
      </div>
      <div>
        <strong>Shield</strong>: If you have a shield drawn, you can parry with
        it instead of your weapon. There is no skill for shields - instead you
        can use any STR-based melee skill (i.e. any of them except KNIVES and
        STAVES) to parry with a shield.
      </div>
      <div>
        <strong>Piercing Damage</strong>: Piercing attacks can never damage a
        parrying weapon or shield.
      </div>
      <div>
        <strong>Monsters</strong>: As a rule, monster attacks (page 83) cannot
        be parried, unless otherwise specified.
      </div>
    </Section>
  );
}

function FastFootwork() {
  return (
    <Section header={"Dodging (page 47)"}>
      <div>
        As an alternative to parrying, you can try to dodge when hit by an
        attack. You cannot parry and dodge the same attack – you must choose one
        or the other. You can dodge while prone. You must declare that you are
        dodging before your opponent rolls for damage. Roll for EVADE – on
        success you evade the attack and take no damage. On a failure, you are
        hit by the attack.
      </div>
      <div>
        <strong>Reaction</strong>: Dodging is a reaction and, like parrying,
        requires that you have not already performed your action in the round.
        Once you have dodged, your action in the round is spent and you must
        flip your initiative card.
      </div>
      <div>
        <strong>Movement</strong>: On a successful dodge you may, if you want,
        move up to 2 meters in any direction. This movement does not trigger
        free attacks from anyone.
      </div>
      <div>
        <strong>Monsters</strong>: As a rule, monster attacks (page 83) cann be
        dodged, unless otherwise specified.
      </div>
    </Section>
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
