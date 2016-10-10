import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

export const {baseUrl, version} = JSON.parse(document.getElementById('app-config').innerHTML);

const history = useBasename(() => browserHistory)({basename: `/${baseUrl}`});
export {history as myHistory};