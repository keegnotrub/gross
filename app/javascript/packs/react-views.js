const context = require.context('../views', true, /\.js$/);
const views = {};

context.keys().forEach((key) => {
  const keyParts = key.split('/').splice(1);

  const view = context(key);
  const viewKey = keyParts.map((keyPart, i) => {
    if (i === keyParts.length - 1) {
      keyPart = keyPart.replace(/\.\w+$/, '');
    }
    return keyPart[0].toUpperCase() + keyPart.slice(1).toLowerCase();
  }).join('');
  
  views[viewKey] = view.default || view;
});

module.exports = views;
