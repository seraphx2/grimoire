import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import IsoIcon from "@mui/icons-material/Iso";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";

import { SquishedFlexContainer } from "./utility";

export default function SupplementalInfo() {
  const [selectedAccordion, setSelectedAccordion] = useState(null);

  function resetAccordion(id) {
    if (id === selectedAccordion) setSelectedAccordion(null);
    else setSelectedAccordion(id);
  }

  return (
    <div>
      <About id="About" selected={selectedAccordion} reset={resetAccordion} />
      <PreparedSpells
        id="PreparedSpells"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <PowerLevel
        id="PowerLevel"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <MagicAndMetal
        id="MagicAndMetal"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <Requirements
        id="Requirements"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <CastingTime
        id="CastingTime"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <Range id="Range" selected={selectedAccordion} reset={resetAccordion} />
      <Duration
        id="Duration"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <DragonsAndDemons
        id="DragonsAndDemons"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
      <LearningMagic
        id="LearningMagic"
        selected={selectedAccordion}
        reset={resetAccordion}
      />
    </div>
  );
}

function Section(props) {
  const { id, selected, reset, header, children } = props;

  function toggle() {
    reset(id);
  }

  return (
    <Accordion disableGutters expanded={id === selected} onChange={toggle}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {id === "About" && (
          <SquishedFlexContainer>
            <InfoIcon color="info" style={{ marginRight: 8 }} />
            <strong>{header}</strong>
          </SquishedFlexContainer>
        )}
        {!(id === "About") && <strong>{header}</strong>}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

function About(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="ABOUT THIS APP">
      <AboutContent />
    </Section>
  );
}

export function AboutContent() {
  return (
    <div>
      <Typography fontSize={14} color="info.main">
        <strong>Dragonbane Grimoire</strong> stores all saved data using the
        Local Storage provided by your device. It runs exclusively on your
        device and never talks to the host server except to retrieve and update
        the app. There are no external connections made to any other service or
        tracking tools such as Google Ads, Analytics, or Tag Manager (or similar
        services from any other company).
      </Typography>
      <p>
        <strong>Dragonbane Grimoire</strong> is designed to be a WP/HP Tracker
        and Spell Manager for wizards. At first glance the app is bare, but
        tapping <MenuOpenIcon color="primary" style={{ fontSize: "1rem" }} /> in
        the top left corner of the app will get things started. Once the drawer
        opens, tap on <strong>Add Character</strong> and you will be prompted
        for a character name. Anytime you want to switch Characters or Add a new
        one, just tap{" "}
        <MenuOpenIcon color="primary" style={{ fontSize: "1rem" }} />.
      </p>
      <p>
        Now that you have a Character added, you can begin editing your
        Character details. Tap{" "}
        <EditIcon color="primary" style={{ fontSize: "1rem" }} /> in the bottom
        right corner of the screen to edit your selected Character. First, set
        your base WP and HP. <strong>Note:</strong> These values are still meant
        to be derived from your character sheet, not calculated by this app.
        Next, select your spells on the left and then lastly mark your prepared
        spells with the corresponding checkbox to the right. (The{" "}
        <strong>Master Spellcaster</strong> Heroic Ability is assigned a slot in
        the <strong>General Magic</strong> school).
      </p>
      <p>
        Tapping <SaveIcon color="primary" style={{ fontSize: "1rem" }} /> in the
        bottom right corner of the app will save your selections and bring you
        back to the main screen that now displays your saved attribute values
        and your list of spells. (If you tap{" "}
        <CloseIcon color="error" style={{ fontSize: "1rem" }} />, any changes
        will be discarded.) Tap{" "}
        <RefreshIcon color="warning" style={{ fontSize: "1rem" }} /> next to
        each attribute to fill/reset your current WP and HP. Tapping{" "}
        <IsoIcon color="secondary" style={{ fontSize: "1rem" }} /> allows you to
        add or subtract a customized amount from your current attribute values,
        in case any forces outside of the app manager affects them, so that you
        always have accurate current WP and HP.
      </p>
      <p>
        Heroic Abilities, Tricks, and Spells can manipulate your WP and HP by
        clicking Activate (for Heroic Abilities) or Cast (for Tricks and
        Spells). Casting Spells will present you with the ability to modify the
        WP cost based on Power Level, casting indoors for Lightning-based
        spells, and if you don't have enough WP, setting the HP burned from
        utilizing <strong>Power from the Body</strong>. If you do an Action in
        error, you can undo the last Action you took by tapping{" "}
        <UndoIcon color="primary" style={{ fontSize: "1rem" }} /> to regain any
        lost WP or HP without having to remember the exact values.
      </p>
      <p>
        Below, you will also see supplemental information concerning key rules
        regarding spells. This is mainly explanatory topics from the Magic
        section, but also pulling in information from other sections of the book
        like Base Chance values. Spells on the main page will also have notes
        about rules referenced in the spell (like Cold damage for Frost) or
        Monster stats (for each of the Elementalism summons) directly under the
        spell description. All of this is provided to reduce how often a player
        has to open the actual book for these common, key rules.
      </p>
    </div>
  );
}

function PreparedSpells(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="PREPARED SPELLS">
      <p>
        Spells are complicated, and the maximum number of spells you can hold
        prepared in your memory at the same time is equal to your base chance
        for INT (page 25). When you have reached your limit and want to prepare
        another spell, you need to replace a spell. To prepare spells, you need
        to study them in a grimoire. This takes a shift of time, regardless of
        the number of spells. It can be done during a shift rest (page 52). You
        can only prepare spells that you have learned (page 61). Mark your
        prepared spells with an X on your character sheet.
      </p>
      <Table>
        <TableHead>
          <QuickTableRow column1="Intelligence" column2="Base Chance" />
        </TableHead>
        <TableBody>
          <QuickTableRow column1="1-5" column2="3" />
          <QuickTableRow column1="6-8" column2="4" />
          <QuickTableRow column1="9-12" column2="5" />
          <QuickTableRow column1="13-15" column2="6" />
          <QuickTableRow column1="16-18" column2="7" />
        </TableBody>
      </Table>
    </Section>
  );
}

