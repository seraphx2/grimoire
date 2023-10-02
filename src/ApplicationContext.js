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
    saveEditScreenValues,
    updateCharacterValue,
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
    }
    characters.push(character);

    saveSelectedCharacterId(id);
    saveLocalStorage("characters", characters);

    loadCharacter(character);
  }

  function getCharacter() {
    return characters.filter((x) => x.id === selectedCharacterId)[0];
  }

  function isCharacterListEmpty() {
    return characters.length === 0;
  }

  function saveCharacter() {
    const index = characters.indexOf(getCharacter());
    characters[index] = {
      id: selectedCharacterId,
      name: name,
      baseHP: baseHP,
      baseWP: baseWP,
      currentHP: currentHP,
      currentWP: currentWP,
      preparedSpells: preparedSpells,
      selectedSpells: selectedSpells,
      undoAction: undoAction,
    };

    saveLocalStorage("characters", characters);
  }

  function loadCharacter(character) {
    saveSelectedCharacterId(character.Id);

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

    loadCharacter(getCharacter());
  }

  function saveEditScreenValues(
    baseHP,
    baseWP,
    preparedSpells,
    selectedSpells
  ) {
    setBaseHP(baseHP);
    setBaseWP(baseWP);
    setPreparedSpells(preparedSpells);
    setSelectedSpells(selectedSpells);

    saveCharacter();
  }

  function saveSelectedCharacterId(id) {
    setSelectedCharacterId(id);
    saveLocalStorage("selectedCharacterId", id);
  }

  function updateCharacterValue(property, value) {
    switch (property) {
      case "name":
        setName(value);
        break;
      case "baseHP":
        setBaseHP(value);
        break;
      case "baseWP":
        setBaseWP(value);
        break;
      case "currentHP":
        setCurrentHP(value);
        break;
      case "currentWP":
        setCurrentWP(value);
        break;
      case "preparedSpells":
        setPreparedSpells(value);
        break;
      case "selectedSpells":
        setSelectedSpells(value);
        break;
      case "undoAction":
        setUndoAction(value);
        break;

      default:
        break;
    }
    saveCharacter();
  }

  function updateSelectedCharacter(id) {
    setSelectedCharacterId(id);
    loadCharacter(id);
  }
};

export { ApplicationContext, ApplicationContextProvider };
