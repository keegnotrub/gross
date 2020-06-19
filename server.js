const path = require('path');
const hypernova = require('hypernova/server');

require = require("esm")(module);

require("@babel/register")({
  plugins: ['@babel/plugin-transform-react-jsx']  
});

const devMode = (process.env.NODE_ENV || "development") === "development";
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
  getCPUs: 1,
  host: '127.0.0.1',
  port: 3030,
  getComponent: (name) => {
    console.log(`got ${name}`);
    
    const file = getFile(name);
    if (file) {
      console.log(`found ${name}`);

      const view = require(file);

      console.log(`required ${view}`);
      
      return view.default || view;
    }
    return null;
  }
});
