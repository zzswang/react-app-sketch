import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import securer from '../middlewares/securer';
import * as sessionActions from '../actions/session';

const mapStateToProps = state => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...sessionActions}, dispatch),
});

@securer
@connect(mapStateToProps, mapDispatchToProps)
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  logout(e) {
    e.preventDefault();
    this.props.actions.logout();
  }

  render() {
    return (
      <section>
        {/* main content */}
        <div id="content" role="main" style={{padding: '0 15px'}}>

          {/* head of main content */}
          <div style={{padding: '15px', overflow: 'hidden'}}>
            <a className="pull-right" role="button" onClick={this.logout.bind(this)}>退出</a>
          </div>

          {/* main content body */}
          <div className="app-body">
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
};
