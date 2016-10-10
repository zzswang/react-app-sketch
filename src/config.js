import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

const history = useBasename(() => browserHistory)({basename: `/${baseUrl}`});

export const {baseUrl, version} = JSON.parse(document.getElementById('app-config').innerHTML);
export {history as myHistory};