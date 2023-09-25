import { createContext, useState } from "react";

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
  const [selectedSpells, setSelectedSpells] = useState([]);
  const [preparedSpells, setPreparedSpells] = useState([]);
  const [baseWP, setBaseWP] = useState(10);
  const [currentWP, setCurrentWP] = useState(0);
  const [baseHP, setBaseHP] = useState(10);
  const [currentHP, setCurrentHP] = useState(0);
  const [undoAction, setUndoAction] = useState(null);

  return {
    inEditMode,
    setEditMode,
    selectedSpells,
    setSelectedSpells,
    preparedSpells,
    setPreparedSpells,
    baseWP,
    setBaseWP,
    currentWP,
    setCurrentWP,
    baseHP,
    setBaseHP,
    currentHP,
    setCurrentHP,
    undoAction,
    setUndoAction,
  };
};

export { ApplicationContext, ApplicationContextProvider };
