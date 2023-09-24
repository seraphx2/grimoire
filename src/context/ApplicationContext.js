import { createContext } from "react";
import useApplicationContextStore from "./useApplicationContextStore";

const ApplicationContext = createContext({
  inEditMode: undefined,
  setEditMode: () => void 0,
});

const ApplicationContextProvider = ({ children }) => {
  const store = useApplicationContextStore;
  console.log(store.inEditMode);

  return (
    <ApplicationContext.Provider value={store}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationContextProvider };
