import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { saveLocalStorage } from "./components/utility";

import spellsv12 from "./data/spells-v1.2.json";

const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const store = useApplicationContextStore();

  return (
    <ApplicationContext.Provider value={store}>
      {children}
    </ApplicationContext.Provider>
  );
};

const useApplicationContextStore = () => {
  const [version, setVersion] = useState(false);

  const [inEditMode, setEditMode] = useState(false);

  const [spells, setSpells] = useState([]);
  const [spellPrereqs, setSpellPrereqs] = useState({});

  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const [name, setName] = useState("");
  const [baseHP, setBaseHP] = useState(0);
  const [baseWP, setBaseWP] = useState(0);
  const [currentHP, setCurrentHP] = useState(0);
  const [currentWP, setCurrentWP] = useState(0);
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [undoAction, setUndoAction] = useState(null);

  const [tempPreparedSpells, setTempPreparedSpells] = useState([]);
  const [tempSelectedSpells, setTempSelectedSpells] = useState([]);

  return {
    version,

    inEditMode,
    setEditMode,

    spells,
    spellPrereqs,
    characters,
    selectedCharacterId,

    name,
    baseHP,
    baseWP,
    currentHP,
    currentWP,
    preparedSpells,
    selectedSpells,
    undoAction,

    addCharacter,
    deleteCharacter,
    isCharacterListEmpty,
    loadCharacter,
    loadCharacters,
    loadSpells,
    saveCharacter,
    setImportedData,
    setVersion,

    tempPreparedSpells,
    tempSelectedSpells,
    resetTempSpellBuckets,
    setTempPreparedSpells,
    setTempSelectedSpells,
  };

  function addCharacter(name) {
    var id = uuid().split("-")[0];
    var character = {
      id: id,
      name: name,
      baseHP: 0,
      currentHP: 0,
      baseWP: 0,
      currentWP: 0,
      preparedSpells: [],
      selectedSpells: [],
      undoAction: null,
    };
    characters.push(character);

    saveSelectedCharacterId(id);
    saveLocalStorage("characters", characters);

    loadCharacter(character);
  }

  function deleteCharacter() {
    const { index } = getCharacter();

    characters.splice(index, 1);
    saveCharacters(characters);

    if (characters.length > 0) {
      saveSelectedCharacterId(characters[0].id);
      loadCharacter(characters[0]);
    } else {
      localStorage.removeItem("selectedCharacterId");
      localStorage.removeItem("characters");
    }

    setEditMode(false);
  }

  function getCharacter() {
    var character = characters.filter((x) => x.id === selectedCharacterId)[0];
    var index = characters.indexOf(character);
    return { index: index, character: character };
  }

  function isCharacterListEmpty() {
    return characters.length === 0;
  }

  function saveCharacter(input) {
    const { index, character } = getCharacter();

    let properties = [];
    if (Array.isArray(input)) properties = input;
    else properties.push(input);

    properties.forEach((property) => {
      switch (property.name) {
        case "name":
          character.name = property.value;
          setName(property.value);
          break;
        case "baseHP":
          character.baseHP = property.value;
          setBaseHP(property.value);
          break;
        case "baseWP":
          character.baseWP = property.value;
          setBaseWP(property.value);
          break;
        case "currentHP":
          character.currentHP = property.value;
          setCurrentHP(property.value);
          break;
        case "currentWP":
          character.currentWP = property.value;
          setCurrentWP(property.value);
          break;
        case "preparedSpells":
          character.preparedSpells = property.value;
          setPreparedSpells(property.value);
          //setTempPreparedSpells(property.value);
          break;
        case "selectedSpells":
          character.selectedSpells = property.value;
          setSelectedSpells(property.value);
          //setTempSelectedSpells(property.value);
          break;
        case "undoAction":
          character.undoAction = property.value;
          setUndoAction(property.value);
          break;

        default:
          break;
      }
    });

    characters[index] = character;
    saveCharacters(characters);
  }

  function loadCharacter(character) {
    saveSelectedCharacterId(character.id);
    setName(character.name);
    setBaseHP(character.baseHP);
    setBaseWP(character.baseWP);
    setCurrentHP(character.currentHP);
    setCurrentWP(character.currentWP);
    setPreparedSpells(character.preparedSpells);
    setSelectedSpells(character.selectedSpells);
    setUndoAction(character.undoAction);

    setTempPreparedSpells(character.preparedSpells);
    setTempSelectedSpells(character.selectedSpells);
  }

  function loadCharacters() {
    const characters = JSON.parse(
      localStorage.getItem("characters") || JSON.stringify([])
    );
    setCharacters(characters);

    const selectedCharacterId =
      localStorage.getItem("selectedCharacterId") || "";
    setSelectedCharacterId(selectedCharacterId);

    if (!!selectedCharacterId) {
      const character = characters.filter(
        (x) => x.id === selectedCharacterId
      )[0];
      loadCharacter(character);
    }
  }

  function resetTempSpellBuckets() {
    setTempPreparedSpells(preparedSpells);
    setTempSelectedSpells(selectedSpells);
  }

  function saveSelectedCharacterId(id) {
    setSelectedCharacterId(id);
    saveLocalStorage("selectedCharacterId", id);
  }

  function saveCharacters(characters) {
    setCharacters(characters);
    saveLocalStorage("characters", characters);
  }

  function setImportedData(data) {
    saveLocalStorage("selectedCharacterId", data.selectedCharacterId);
    saveLocalStorage("characters", data.characters);

    loadCharacters();
  }

  function loadSpells() {
    setSpells(spellsv12);

    let initializer = {};
    const test = spellsv12
      .map((school, i) =>
        school.spells.map((s, i) => {
          return {
            n: s.name,
            r: s.rank,
            p: s.prerequisites,
          };
        })
      )
      .flat()
      .filter((s) => s.r > 1)
      .reduce((s, i) => {
        let p = [];
        if (Array.isArray(i.p)) p = i.p;
        else p.push(i.p);

        return {
          ...s,
          [`${i.n}`]: p,
        };
      }, initializer);
    setSpellPrereqs(test);
  }
};

export { ApplicationContext, ApplicationContextProvider };
