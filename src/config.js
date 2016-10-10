export const {baseUrl, version} = JSON.parse(document.getElementById('app-config').innerHTML);
import useBasename from 'history/lib/useBasename';
import {browserHistory} from 'react-router';

export const myHistory = useBasename(() => browserHistory)({ basename: `/${baseUrl}` });