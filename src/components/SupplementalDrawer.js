import { IconButton, Drawer, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import SupplementalInfo from "./SupplementalInfo";
import { DarkTheme, FlexContainer } from "./utility";

export default function SupplementalDrawer(props) {
  const { open, set } = props;

  return (
    <DarkTheme>
      <Drawer
        anchor="right"
        BackdropProps={{
          onClick: () => {
            open(false);
          },
        }}
        open={open}
        style={{ fontSize: "0.9rem" }}
      >
        <FlexContainer>
          <Typography variant="h5" style={{ padding: 8 }}>
            Supplemental Info
          </Typography>
          <IconButton
            onClick={() => set(false)}
            size="small"
            style={{ marginRight: 10 }}
          >
            <CloseIcon />
          </IconButton>
        </FlexContainer>
        <Divider />
        <SupplementalInfo />
      </Drawer>
    </DarkTheme>
  );
}
