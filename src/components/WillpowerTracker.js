import IsoIcon from "@mui/icons-material/Iso";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import {
  AreaContainer,
  FlexContainer,
  normalize,
  saveLocalStorage,
} from "./utility";
import { ApplicationContext } from "../ApplicationContext";
import { useContext, useState } from "react";
import Sizzle from "sizzle";
import ValueEditor from "./ValueEditor";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function WillpowerTracker(props) {
  const {
    baseWP,
    currentWP,
    baseHP,
    currentHP,
    setCurrentWP,
    setCurrentHP,
    inEditMode,
  } = useContext(ApplicationContext);
  const isUndoDisabled = true;

  return (
    <div>
      {!inEditMode && (
        <FlexContainer>
          <AreaContainer>
            <AttributeManager
              attribute="WP"
              base={baseWP}
              current={currentWP}
              setCurrent={setCurrentWP}
            ></AttributeManager>
          </AreaContainer>
          <AreaContainer>
            <AttributeManager
              attribute="HP"
              base={baseHP}
              current={currentHP}
              setCurrent={setCurrentHP}
            ></AttributeManager>
          </AreaContainer>
          <AreaContainer>
            <IconButton size="small" disabled={isUndoDisabled}>
              <UndoIcon color={isUndoDisabled ? "disabled" : "primary"} />
            </IconButton>
          </AreaContainer>
        </FlexContainer>
      )}
      {inEditMode && (
        <FlexContainer>
          <AreaContainer>
            <EditBaseAttribute
              attribute="WP"
              defaultValue={baseWP}
            ></EditBaseAttribute>
          </AreaContainer>
          <AreaContainer>
            <EditBaseAttribute
              attribute="HP"
              defaultValue={baseHP}
            ></EditBaseAttribute>
          </AreaContainer>
        </FlexContainer>
      )}
    </div>
  );
}

function AttributeManager(props) {
  const { attribute, base, current, setCurrent } = props;
  const [openEditorModal, setOpenEditorModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  function toggleEditorDialog() {
    setOpenEditorModal(!openEditorModal);
  }

  function toggleEditorDialogAccept() {
    const newCurrent =
      current + parseInt(Sizzle(`#modify${attribute}-editor`)[0].textContent);
    setCurrent(newCurrent);
    saveLocalStorage(`current${attribute}`, newCurrent);
    toggleEditorDialog();
  }

  function toggleResetDialog() {
    setOpenResetModal(!openResetModal);
  }

  function toggleResetDialogAccept() {
    setCurrent(base);
    saveLocalStorage(`current${attribute}`, base);
    toggleResetDialog();
  }

  return (
    <div>
      <FlexContainer>
        <div style={{ marginRight: 16 }}>
          {attribute}: {current}
        </div>
        <div>
          <IconButton onClick={toggleEditorDialog} size="small">
            <IsoIcon color="secondary" />
          </IconButton>
          <IconButton
            disabled={current === base}
            onClick={toggleResetDialog}
            size="small"
          >
            <RefreshIcon color={current === base ? "disabled" : "warning"} />
          </IconButton>
        </div>
      </FlexContainer>
      <FlexContainer>
        <LinearProgress
          variant="determinate"
          value={normalize(current, 0, base)}
          style={{ width: "80%" }}
        />
        <span style={{ fontSize: 12 }}>{base}</span>
      </FlexContainer>

      <Dialog open={openEditorModal}>
        <DialogTitle>Modify {attribute}?</DialogTitle>
        <DialogContent>
          <ValueEditor
            id={`modify${attribute}-editor`}
            defaultValue={0}
          ></ValueEditor>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={toggleEditorDialog} size="small">
            <CancelIcon color="error" />
          </IconButton>
          <IconButton onClick={toggleEditorDialogAccept} size="small">
            <CheckCircleIcon color="success" />
          </IconButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openResetModal}>
        <DialogTitle>Reset {attribute}?</DialogTitle>
        <DialogContent>
          This will reset your <strong>{attribute}</strong> to{" "}
          <strong>{base}</strong>.
        </DialogContent>
        <DialogActions>
          <IconButton onClick={toggleResetDialog} size="small">
            <CancelIcon color="error" />
          </IconButton>
          <IconButton onClick={toggleResetDialogAccept} size="small">
            <CheckCircleIcon color="success" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function EditBaseAttribute(props) {
  const { attribute, defaultValue } = props;

  return (
    <FlexContainer>
      <div style={{ marginRight: 8 }}>Base {attribute}</div>
      <ValueEditor
        id={`base${attribute}-editor`}
        defaultValue={defaultValue}
      ></ValueEditor>
    </FlexContainer>
  );
}
