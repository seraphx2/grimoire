import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

export const FlexContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const SquishedFlexContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const AreaContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
`;

export const normalize = (value, min, max) =>
  ((value - min) * 100) / (max - min);

export const saveLocalStorage = (key: string, object: any) => {
  if (typeof object === "string") localStorage.setItem(key, object);
  if (typeof object === "number") localStorage.setItem(key, object.toString());
  if (typeof object === "object")
    localStorage.setItem(key, JSON.stringify(object));
};

export const DarkTheme = (props) => {
  const { children } = props;

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "dark",
        },
      })}
    >
      {children}
    </ThemeProvider>
  );
};
