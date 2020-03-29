import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as sessionActions from '../../actions/sessionActions';
import Input from '../input/Input';
import apiConfig from '../../common/apiConfigs';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { //state la object co the chua nhieu cap key, value
      user: {
        email: 'vinhvd@miagi-so.com',
        password: ''      
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getAccounts = async() => {
    const response = await fetch(apiConfig.base_url + 'auth/login');
    const json = await response.json();
    var accounts = [];
    for (var i = 0; i < json.data.length; i++) {
      accounts.push({
        "id": json.data[i].id, 
        "last_name": json.data[i].last_name
      });
    }
    return accounts;
  }

  onSubmit(history) {
    const { user } = this.state;

    const { login } = this.props.actions;

    login(user).then(() => history.push('/')).catch(err => alert(err)); //then-resolve, catch-reject
  }

  onChange(e) {
    const { value, name } = e.target;
    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  render() {
    const { user: { email, password } } = this.state;
    const SubmitButton = withRouter(({ history }) => (
      <button
        onClick={() => this.onSubmit(history)}
        type="submit">Submit
      </button>
    ));

    return (
      <div>
        <h3>LOGIN</h3>
        <Input
          name="email"
          value={email}
          label="Email"
          type="email"
          onChange={this.onChange}
        />
        <Input
          name="password"
          value={password}
          label="Password"
          type="password"
          onChange={this.onChange}
        />
        <SubmitButton />
      </div>
    );
  }
}

const { object } = PropTypes;

Login.propTypes = {
  actions: object.isRequired
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
};

export default connect(null, mapDispatch)(Login);
