import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../utils/theme';

const Application = (props) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { props.children }
    </ThemeProvider>
  );
};

export default Application;
