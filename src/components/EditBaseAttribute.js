import ValueEditor from "./ValueEditor";
import { FlexContainer } from "./utility";

export default function EditBaseAttribute(props) {
  const { attribute, defaultValue, min } = props;

  return (
    <FlexContainer>
      <div style={{ marginRight: 8 }}>
        <strong>Total {attribute}</strong>
      </div>
      <ValueEditor
        defaultValue={defaultValue}
        id={`base${attribute}-editor`}
        min={min}
      ></ValueEditor>
    </FlexContainer>
  );
}
