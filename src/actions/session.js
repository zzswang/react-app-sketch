import {browserHistory} from 'react-router';
import {CALL_API} from 'redux-api-middleware';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, GET_RESOURCES_REQUEST, GET_RESOURCES_SUCCESS, GET_RESOURCES_FAIL} from '../constants';
import myHistory from '../config';

export function restoreSessionFromLocalStorage() {
  return {
    type: LOGIN_SUCCESS,
    payload: JSON.parse(localStorage.getItem('session')),
  };
}

export function login(data) {
  return async(dispatch, getState) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/api/sessions',
        method: 'POST',
        body: JSON.stringify(data),
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
      },
    });

    if (action.type === LOGIN_SUCCESS) {
      localStorage.setItem('session', JSON.stringify(action.payload));
      browserHistory.push(data.next || '/');
    }

    return action;
  };
}

export function logout() {
  localStorage.removeItem('session');
  myHistory.push('/login');
  return {
    type: LOGOUT,
  };
}

export function requestProtectedResources() {
  return {
    [CALL_API]: {
      endpoint: '/api/protected/resources',
      method: 'get',
      types: [GET_RESOURCES_REQUEST, GET_RESOURCES_SUCCESS, GET_RESOURCES_FAIL],
    },
  };
}