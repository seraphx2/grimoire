import { useContext, useState } from "react";
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
import IsoIcon from "@mui/icons-material/Iso";
import RefreshIcon from "@mui/icons-material/Refresh";
import UndoIcon from "@mui/icons-material/Undo";
import Sizzle from "sizzle";

import { ApplicationContext } from "../ApplicationContext";
import ValueEditor from "./ValueEditor";
import { AreaContainer, DarkTheme, FlexContainer, normalize } from "./utility";

export default function WillpowerTracker() {
  const {
    baseWP,
    currentWP,
    baseHP,
    currentHP,
    inEditMode,
    undoAction,
    saveCharacter,
  } = useContext(ApplicationContext);
  const [openUndoDialog, setOpenUndoDialog] = useState(false);
  const isUndoDisabled = undoAction === null;

  function toggleUndoDialog() {
    setOpenUndoDialog(!openUndoDialog);
  }

  function toggleUndoDialogAccept() {
    saveCharacter([
      { name: "currentHP", value: currentHP + undoAction.hpSpent },
      { name: "currentWP", value: currentWP + undoAction.wpSpent },
      { name: "undoAction", value: null },
    ]);
    toggleUndoDialog();
  }

  return (
    <div>
      {!inEditMode && (
        <FlexContainer>
          <AreaContainer>
            <AttributeManager
              attribute="WP"
              base={baseWP}
              current={currentWP}
              saveCharacter={saveCharacter}
            ></AttributeManager>
          </AreaContainer>
          <AreaContainer>
            <AttributeManager
              attribute="HP"
              base={baseHP}
              current={currentHP}
              saveCharacter={saveCharacter}
            ></AttributeManager>
          </AreaContainer>
          <AreaContainer>
            <IconButton
              disabled={isUndoDisabled}
              onClick={() => setOpenUndoDialog(true)}
              size="small"
            >
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

      <DarkTheme>
        <Dialog open={openUndoDialog}>
          <DialogTitle>Undo Action?</DialogTitle>
          <DialogContent>
            <div>
              Do you wish to undo{" "}
              {undoAction?.isAbility ? "activating" : "casting"}{" "}
              <strong>{undoAction?.actionName}</strong>?
            </div>
            <div>
              You will regain {undoAction?.wpSpent} WP
              {undoAction?.hpSpent > 0 && (
                <span> and {undoAction?.hpSpent} HP</span>
              )}
              .
            </div>
          </DialogContent>
          <DialogActions>
            <IconButton onClick={toggleUndoDialog} size="small">
              <CancelIcon color="error" />
            </IconButton>
            <IconButton onClick={toggleUndoDialogAccept} size="small">
              <CheckCircleIcon color="success" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </DarkTheme>
    </div>
  );
}

function AttributeManager(props) {
  const { attribute, base, current, saveCharacter } = props;
  const [openEditorModal, setOpenEditorModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  function toggleEditorDialog() {
    setOpenEditorModal(!openEditorModal);
  }

  function toggleEditorDialogAccept() {
    const newCurrent =
      current + parseInt(Sizzle(`#modify${attribute}-editor`)[0].textContent);
    saveCharacter({ name: `current${attribute}`, value: newCurrent });
    toggleEditorDialog();
  }

  function toggleResetDialog() {
    setOpenResetModal(!openResetModal);
  }

  function toggleResetDialogAccept() {
    saveCharacter({ name: `current${attribute}`, value: base });
    toggleResetDialog();
  }

  return (
    <div>
      <FlexContainer>
        <div style={{ marginRight: 16 }}>
          <strong>{attribute}</strong> {current}
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
          style={{ width: "80%" }}
          value={normalize(current, 0, base)}
          variant="determinate"
        />
        <span style={{ fontSize: 12 }}>{base}</span>
      </FlexContainer>

      <DarkTheme>
        <Dialog open={openEditorModal}>
          <DialogTitle>Modify {attribute}?</DialogTitle>
          <DialogContent>
            <ValueEditor
              defaultValue={0}
              id={`modify${attribute}-editor`}
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
      </DarkTheme>

      <DarkTheme>
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
      </DarkTheme>
    </div>
  );
}

function EditBaseAttribute(props) {
  const { attribute, defaultValue } = props;

  return (
    <FlexContainer>
      <div style={{ marginRight: 8 }}>Base {attribute}</div>
      <ValueEditor
        defaultValue={defaultValue}
        id={`base${attribute}-editor`}
        min={0}
      ></ValueEditor>
    </FlexContainer>
  );
}
