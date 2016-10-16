import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

const initConfig = {
  baseUrl: '/',
  version: '1.0.0',
};

// get config from index.html
function getConfigFromIndexHtml() {
  let c = {};

  if (global.document && document.getElementById('app-config')) {
    c = JSON.parse(document.getElementById('app-config').innerHTML);
  }

  return Object.assign(initConfig, c);
}


export const {baseUrl, version} = getConfigFromIndexHtml();
export const myHistory = useBasename(() => browserHistory)({basename: `/${baseUrl}`});
