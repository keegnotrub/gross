const path = require('path');
const hypernova = require('hypernova/server');

require = require("esm")(module);

require("@babel/register")({
  plugins: ['@babel/plugin-transform-react-jsx']  
});

const devMode = (process.env.NODE_ENV || "development") === "development";
const port = process.env.PORT || 3030;
const viewsPath = path.resolve(path.join('app', 'javascript', 'views'));

const views = hypernova.getFiles(viewsPath).reduce((v, f) => {
  const keyParts = f.name.split('/');

  const viewKey = keyParts.map((keyPart, i) => {
    if (i === keyParts.length - 1) {
      keyPart = keyPart.replace(/\.\w+$/, '');
    }
    return keyPart[0].toUpperCase() + keyPart.slice(1).toLowerCase();
  }).join('');
  
  v[viewKey] = f.path;

  return v;
}, {});

hypernova({
  devMode: devMode,
  port: port,
  getComponent: (name) => {
    const viewFile = views[key];
    if (viewFile) {
      const view = require(viewFile);
      return view.default || view;
    }
    return null;
  }
});


