import { useState } from "react";

const useApplicationContextStore = () => {
  const [inEditMode, setEditMode] = useState(false);

  return { inEditMode, setEditMode };
};

export default useApplicationContextStore;