function PowerLevel(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="POWER LEVEL">
      <p>
        The power level of a spell indicates how much power you charge it with.
        The power level ranges from 1 to 3. Casting a spell costs 2 WP per power
        level. In other words, normal spells always cost at least 2 WP, and
        magic tricks always cost 1 WP. Some spells do not use power level -
        these always cost 2 WP.
      </p>
      <p>
        <strong>Power from the Body</strong>: If you have zero WP left, you can
        draw power from your body if need be. But this is harmful, potentially
        even lethal. Roll a die of your choice (D4, D6, D8, D10, D12, or D20)
        before casting the spell - the result indicates how many WP you gain and
        must use straight away, but you also take the same amount of damage. WP
        not used immediately are lost. The damage is applied after the spell is
        cast. <em>Power from the body cannot be used for healing spells</em>.
      </p>
    </Section>
  );
}

function MagicAndMetal(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="MAGIC AND METAL">
      <p>
        Metal has an anti-magical effect, which means that you cannot use magic
        if you are wearing metal armor or have a metal weapon at hand. This
        includes partially metal items such as axes, spears, studded leather,
        and arrows (but not staves, clubs, or slings). Items in your inventory
        do not count.
      </p>
    </Section>
  );
}

function Requirements(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="REQUIREMENTS">
      <p>
        To cast a spell, you must fulfill one or more requirements which are
        specified in the description of each spell.
      </p>
      <p>
        <strong>Word</strong>: The spell is activated with a chant or power
        word.
      </p>
      <p>
        <strong>Gesture</strong>: The spell is activated by making specific hand
        movements.
      </p>
      <p>
        <strong>Focus</strong>: The spell is activated with an item held in your
        hand, such as a wand, crystal ball, or amulet.
      </p>
      <p>
        <strong>Ingredient</strong>: The spell is activated using a certain
        ingredient, which is consumed in the process.
      </p>
      <p>
        Some spells have multiple requirements. You cannot cast a spell unless
        all its requirements are fulfilled.
      </p>
    </Section>
  );
}

function CastingTime(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="CASTING TIME">
      <p>
        Unless otherwise stated, casting a spell always counts as an action in
        combat. However, there are reaction spells which are performed outside
        your own turn. Unlike other reactions in combat, such as parrying and
        dodging, reaction spells do not replace your regular action in the
        round. This means that you can cast as many of them as you want, if you
        have enough WP. There are also rituals, which take a stretch of time or
        even a shift to perform.
      </p>
      <p>
        <strong>Grimoire</strong>: Casting an unprepared spell from your
        grimoire takes twice as long, which means that you must spend an extra
        round, stretch, or shift on preparations. Make the roll when the spell
        is completed. Reaction spells cannot be cast from your grimoire.
      </p>
    </Section>
  );
}

