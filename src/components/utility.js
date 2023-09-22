import styled from "@emotion/styled";

export const SpacingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const saveLocalStorage = (key: string, object: any) => {
  if (typeof object === "string") localStorage.setItem(key, object);
  if (typeof object === "number") localStorage.setItem(key, object.toString());
  if (typeof object === "object")
    localStorage.setItem(key, JSON.stringify(object));
};
