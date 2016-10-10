export const {baseUrl, version} = JSON.parse(document.getElementById('app-config').innerHTML);
import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

const history = useBasename(() => browserHistory)({basename: `/${baseUrl}`});
export {history as myHistory};