function Range(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="RANGE">
      <p>
        Each spell has a maximum range. Unlike ranged weapons, spells cannot be
        used on targets outside their specified range. Personal range means that
        the spell only affects the person casting it.
      </p>
      <p>
        <strong>Area of Effect</strong>: Some spells affect an entire area. That
        area is called the area of effect. Unless stated otherwise, the area of
        effect always starts at the mage casting the spell. Area of effect
        spells can be dodged but not parried, unless stated otherwise. You can
        exempt one or more targets within the area from the spell's effects, but
        you then get a bane on the roll.
      </p>
      <p>
        <strong>Sphere</strong>: If the range is described as sphere, the spell
        affects all targets within the chosen area except the mage themself.
      </p>
      <p>
        <strong>Cone</strong>: If the range is described as cone, the spell
        affects all targets within a cone-shaped area whose width at any given
        point equals the distance from the source of the spell. The range
        indicates the length of the cone.
      </p>
    </Section>
  );
}

function Duration(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="DURATION">
      <p>Each spell specifies the duration of its effect.</p>
      <p>
        <strong>Instant</strong>: The effect occurs instantly and has no lasting
        effect.
      </p>
      <p>
        <strong>Round</strong>: The effect lasts until your turn in the next
        round.
      </p>
      <p>
        <strong>Stretch</strong>: The effect lasts for one stretch of time.
      </p>
      <p>
        <strong>Shift</strong>: The effect lasts until the end of the current
        shift.
      </p>
      <p>
        <strong>Concentration</strong>: The effect ceases if you perform another
        action, take damage, or fail a WIL roll for resisting fear. If you are
        interrupted by a sudden disturbance, such as a sound, you must make a
        WIL roll (not an action) to maintain your concentration.
      </p>
    </Section>
  );
}

function DragonsAndDemons(props) {
  const { id, selected, reset } = props;

  return (
    <Section
      id={id}
      selected={selected}
      reset={reset}
      header="FAILURE, DRAGONS, AND DEMONS"
    >
      <p>
        If the roll for casting a spell fails, the spell has no effect, but you
        still spend your WP. You are free to describe how the failure manifests
        itself in the story, as long as it has no mechanical effect.
      </p>
      <p>
        <strong>Rolling a Dragon</strong>: Rolling a Dragon when you cast a
        spell means that your target must roll a dragon to resist, parry, or
        dodge the spell, and that you may choose one of the following effects:
      </p>
      <List>
        <ListItem>
          <ListItemText>
            The damage or range of the spell is doubled.
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>The spell does not cost any WP.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            You can immediately cast another spell, but get a bane on the roll.
          </ListItemText>
        </ListItem>
      </List>
      <p>
        <strong>Rolling a Demon</strong>: If you roll a Demon, you cannot push
        the roll. There is also a risk of something going terribly wrong – see
        the optional rule for magical mishaps below.
      </p>
      <Table>
        <TableHead>
          <QuickTableRow column1="D20" column2="Magical Mishap" />
        </TableHead>
        <TableBody>
          <QuickTableRow
            column1="1"
            column2="The magical powers leave you Dazed."
          />
          <QuickTableRow
            column1="2"
            column2="The spellcasting suddenly makes you Exhausted."
          />
          <QuickTableRow
            column1="3"
            column2="The energies take a toll on your body and make you Sickly."
          />
          <QuickTableRow
            column1="4"
            column2="You lose control of the spell, which makes you very Angry."
          />
          <QuickTableRow
            column1="5"
            column2="The spell subjects you to demonic visions that leave you Scared."
          />
          <QuickTableRow
            column1="6"
            column2="You see the world beyond the veil and realize your own insignificance. You feel Disheartened."
          />
          <QuickTableRow
            column1="7"
            column2="The magic ravages your body, inflicting D6 damage per power level."
          />
          <QuickTableRow
            column1="8"
            column2="The spell drains your willpower and you lose D6 WP per power level."
          />
          <QuickTableRow
            column1="9"
            column2="The spell gives rise to a magical disease with virulence 3D6. You and everyone you come into contact with during the next shift are exposed to the disease."
          />
          <QuickTableRow
            column1="10"
            column2="Another random spell of yours is activated instead of the one you cast, with the same target and power level."
          />
          <QuickTableRow
            column1="11"
            column2="You vomit a frog the moment you tell a lie. Roll D4 every morning. On a 1, the effect wears off. It can also be lifted with DISPEL."
          />
          <QuickTableRow
            column1="12"
            column2="Any gold or silver you touch withers into dust. Roll D4 every morning. On a 1, the effect wears off. It can also be lifted with DISPEL."
          />
          <QuickTableRow
            column1="13"
            column2="The spell blinds you, and you act as if in total darkness (page 52). Roll D4 every morning. On a 1, you recover. The effect can also be lifted with DISPEL."
          />
          <QuickTableRow
            column1="14"
            column2="You are struck by amnesia and forget who you and the other player characters are. The effect must be roleplayed. Roll D4 every morning. On a 1, your memory returns"
          />
          <QuickTableRow
            column1="15"
            column2="The spell also affects a friend or other unintended victim. A healing or helping spell affects an enemy."
          />
          <QuickTableRow
            column1="16"
            column2="The spell backfires. An offensive spell affects you instead of the intended target. A protecting or healing spell inflicts damage instead."
          />
          <QuickTableRow
            column1="17"
            column2="You turn into an animal. Roll D6. 1: cat, 2: fox, 3: goat, 4: wolf, 5: deer, 6: bear. You get stats according to the table on page 99 and cannot speak, but you retain your mental acuity. Roll a D4 every morning. On a 1, you revert back to your original form."
          />
          <QuickTableRow
            column1="18"
            column2="You become one category younger, for example from adult to young. Your attributes and derived ratings change as per the table on page 24, but your skill levels do not. If you were already young, you turn into a child with −2 STR and CON, to a minimum of 3. The effect is permanent and you age normally from your new age."
          />
          <QuickTableRow
            column1="19"
            column2="You become one category older, for example from adult to old. Your attributes and derived ratings change as per the table on page 24, but your skill levels do not. If you were already old, you become very frail and get −2 STR and CON. The effect is permanent and you age normally from your new age."
          />
          <QuickTableRow
            column1="20"
            column2="Your magic attracts a demon (page 85) from another dimension. The demon shows up within the next shift and attacks or causes some kind of trouble. The details are up to the GM."
          />
        </TableBody>
      </Table>
    </Section>
  );
}

