import styled from "@emotion/styled";
import { IconButton, TextField } from "@mui/material";
import IsoIcon from "@mui/icons-material/Iso";
import RefreshIcon from "@mui/icons-material/Refresh";
import { SpacingContainer, saveLocalStorage } from "./utility";

export default function WillpowerTracker(props) {
  const { baseWillpower, currentWillpower, inEditMode, setCurrentWillpower } =
    props;

  const Container = styled.div`
    margin-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 8px;
    border-radius: 8px;
  `;

  return (
    <Container>
      {inEditMode && (
        <EditBaseWillpower baseWillpower={baseWillpower}></EditBaseWillpower>
      )}
      {!inEditMode && (
        <WillpowerManager
          baseWillpower={baseWillpower}
          currentWillpower={currentWillpower}
          setCurrentWillpower={setCurrentWillpower}
        ></WillpowerManager>
      )}
    </Container>
  );
}

function WillpowerManager(props) {
  const { baseWillpower, currentWillpower, setCurrentWillpower } = props;

  function resetCurrentWillpower() {
    setCurrentWillpower(baseWillpower);
    saveLocalStorage("currentWillpower", baseWillpower);
  }

  return (
    <SpacingContainer>
      <div>Willpower: {currentWillpower}</div>
      <div>
        {/* <IconButton size="small">
          <UndoIcon color="primary" />
        </IconButton> */}
        <IconButton size="small">
          <IsoIcon color="secondary" />
        </IconButton>
        <IconButton onClick={resetCurrentWillpower} size="small">
          <RefreshIcon color="warning" />
        </IconButton>
      </div>
    </SpacingContainer>
  );
}

function EditBaseWillpower(props) {
  const { baseWillpower } = props;

  return (
    <SpacingContainer>
      <div>Base Willpower</div>
      <div>
        <TextField
          id="baseWillpower"
          defaultValue={baseWillpower}
          size="small"
          style={{ marginLeft: 8, textAlign: "center", width: 48 }}
          type="number"
        ></TextField>
      </div>
    </SpacingContainer>
  );
}
