import { useContext, useLayoutEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { ApplicationContext } from "../ApplicationContext";
import { FlexContainer, SquishedFlexContainer } from "./utility";

export default function SpellHeader(props) {
  const { inEditMode } = useContext(ApplicationContext);
  const {
    isAbility,
    isSpell,
    isSpellChecked,
    spell,
    preparedSpell,
    toggleConfirmationDialog,
  } = props;

  function openConfirmationDialog(e) {
    e.stopPropagation();
    toggleConfirmationDialog();
  }

  const [isSpellSelected, setSpellSelected] = useState(isSpellChecked);
  const [selectedStatus, setSelectedStatus] = useState("unprepared");

  useLayoutEffect(() => {
    const runEffect = async () => {
      if (preparedSpell !== undefined) setSelectedStatus(preparedSpell.status);
    };
    runEffect();
    //eslint-disable-next-line
  }, []);

  if (inEditMode)
    return (
      <FlexContainer>
        <div style={{ alignItems: "center", display: "flex" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={isSpellSelected}
                name="spell"
                size="small"
                value={spell.name}
              />
            }
            label={spell.name}
            labelPlacement="end"
            onChange={() => setSpellSelected(!isSpellSelected)}
          />
        </div>
        {isSpell && isSpellSelected && (
          <div>
            <Select
              id={spell.name}
              name="prepared"
              onChange={(e) => setSelectedStatus(e.target.value)}
              size="small"
              value={selectedStatus}
              variant="standard"
            >
              <MenuItem value={"unprepared"}>Unprepared</MenuItem>
              <MenuItem value={"prepared"}>Prepared</MenuItem>
              <MenuItem value={"magicitem1"}>Magic Item (PL1)</MenuItem>
              <MenuItem value={"magicitem2"}>Magic Item (PL2)</MenuItem>
              <MenuItem value={"magicitem3"}>Magic Item (PL3)</MenuItem>
            </Select>
          </div>
        )}
        {isSpell && !isSpellSelected && <div>{spell.prerequisite}</div>}
      </FlexContainer>
    );

  let color = "warning.main";
  let status = "UNPREPARED";
  if (isSpell && preparedSpell) {
    if (preparedSpell.status === "prepared") {
      color = "success.main";
      status = "PREPARED";
    }
    if (preparedSpell.status === "magicitem1") {
      color = "secondary.main";
      status = "MAGIC ITEM (PL1)";
    }
    if (preparedSpell.status === "magicitem2") {
      color = "secondary.main";
      status = "MAGIC ITEM (PL2)";
    }
    if (preparedSpell.status === "magicitem3") {
      color = "secondary.main";
      status = "MAGIC ITEM (PL3)";
    }
  }

  return (
    <FlexContainer>
      <SquishedFlexContainer
        style={{
          fontSize: "12pt",
          fontWeight: "bold",
        }}
      >
        {spell.name}
        {isSpell && (
          <Typography
            color={color}
            fontWeight={700}
            style={{ marginLeft: 8 }}
            variant="body2"
          >
            {status}
          </Typography>
        )}
      </SquishedFlexContainer>
      <div>
        <Button onClick={(e) => openConfirmationDialog(e)} size="small">
          {isAbility ? "Activate" : "Cast"}
        </Button>
      </div>
    </FlexContainer>
  );
}
