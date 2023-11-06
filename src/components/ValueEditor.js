import { useLayoutEffect, useState } from "react";
import { IconButton, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { DiceRoller } from "dice-roller-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

import { SquishedFlexContainer } from "./utility";

export default function ValueEditor(props) {
  const { callback, defaultValue, id, min, max, dieTypes = null } = props;
  const [newValue, setNewValue] = useState(0);
  const [hasMinedOut, setMinedOut] = useState(min === defaultValue);
  const [hasMaxedOut, setMaxedOut] = useState(max === defaultValue);
  const [selectedDieType, setSelectedDieType] = useState(null);

  function subtractValueAndRunCallback() {
    let updatedValue = newValue - 1;

    evaluateBoundaries(updatedValue);

    setNewValue(updatedValue);
    if (callback) callback(updatedValue);
  }

  function rollDice() {
    const diceRoller = new DiceRoller();
    const roll = diceRoller.rollValue(`1d${selectedDieType}`);
    evaluateBoundaries(roll);
    setNewValue(roll);
    if (callback) callback(roll);
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

  useLayoutEffect(() => {
    const runEffect = async () => {
      if (Array.isArray(dieTypes)) setSelectedDieType(dieTypes[0]);
      else setSelectedDieType(dieTypes);
    };
    runEffect();
    //eslint-disable-next-line
  }, []);

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
      {dieTypes !== null && (
        <div style={{ marginLeft: "8px" }}>
          <IconButton onClick={rollDice}>
            <DieSelector selectedDieType={selectedDieType} />
          </IconButton>
          {!Array.isArray(dieTypes) && <span>d{selectedDieType}</span>}
          {Array.isArray(dieTypes) && (
            <Select
              onChange={(e) => setSelectedDieType(e.target.value)}
              size="small"
              style={{ marginLeft: "8px" }}
              value={selectedDieType}
              variant="standard"
            >
              {dieTypes.map((v, i) => (
                <MenuItem value={v}>d{v}</MenuItem>
              ))}
            </Select>
          )}
        </div>
      )}
    </SquishedFlexContainer>
  );
}

function DieSelector(props) {
  const { selectedDieType } = props;

  switch (selectedDieType) {
    case 4:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d4",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    case 6:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d6",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    case 8:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d8",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    case 10:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d10",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    case 12:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d12",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    case 20:
      return (
        <FontAwesomeIcon
          icon={icon({
            name: "dice-d20",
            family: "classic",
            style: "duotone",
          })}
        />
      );

    default:
      break;
  }
}