function LearningMagic(props) {
  const { id, selected, reset } = props;

  return (
    <Section id={id} selected={selected} reset={reset} header="LEARNING MAGIC">
      <p>
        You can learn new spells from a teacher or grimoire. You must have a
        skill level in the relevant school of magic, or any school of magic for
        general spells.
      </p>
      <p>
        <strong>Prerequisites</strong>: Some spells have a prerequisite that
        must be met in order to learn them. It is usually a school of magic or
        knowing another spell
      </p>
      <p>
        <strong>Teachers</strong>: The easiest (but often most expensive) way to
        learn a spell is from a teacher who already knows it. The lesson takes
        one shift, but you cannot activate the new spell until the end of the
        game session. You must then use an advancement mark (page 29) for the
        school to learn the new spell instead of trying to increase your skill
        level in the school. Make a roll against INT, with a boon. On success
        you learn the spell, otherwise you do not.
      </p>
      <p>
        <strong>Grimoires</strong>: If you are lucky, you can find spells in
        other mages' grimoires. You can learn them on your own. This works the
        same way as with a teacher, but you roll against LANGUAGES instead of
        INT, without the boon.
      </p>
      <p>
        <strong>Magic Tricks</strong>: Magic tricks are easier to learn than
        real spells. It takes one stretch to learn a new trick from a teacher or
        grimoire. No advancement mark or roll is required.
      </p>
      <p>
        <strong>Schools of Magic</strong>: You can learn additional schools of
        magic by first acquiring the heroic ability Magic Talent (page 38), and
        then studying under a teacher with a skill level in the school for at
        least a week. At the end of the week you make a roll against INT. On a
        success you get your base chance (INT) as the skill level in the school.
        On failure you may try again after another week of study. Even non-mages
        can learn magic this way
      </p>
    </Section>
  );
}

function QuickTableRow(props) {
  const { column1, column2 } = props;

  return (
    <TableRow>
      <TableCell>{column1}</TableCell>
      <TableCell>{column2}</TableCell>
    </TableRow>
  );
}
