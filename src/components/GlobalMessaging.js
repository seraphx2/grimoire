import { useContext } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { ApplicationContext } from "../ApplicationContext";
import { DarkTheme } from "./utility";

export default function GlobalMessaging() {
  const { version, acknowledgedVersion, saveAcknowledgedVersion } =
    useContext(ApplicationContext);

  return (
    <DarkTheme>
      <Dialog open={version !== acknowledgedVersion}>
        <DialogTitle>BREAKING CHANGE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The way spells are assigned their preparedness status has been
            changed and so all spells have been reset to{" "}
            <strong>UNPREPARED</strong>. There is now a dropdown menu that lets
            you assign <strong>Unprepared</strong>, <strong>Prepared</strong>,
            or <strong>Magic Item</strong>. This is so you can differentiate the
            source of a spell whether from your Grimoire or a Magic Item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => saveAcknowledgedVersion()} size="small">
            <CheckCircleIcon color="success" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </DarkTheme>
  );
}
