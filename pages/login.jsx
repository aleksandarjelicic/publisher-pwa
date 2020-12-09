import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getMenus } from "../services/menuService";
import Store from "../components/Store";
import BaseLayout from "../components/layout/BaseLayout";

const publisher_api_url = process.env.NEXT_PUBLIC_PUBLISHER_API_URL;

class Login extends React.Component {
  static contextType = Store;

  state = {
    busy: false,
    auth: { username: "", password: "" },
    register: { email: "", username: "", password: "", passwordCheck: "" },
    thankYouPage: false,
  };

  handleAuthChange = (e) => {
    let { name, value } = e.target;
    let auth = this.state.auth;

    if (name === "username") {
      value = value.replace(/[^\w\s.]/gi, "").toLowerCase();
    }

    auth[name] = value;

    this.setState({ auth });
  };

  login = (e) => {
    e.preventDefault();
    this.setState({ busy: true });

    axios
      .post(publisher_api_url + "/auth/", this.state.auth)
      .then((response) => {
        toast.success("Successfully logged in");
        this.context.actions.setUser(response.data.user);
        this.context.actions.setToken(response.data.token.api_key);
        sessionStorage.setItem("user", response.data.user);
        sessionStorage.setItem("token", response.data.token.api_key);
        this.setState({ busy: false });
      })
      .catch((error) => {
        toast.error("Wrong username or password.");
        this.setState({ busy: false });
      });
  };

  handleRegisterChange = (e) => {
    let { name, value } = e.target;
    let register = this.state.register;

    if (name === "username") {
      value = value.replace(/[^\w\s.]/gi, "").toLowerCase();
    }

    register[name] = value;

    this.setState({ register });
  };

  register = (e) => {
    e.preventDefault();
    this.setState({ busy: true });

    const data = {
      email: this.state.register.email,
      username: this.state.register.username,
      plainPassword: {
        first: this.state.register.password,
        second: this.state.register.passwordCheck,
      },
    };

    axios
      .post(publisher_api_url + "/users/register/", data)
      .then((response) => {
        console.log(response.data);
        this.setState({ thankYouPage: true });
      })
      .catch((error) => {
        toast.error("Something went wrong. Try again.");
        this.setState({ busy: false });
      });
  };

  render() {
    const arePasswordsMathing =
      this.state.register.password === this.state.register.passwordCheck;

    return (
      <BaseLayout>
        <div>
          <form onSubmit={this.login}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              onChange={this.handleAuthChange}
              value={this.state.auth.username}
              autoComplete="username"
              autoFocus
            />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              onChange={this.handleAuthChange}
              value={this.state.auth.password}
              autoComplete="password"
              type="password"
            />
            <button type="submit" disabled={this.state.busy}>
              login
            </button>
          </form>
          {this.state.thankYouPage ? (
            <h2>
              Thank You for registration. Confirmation email has been sent.
            </h2>
          ) : (
            <form onSubmit={this.register}>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                onChange={this.handleRegisterChange}
                value={this.state.register.email}
                type="email"
              />
              <label htmlFor="username">Username</label>
              <input
                name="username"
                onChange={this.handleRegisterChange}
                value={this.state.register.username}
              />

              <label htmlFor="password">Password</label>
              <input
                name="password"
                onChange={this.handleRegisterChange}
                value={this.state.register.password}
                type="password"
                style={arePasswordsMathing ? {} : { borderColor: "red" }}
              />

              <label htmlFor="passwordCheck">
                Password check (better naming needed here)
              </label>
              <input
                name="passwordCheck"
                onChange={this.handleRegisterChange}
                value={this.state.register.passwordCheck}
                type="password"
                style={arePasswordsMathing ? {} : { borderColor: "red" }}
              />
              <button
                type="submit"
                disabled={this.state.busy || !arePasswordsMathing}
              >
                register
              </button>
            </form>
          )}
        </div>
      </BaseLayout>
    );
  }
}

export async function getStaticProps(context) {
  const menus = await getMenus();

  return {
    props: { menus: menus },
    revalidate: 360,
  };
}

export default Login;
