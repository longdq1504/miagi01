// This component handles the App template used on every page.
import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../home/Home';
import Login from '../login/Login';
import PrivateRoute from '../privateRoute/PrivateRoute';

const App = ({ authenticated, checked }) => ( //, ngay khi khoi tao nhu nay, prop = { authenticated, checked }, va gan state = prop
  <Router>
    { checked &&
      <div>
        <PrivateRoute exact path="/" component={Home} authenticated={authenticated}/> 
        <PrivateRoute exact path="/aaa" component={Home} authenticated={authenticated}/> 
        <Route path="/login" component={Login}/>
      </div>
    }
  </Router>
);
//check storageSession

const { bool } = PropTypes; //bool = PropTypes.bool;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

// mapState la 1 function nhan bien dau vao la state cua cha, va tra ve gia tri la state cua con.
// lambda trong ES6, trong truong hop nay con la App, cha la cha, 
const mapState = (state) => ({ //khai bao state cua component App, state la state cua cha. Khi doi state cua cha(index.js) thi render lai het thang con(App.js)
  // nho co mapState nen thay 
  checked: state.session.checked, 
  authenticated: state.session.authenticated
});
//state con {checked: state.session.checked, authenticated: state.session.authenticated}

/*
const mapState = ({session}) => ({ //khai bao state cua component App, state la state cua cha, //khai bao {session}, object-key
  checked: session.checked, 
  authenticated: session.authenticated
});
*/

export default connect(mapState)(App);
