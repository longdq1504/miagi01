import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../../actions/sessionActions';
import { bindActionCreators } from 'redux';


class LogoutButton extends Component {
  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const SubmitButton = withRouter(({ history }) => (
      <button
        onClick={() => this.onLogout(history)}
        type="submit">Logout
      </button>
    ));
    return (
      <SubmitButton />
    )
  }

  onLogout = (history) => {
    const { logout } = this.props.actions;
    logout().then(() => history.push('/login')).catch(err => alert(err));
    ;
  }


}

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(withRouter(LogoutButton));
