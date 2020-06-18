const path = require('path');
const hypernova = require('hypernova/server');

require = require("esm")(module);

require("@babel/register")({
  plugins: ['@babel/plugin-transform-react-jsx']  
});

const devMode = (process.env.NODE_ENV || "development") === "development";
const port = 3030;
const filesPath = path.resolve(path.join('app', 'javascript', 'views'));

const getFiles = () => {
  return hypernova.getFiles(filesPath).reduce((files, file) => {
    const keyParts = file.name.split('/');

    const viewKey = keyParts.map((keyPart, i) => {
      if (i === keyParts.length - 1) {
        keyPart = keyPart.replace(/\.\w+$/, '');
      }
      return keyPart[0].toUpperCase() + keyPart.slice(1).toLowerCase();
    }).join('');
    
    files[viewKey] = file.path;

    return files;
  }, {});
};

const fileCache = devMode ? {} : getFiles();
const getFile = (name) => {
  if (devMode && !fileCache[name]) {
    Object.assign(fileCache, getFiles());
  }
  return fileCache[name];
};

hypernova({
  devMode: devMode,
  port: port,
  getComponent: (name) => {
    const file = getFile(name);
    if (file) {
      const view = require(file);
      return view.default || view;
    }
    return null;
  }
});
