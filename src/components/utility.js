import styled from "@emotion/styled";

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SquishedFlexContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AreaContainer = styled.div`
  margin-bottom: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8px;
  border-radius: 8px;
`;

export const normalize = (value, min, max) => ((value - min) * 100) / (max - min);

export const saveLocalStorage = (key: string, object: any) => {
  if (typeof object === "string") localStorage.setItem(key, object);
  if (typeof object === "number") localStorage.setItem(key, object.toString());
  if (typeof object === "object")
    localStorage.setItem(key, JSON.stringify(object));
};
