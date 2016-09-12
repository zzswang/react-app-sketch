import React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import * as sessionActions from '../actions/session';

const mapStateToProps = state => state.session;
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...sessionActions }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends React.Component {
  login(e) {
    e.preventDefault();
    const data = serialize(this.loginForm, { hash: true });
    data.next = this.props.location.query.next ? this.props.location.query.next : '/';
    this.props.actions.login(data);
  }

  render() {
    return (
      <div className="center-block w-xxl w-auto-xs p-y-md">
        <div className="navbar">
          <div className="pull-center">
            <a className="navbar-brand">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                <path d="M 4 4 L 44 4 L 44 44 Z" fill="#F5F5F5" />
                <path d="M 4 4 L 34 4 L 24 24 Z" fill="rgba(0,0,0,0.15)" />
                <path d="M 4 4 L 24 4 L 4  44 Z" fill="#fcc100" />
              </svg>
              <span className="hidden-folded inline">Your App</span>
            </a>
          </div>
        </div>
        <div className="p-a-md box-color r box-shadow-z1 text-color m-a">
          <div className="m-b text-sm">
            {this.props.error ? this.props.error.message : 'Sign in with your Account'}
          </div>
          <form role="form" ref={loginForm => { this.loginForm = loginForm; }}>
            <div className="md-form-group float-label">
              <input type="email" className="md-input" name="email" required="" placeholder="admin@36node.com" />
              <label htmlFor="email">邮箱</label>
            </div>
            <div className="md-form-group float-label">
              <input type="password" className="md-input" name="password" required="" />
              <label htmlFor="password">密码</label>
            </div>
            <button type="submit" className="btn primary btn-block p-x-md" onClick={::this.login}>登录</button>
          </form>
        </div>
      </div>
    );
  }
}
