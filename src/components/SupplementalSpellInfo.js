import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SupplementalSpellInfo(props) {
  const { spellName } = props;
  const spellsWithSupplementalInfo = [];

  if (!spellsWithSupplementalInfo.includes(spellName)) return null;

  return (
    <Accordion style={{backgroundColor: "transparent"}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <strong>Supplemental</strong>
      </AccordionSummary>
      <AccordionDetails>
        <Content spellName={spellName}></Content>
      </AccordionDetails>
    </Accordion>
  );
}

function Content(props) {
  const { spellName } = props;

  switch (spellName) {
    case "Dispel":
      return <Dispel></Dispel>
    default:
      return null;
  }
}

function Dispel() {
  return <span>This is some extra details about the Dispel spell.</span>;
}
