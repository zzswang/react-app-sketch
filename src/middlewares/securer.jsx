import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default function securer(Component) {
  function jumpToLoginPage(redirect) {
    browserHistory.push(`/login?next=${redirect}`);
  }

  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.auth);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps.auth);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        jumpToLoginPage(this.props.location.pathname);
      }
    }

    render() {
      return this.props.auth === true ? <Component {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => state.session;

  return connect(mapStateToProps)(AuthenticatedComponent);
}
