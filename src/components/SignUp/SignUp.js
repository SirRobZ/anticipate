import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../actions/auth';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      email: '',
      password: ''
    };
  }

  renderField(field) {
    const { registering, registerError } = this.props;
    return (
      <div >
        <label>{field.label}</label>
        <input type="text" {...field.input}/>
        <div>
          {registerError
            ? String(registerError)
            : ''}
        </div>
      </div>
    )
  }

  render() {

    //create handle submit
    const {handleSubmit, loading} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Full Name" name="fullName" component={this.renderField} onChange= {(e) => { this.setState({ fullName: e.target.value }); }}/>
        <Field label="Email" name="email" component={this.renderField} onChange= {(e) => { this.setState({ email: e.target.value }); }}/>
        <Field label="Password" name="password" component={this.renderField} onChange= {(e) => { this.setState({ password: e.target.value }); }}/>
        <Field label="Confirm Password" name="confirmPassword" component={this.renderField} onChange= {(e) => { this.setState({ password: e.target.value }); }}/>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
        {loading && <div>Loading...</div>
}
      </form>
    );
  }

  onSubmit(e) {
    e.preventDefault();
    const {fullName, email, password} = this.state;
    this.signup(fullName, email, password);
  }

  async signup(fullName, email, password) {
    try {
      this.props.actions.signupRequest();
      const user = await axios.post('localhost:8080/api/users', {fullName, email, password});
      this.props.actions.signupSuccess();
      this.props.actions.saveAuthState(user);
    } catch (error) {
      this.props.actions.signupFailure(error);
    }
  }

  validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.fullName) {
      errors.email = "Enter your Name!";
    }
    if (!values.email) {
      errors.email = "Enter an Email";
    }
    if (!values.password) {
      errors.password = "Enter a password!";
    }
    if (!values.confirmPassword) {
      errors.password = "Passwords must match exactly!";
    }

    // If errors is empty the form is fine to submit
    //if erros has any properties redux form assums form is invalid
    return errors;
  }
}

export default reduxForm({
  validate: null,
  form: 'PostsNewForm'
})(SignUp);

// const mapStateToProps = (state) => {
//   return {
//     ...state.auth
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch,
//     actions: bindActionCreators(actionCreators, dispatch)
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
