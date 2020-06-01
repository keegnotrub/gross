import React from 'react';
import { render } from '../../utils/render';
import { makeStyles } from '@material-ui/core/styles';
import Application from '../../components/application';

import theme from '../../utils/theme';

const useStyles = makeStyles((theme) => ({
}));

const About = (props) => {
  const classes = useStyles();

  return (
    <Application>
      <div>About</div>
    </Application>
  );
};

export default render('PagesAbout', About);
