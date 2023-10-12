import { FlexContainer, VisualGroupContainer } from "./utility";

export default function SpellProperties(props) {
  const { spell } = props;

  return (
    <div style={{ display: "block" }}>
      <VisualGroupContainer>
        <FlexContainer>
          <div><strong>Cast Time</strong> {spell.castingTime}</div>
          <div><strong>Duration</strong> {spell.duration}</div>
        </FlexContainer>
        <FlexContainer>
          <div><strong>Range</strong> {spell.range}</div>
          <div><strong>Requirement</strong> {spell.requirement}</div>
        </FlexContainer>
        
      </VisualGroupContainer>
    </div>
  );
}
