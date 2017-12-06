import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import  { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../../actions/auth';

class NewEvent extends Component {

  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      date: ''
    };
  }

  renderField(field) {

    return (
      <div >
        <label>{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
        <div>
          {touched ? error : ''}
        </div>
      </div>
    )
  }



  render() {

    //create handle submit
    const { loading } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
          onChange = {(e) => { this.setState({ email: e.target.value }); }}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
          onChange = {(e) => { this.setState({ password: e.target.value }); }}
        />
        <Field
          label="Date"
          name="date"
          component={this.renderField}
          onChange = {(e) => { this.setState({ password: e.target.value }); }}
        />
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
        {
          loading && <div>Loading...</div>
        }
      </form>
    );
  }
}

onSubmit(e){
  e.preventDefault();
  const { title, description, date } = this.state;
  this.createEvent(title, description, date);
}

async createEvent(title, description, date){
  try{
    this.props.actions.createEventRequest();
    const user = await axios.post('/api/events', {
      title,
      description,
      date,
    });
    this.props.actions.createEventSuccess();
  } catch(error){
    this.props.actions.createEventFailure(error);
  }
}

validate(values) {

  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.email = "Enter a Title";
  }
  if (!values.description) {
    errors.password = "Enter a breif description!";
  }
  if (!values.date) {
    errors.password = "Enter a date!";
  }


  // If errors is empty the form is fine to submit
  //if erros has any properties redux form assums form is invalid
  return errors;
}



// export default reduxForm({
//   validate,
//   form: 'PostsNewForm'
// })(
//   connect(null,{ createPost })(PostsNew)
// );

const mapStateToProps = (state) => {
  return {
    ...state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
