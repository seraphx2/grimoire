
import { useContext } from "react";

import { ApplicationContext } from "../ApplicationContext";
import School from "./School";

export default function Grimoire(props) {
  const { spells } = useContext(ApplicationContext);

  return (
    <div>
      {spells.map((x, i) => (
        <School key={`${i}-${x.school}`} school={x}></School>
      ))}
    </div>
  );
}
