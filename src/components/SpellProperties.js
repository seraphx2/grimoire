import { FlexContainer, VisualGroupContainer } from "./utility";

export default function SpellProperties(props) {
  const { spell } = props;

  return (
    <VisualGroupContainer>
      <FlexContainer>
        <div>{spell.castingTime}</div>
        <div>{spell.duration}</div>
        <div>{spell.range}</div>
      </FlexContainer>
      <div>{spell.requirement}</div>
    </VisualGroupContainer>
  );
}
