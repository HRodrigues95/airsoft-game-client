import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { green, grey } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as serviceWorker from './serviceWorker';
import { store } from './app/store';
import Routing from './app/routes'

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: grey[600],
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <Routing />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
