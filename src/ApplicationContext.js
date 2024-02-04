import { createContext, useState } from "react";
import { v4 as uuid } from "uuid";

import { saveLocalStorage } from "./components/utility";

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
  const [version, setVersion] = useState("");
  const [acknowledgedVersion, setAcknowledgedVersion] = useState("");

  const [inEditMode, setEditMode] = useState(false);

  const [characters, setCharacters] = useState([]);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const [name, setName] = useState("");
  const [baseHP, setBaseHP] = useState(0);
  const [baseWP, setBaseWP] = useState(0);
  const [currentHP, setCurrentHP] = useState(0);
  const [currentWP, setCurrentWP] = useState(0);
  const [usedRoundRest, setUsedRoundRest] = useState(false);
  const [usedStretchRest, setUsedStretchRest] = useState(false);

  const [hasStrCondition, setHasStrCondition] = useState(false);
  const [hasConCondition, setHasConCondition] = useState(false);
  const [hasAglCondition, setHasAglCondition] = useState(false);
  const [hasIntCondition, setHasIntCondition] = useState(false);
  const [hasWilCondition, setHasWilCondition] = useState(false);
  const [hasChaCondition, setHasChaCondition] = useState(false);

  const [selectedSpells, setSelectedSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [undoAction, setUndoAction] = useState(null);

  return {
    version,
    acknowledgedVersion,
    saveAcknowledgedVersion,
    loadGlobalMessagingStatus,

    inEditMode,
    setEditMode,
    characters,

    name,
    baseHP,
    baseWP,
    currentHP,
    currentWP,
    usedRoundRest,
    usedStretchRest,
    hasStrCondition,
    hasConCondition,
    hasAglCondition,
    hasIntCondition,
    hasWilCondition,
    hasChaCondition,
    preparedSpells,
    selectedSpells,
    undoAction,
    selectedCharacterId,

    addCharacter,
    deleteCharacter,
    isCharacterListEmpty,
    loadCharacter,
    loadCharacters,
    saveCharacter,
    setImportedData,
    setVersion,
  };

  function saveAcknowledgedVersion() {
    setAcknowledgedVersion(version);
    saveLocalStorage("acknowledgedVersion", version);
  }

  function addCharacter(name) {
    var id = uuid().split("-")[0];
    var character = {
      id: id,
      name: name,
      baseHP: 0,
      currentHP: 0,
      baseWP: 0,
      currentWP: 0,
      usedRoundRest: false,
      usedStretchRest: false,
      hasStrCondition: false,
      hasConCondition: false,
      hasAglCondition: false,
      hasIntCondition: false,
      hasWilCondition: false,
      hasChaCondition: false,
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
        case "usedRoundRest":
          character.usedRoundRest = property.value;
          setUsedRoundRest(property.value);
          break;
        case "usedStretchRest":
          character.usedStretchRest = property.value;
          setUsedStretchRest(property.value);
          break;
        case "hasStrCondition":
          character.hasStrCondition = property.value;
          setHasStrCondition(property.value);
          break;
        case "hasConCondition":
          character.hasConCondition = property.value;
          setHasConCondition(property.value);
          break;
        case "hasAglCondition":
          character.hasAglCondition = property.value;
          setHasAglCondition(property.value);
          break;
        case "hasIntCondition":
          character.hasIntCondition = property.value;
          setHasIntCondition(property.value);
          break;
        case "hasWilCondition":
          character.hasWilCondition = property.value;
          setHasWilCondition(property.value);
          break;
        case "hasChaCondition":
          character.hasChaCondition = property.value;
          setHasChaCondition(property.value);
          break;
        case "preparedSpells":
          character.preparedSpells = property.value;
          setPreparedSpells(property.value);
          break;
        case "selectedSpells":
          character.selectedSpells = property.value;
          setSelectedSpells(property.value);
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
    setUsedRoundRest(character.usedRoundRest);
    setUsedStretchRest(character.usedStretchRest);
    setHasStrCondition(character.hasStrCondition);
    setHasConCondition(character.hasConCondition);
    setHasAglCondition(character.hasAglCondition);
    setHasIntCondition(character.hasIntCondition);
    setHasWilCondition(character.hasWilCondition);
    setHasChaCondition(character.hasChaCondition);
    setPreparedSpells(character.preparedSpells);
    setSelectedSpells(character.selectedSpells);
    setUndoAction(character.undoAction);
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

  function loadGlobalMessagingStatus() {
    const acknowledgedVersion =
      localStorage.getItem("acknowledgedVersion") || "";
    setAcknowledgedVersion(acknowledgedVersion);
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
    saveLocalStorage("acknowledgedVersion", data.acknowledgedVersion);
    saveLocalStorage("selectedCharacterId", data.selectedCharacterId);
    saveLocalStorage("characters", data.characters);

    loadCharacters();
  }
};

export { ApplicationContext, ApplicationContextProvider };
