import { useEffect, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AppBarNetwork } from "../components/Footer";
import Footer from "../components/Footer";

import { NotificationProvider } from "../context/NotificationContext";
import { JobProvider } from "../context/JobContext";
import Notifications from "../componretnts/Notifications";
import AppRoutes from "../components/AppRoutes";

const App = () => {
    const nessieTheme = localStorage.getItem('nessie_theme') || "standard"
    const [size, setSize] = useState(nessieTheme)
    useEffect(() => {
        if(size){
            localStorage.setItem('nessie_theme', size)
        }
    }, [size])

  const lightTheme = (prefersDarkMode, layout) => {
    return {
      components: {
        MuiInputLabel: {...
          styleOverrides: {
            root: {
              "&.Mui-focused": {
                color: prefersDarkMode ? "#fff" : "inherit",
              }
            }
          },
        },
        MuiTextField: {
            styleOverrides: {
                root: layout === 'compact' ? {
                    '& .MuiInputBase-input': {
                        padding: '5px'
                    },
                    "& .MuiInputBase-root": {
                        // Targets the input base
                        fontSize: "14px",
                    },
                    "& .MuiInputLabel-outlined": {
                        transform: "translate(6px, 6px) scale(1)",
                    },
                    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        transform: "translate(12px, -12px) scale(0.75)",
                    },

                }, {}
            }
        },
        MuiSelect: {
            styleOverrides: layout === 'compact' ? {
                select: {
                    padding: '5px',
                    fontSize: '14px',
                    maxHeight: "1.4375em",
                    "& .MuiInputLabel-outlined": {
                        tramsform: "translate(6px, 6px) scale(1)", //Adjust label position when not focused
                    },
                    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        transform: "translate(12px, -14px) scale(0.75)", //Adjust label position when focused
                    },
                }
            }: {},
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: layout === 'compact' ? {
                    '& .MuiAccordionSummary-content': {
                        //maxHeight: '44px',
                        padding: '1px',
                        margin: '8px 0 0 0'
                    }
                }: {}
            }
        },
        MuiAccordionDetails:{
            styleOverrides: {
                root: layout === 'compact' ? {
                    padding: '8px !important',
                }: {},

            }
        },
        MuiStack; {
            styleOverrides: {
                root: layout === 'compact' ? {
                    paddingTop: '0 !important',
                    //marginTop: '5px !important"
                }: {}
            }
        },
        MuiCheckbox: {
        styleOverrides: {
          root: {
            "&.Mui-checked": {
              color: prefersDarkMode ? '#fff' : 'inherit',
            },
          },
        },
      },
    },

    palette: {
      mode: prefersDarkMode ? "dark" : "light",
      primary: {
        main: "#9191919",
        contrastText: "#fff",
      },
      secondary: {
        main: "#e20074",
        contrastText: "#fff",
      },
      neutral: {
        main: "#EBEAEA",
        darker: "#D8D8D8",
        contrastText: "#191919",
      },
     },
     typography: {
      fontFamily:`BlinkMacSystemFont, "-apple-system", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans, Droid Sans, "Helvetica Neue", sans-serif`,
     },
    };
  };

  const getThemeControls = (layoutSize) => {
    return {
        MuiButton: {
            defaultProps: {
                size: layoutSize === 'compact' ? 'small' : 'medium'
            }
        },
        MuiFormControl: {
            defaultProps: {
                size: layoutSize === 'compact' ? 'small' : 'medium'
            }
        }
    }
  }

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () => {
        const themeControls = getThemeControls(size)
        let themeObj = lightTheme(prefersDarkMode, size)
        themeObj = { ...themeObj, components: { ...themeObj.components, ...themeControls}}
        return createTheme(themeObj)
    },
    [prefersDarkMode, size]
  );


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NotificationProvider>
        <JobProvider>
          <AppBarNetwork setLayout={setSize} />
          <AppRoutes/>
          <Footer/>
          <Notifications/>
        </JobProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
