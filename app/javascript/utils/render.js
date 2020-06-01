import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import hypernova, { serialize, load } from 'hypernova';
import { ServerStyleSheets } from '@material-ui/core/styles';

export const render = (name, component) => hypernova({
  server() {
    return (props) => {
      const sheets = new ServerStyleSheets();

      const html = ReactDOMServer.renderToString(
        sheets.collect(React.createElement(component, props))
      );

      const css = ReactDOMServer.renderToString(sheets.getStyleElement());
      const markup = serialize(name, html, props);
      
      return `${css}\n${markup}`;
    };
  },

  client() {
    const payloads = load(name);

    if (payloads) {
      payloads.forEach((payload) => {
        const { node, data } = payload;
        const element = React.createElement(component, data);

        if (ReactDOM.hydrate) {
          ReactDOM.hydrate(element, node);
        } else {
          ReactDOM.render(element, node);
        }
      });
    }

    return component;
  },
});
