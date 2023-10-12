import { VisualGroupContainer } from "./utility";

export default function SpellProperties(props) {
  const { spell } = props;

  return (
    <div style={{ display: "block" }}>
      <VisualGroupContainer>
        <div>
          <strong>Requirement</strong> {spell.requirement}
        </div>
        <div>
          <strong>Cast Time</strong> {spell.castingTime}
        </div>
        <div>
          <strong>Duration</strong> {spell.duration}
        </div>
        <div>
          <strong>Range</strong> {spell.range}
        </div>
      </VisualGroupContainer>
    </div>
  );
}
