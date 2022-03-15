import { Component, useState } from "react";
import { Link, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addToken, addUser } from "../../Redux/actionCreators";
import { baseUrl } from "../Shared/baseUrl";
import axios from "axios";
import resized from "../Shared/images/resized.jpg";
import { Card, CardTitle, Breadcrumb, BreadcrumbItem, Row } from "reactstrap";
import { Control, Form, Errors, actions } from "react-redux-form";


const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(addToken()),
  addUser: () => dispatch(addUser()),
});

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
function CheckPassword(inputtxt)
{
var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
if(inputtxt.value.match(passw))
{
alert('Correct, try another...')
return true;
}
else
{
alert('Wrong...!')
return false;
}
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLogin = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    const userWithToken = await axios
      .post(baseUrl + "/login", data)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("password or username incorrect");
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });

    await this.props.dispatch(addToken(userWithToken.data.token));
    await this.props.dispatch(addUser(userWithToken.data.user));
    console.log(userWithToken.data.token);
    /*axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userWithToken.data.token}`;
    axios.get(baseUrl + "/favorites").then((response) => {
      console.log(response);
    });*/
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div
        className="row row-content justify-content-center"
        style={{ backgroundImage: "url(" + resized + ")" }}
      >
        <div className="col-12 col-md-2 ">
          <h1 className="text-center" style={{ color: "#85db15", fontSize:72 }}>
            Delish
          </h1>
          <label class="sr-only">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            class="form-control"
            placeholder="Username"
            v-model="user.username"
            onChange={this.handleInputChange}
            required
          />
          <div>&nbsp;</div>
          <label class="sr-only">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Password"
            v-model="user.password"
            onChange={this.handleInputChange}
            required
          />

          <Link
            className="offset-4"
            to="/register"
            style={{ fontWeight: "bolder", fontSize:20}}
          >
            Need an account?
          </Link>
          <div>&nbsp;</div>
          <button
            className="col-md- offset-md-3"
            type="submit"
            style={{ backgroundColor: "#85db15" }}
            onClick={this.handleLogin}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapDispatchToProps)(Login));


