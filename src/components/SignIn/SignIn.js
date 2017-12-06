import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../actions/auth';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  renderField(fieldName) {
    const { loginError } = this.props;
    return (
      <div >
        <label>{fieldName}</label>
        <input type="text"
          onChange= {(e) => { this.setState({ [fieldName]: e.target.value }); }}
        />
        <div>
          {loginError ? String(loginError) : ''}
        </div>
      </div>
    )
  }

  render() {

    //create handle submit
    const {loading} = this.props;

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div >
          <label>Email:</label>
          <input type="text"
            onChange= {(e) => { this.setState({ email: e.target.value }); }}
          />
        </div>
        <div >
          <label>Password:</label>
          <input type="password"
            onChange= {(e) => { this.setState({ password: e.target.value }); }}
          />
        </div>
        <div>
          {/* {loginError ? String(loginError) : ''} */}
        </div>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
        {loading && <div>Loading...</div>}
      </form>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const {email, password} = this.state;
    this.login(email, password);
  }

  async login(email, password) {
    try {
      this.props.actions.loginRequest();
      const user = await axios.post('http://localhost:8080/api/users/login', {email, password});
      this.props.actions.loginSuccess();
      this.props.actions.saveAuthState(user);
    } catch (error) {
      this.props.actions.loginFailure(error);
    }
  }

  validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.email) {
      errors.email = "Enter an Email";
    }
    if (!values.password) {
      errors.password = "Enter your password!";
    }

    // If errors is empty the form is fine to submit
    //if erros has any properties redux form assums form is invalid
    return errors;
  }
}



const mapStateToProps = (state) => {
  return {
    ...state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
