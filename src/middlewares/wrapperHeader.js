import { CALL_API } from 'redux-api-middleware';

export default store => next => action => {
  const ticket = action[CALL_API];
  if (ticket) {
    ticket.headers = Object.assign({
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().session.token}`,
      'Content-Type': 'application/json',
    }, ticket.headers);
  }

  return next(action);
};
