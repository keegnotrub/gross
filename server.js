const hypernova = require('hypernova/server');

const devMode = (process.env.NODE_ENV || "development") === "development";
const port = process.env.PORT || 3030;

hypernova({
  devMode: devMode,
  port: port,
  getComponent: (name, context) => {
    if (devMode) {
      delete require.cache[require.resolve("./public/packs/react-views-ssr.js")]
    }    
    let componentMap = require("./public/packs/react-views-ssr.js");

    console.log(componentMap);
    
    if (componentMap[name]) {
      return componentMap[name];
    }
    return null;
  }
});
