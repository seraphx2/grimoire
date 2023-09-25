import spellsv12 from "../data/spells-v1.2.json";
import School from "./School";

export default function Grimoire(props) {
  return (
    <div>
      {spellsv12.map((x, i) => (
        <School key={`${i}-${x.name}`} school={x}></School>
      ))}
    </div>
  );
}
