import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

export const {baseUrl, version} = JSON.parse(document.getElementById('app-config').innerHTML);

export const myHistory = useBasename(() => browserHistory)({basename: `/${baseUrl}`});
