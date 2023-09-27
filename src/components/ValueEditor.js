import { useLayoutEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { SquishedFlexContainer } from "./utility";

export default function ValueEditor(props) {
  const { callback, defaultValue, id, min, max } = props;
  const [newValue, setNewValue] = useState(0);
  const [hasMinedOut, setMinedOut] = useState(min === defaultValue);
  const [hasMaxedOut, setMaxedOut] = useState(max === defaultValue);

  function subtractValueAndRunCallback() {
    let updatedValue = newValue - 1;

    evaluateBoundaries(updatedValue);

    setNewValue(updatedValue);
    if (callback) callback(updatedValue);
  }

  function addValueAndRunCallback() {
    let updatedValue = newValue + 1;

    evaluateBoundaries(updatedValue);

    setNewValue(updatedValue);
    if (callback) callback(updatedValue);
  }

  function evaluateBoundaries(updatedValue) {
    if (min === updatedValue) setMinedOut(true);
    else setMinedOut(false);
    if (max === updatedValue) setMaxedOut(true);
    else setMaxedOut(false);
  }

  useLayoutEffect(() => {
    const runEffect = async () => {
      setNewValue(defaultValue);
    };
    runEffect();
  }, [defaultValue, setNewValue]);

  return (
    <SquishedFlexContainer>
      <IconButton
        color={hasMinedOut ? "disabled" : "primary"}
        disabled={hasMinedOut}
        onClick={subtractValueAndRunCallback}
        size="small"
      >
        <RemoveIcon />
      </IconButton>
      <span id={id} style={{ margin: 5, textAlign: "center", width: 16 }}>
        {newValue}
      </span>
      <IconButton
        color={hasMaxedOut ? "disabled" : "primary"}
        disabled={hasMaxedOut}
        onClick={addValueAndRunCallback}
        size="small"
      >
        <AddIcon />
      </IconButton>
    </SquishedFlexContainer>
  );
}
