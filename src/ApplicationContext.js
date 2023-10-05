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
  const [inEditMode, setEditMode] = useState(false);

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

  return {
    inEditMode,
    setEditMode,
    name,
    baseHP,
    baseWP,
    currentHP,
    currentWP,
    preparedSpells,
    selectedSpells,
    undoAction,
    addCharacter,
    characters,
    getCharacter,
    isCharacterListEmpty,
    loadCharacter,
    loadCharacters,
    saveCharacter,
    updateSelectedCharacter,
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
    setCharacters(characters);
    saveLocalStorage("characters", characters);
  }

  function loadCharacter(character) {
    setName(character.name);
    setBaseWP(character.baseWP);
    setCurrentWP(character.currentWP);
    setBaseHP(character.baseHP);
    setCurrentHP(character.currentHP);
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
      localStorage.getItem("selectedCharacterId") || JSON.stringify(null);
    setSelectedCharacterId(selectedCharacterId);

    if (selectedCharacterId !== null) {
      const character = characters.filter(
        (x) => x.id === selectedCharacterId
      )[0];
      loadCharacter(character);
    }
  }

  function saveSelectedCharacterId(id) {
    setSelectedCharacterId(id);
    saveLocalStorage("selectedCharacterId", id);
  }

  function updateSelectedCharacter(id) {
    setSelectedCharacterId(id);
    loadCharacter(id);
  }
};

export { ApplicationContext, ApplicationContextProvider };
