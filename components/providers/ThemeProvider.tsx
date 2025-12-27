'use client';

import { 
  createTheme,
  ThemeProvider as MUIProvider,
  CssBaseline
} from "@mui/material";

const muiTheme = createTheme({
  typography: {
    fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MUIProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MUIProvider>
  );
};
