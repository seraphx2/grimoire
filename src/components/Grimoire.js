import spellsv12 from "../data/spells-v1.2.json";
import School from "./School";

export default function Grimoire(props) {
  const { currentWillpower, setCurrentWillpower, inEditMode, spellList } =
    props;

  return (
    <div>
      {spellsv12.map((school, i) => (
        <School
          key={school.name}
          currentWillpower={currentWillpower}
          setCurrentWillpower={setCurrentWillpower}
          inEditMode={inEditMode}
          school={school}
          spellList={spellList}
        ></School>
      ))}
    </div>
  );
}
