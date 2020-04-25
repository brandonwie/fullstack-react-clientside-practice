import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

export default class UserSignUp extends Component {
  state = {
    name: "",
    username: "",
    password: "",
    errors: [],
  };

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={this.change}
                  placeholder="Name"
                />
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={this.change}
                  placeholder="User Name"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account?{" "}
            <Link to="/signin">Click here</Link>{" "}
            to sign in!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const {
      name,
      username,
      password,
    } = this.state;

    // New user payload
    const user = {
      name,
      username,
      password,
    };
    //! createUser() from Data.js => Context.js => pass via this.props.context
    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          context.actions
            .signIn(username, password)
            .then(() => {
              this.props.history.push(
                "/authenticated"
              );
            });
          console.log(
            `${username} is successfully signed up and authenticated!`
          );
        }
      })
      //* A catch() method chained to the promise sequence handles a rejected promise returned by createUser(). For example, if there's an issue with the /users endpoint, the API is down, or there's a network connectivity issue, the function passed to catch() will get called.
      .catch((err) => {
        // handle rejected promises
        console.log(err);
        // push to history stack
        //* a component rendered by <Route> gets passed a history object (via props) that listens for changes to the current URL, keeps track of browser history and the number of entries in the history stack. The history object can also be used to programmatically change the current URL.
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}
