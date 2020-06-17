import React from 'react';
import { render } from '../../utils/render';
import { makeStyles } from '@material-ui/core/styles';
import Application from '../../components/application';

import theme from '../../utils/theme';

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: 100
  },
}));

const Welcome = (props) => {
  const classes = useStyles();

  return (
    <Application>
      <div className={classes.text}>Hi {props.name}!!</div>
      <div>hello!!!!!</div>
    </Application>
  );
};

export default render('PagesWelcome', Welcome);
