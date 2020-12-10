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
        <>
          <div className="join grid">
            <div className="join__text grid__item gi-xsmall-12 gi-medium-6">
              <h2>Login and get exclusive benefits</h2>
              <p>Enter your email and password to login to your account</p>
            </div>
            <div className="join__form grid__item gi-xsmall-12 gi-medium-6">
              <form onSubmit={this.login}>
                <div className="join__top marginBottom20">
                  <h4 className="section__hdl section__hdl--small marginBottom0">
                    Login
                  </h4>
                  <img src="/img/icon-login.svg" alt="" />
                </div>
                <input
                  name="username"
                  onChange={this.handleAuthChange}
                  value={this.state.auth.username}
                  autoComplete="username"
                  placeholder="Username"
                  autoFocus
                />

                <input
                  name="password"
                  onChange={this.handleAuthChange}
                  value={this.state.auth.password}
                  autoComplete="password"
                  type="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  className="btn btn--color"
                  disabled={this.state.busy}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
          {this.state.thankYouPage ? (
            <h2>
              Thank You for registration. Confirmation email has been sent.
            </h2>
          ) : (
            <>
              <div className="join__sep">
                <span>or</span>
              </div>
              <div className="join grid marginBottom-20">
                <div className="join__text grid__item gi-xsmall-12 gi-medium-6">
                  <h2>Register and get exclusive content for free</h2>
                  <p>Complete our short form to register for an account.</p>
                </div>
                <div
                  className="join__form grid__item gi-xsmall-12 gi-medium-6"
                  style={{ backgroundColor: "#DDDDDD" }}
                >
                  <form onSubmit={this.register}>
                    <div className="join__top marginBottom20">
                      <h4 className="section__hdl section__hdl--small marginBottom0">
                        Register
                      </h4>
                      <img src="/img/icon-register.svg" alt="" />
                    </div>
                    <input
                      name="email"
                      onChange={this.handleRegisterChange}
                      value={this.state.register.email}
                      placeholder="Email"
                      type="email"
                    />
                    <input
                      name="username"
                      onChange={this.handleRegisterChange}
                      value={this.state.register.username}
                      placeholder="Username"
                    />

                    <input
                      name="password"
                      onChange={this.handleRegisterChange}
                      value={this.state.register.password}
                      type="password"
                      placeholder="Password"
                      style={arePasswordsMathing ? {} : { borderColor: "red" }}
                    />

                    <input
                      name="passwordCheck"
                      onChange={this.handleRegisterChange}
                      value={this.state.register.passwordCheck}
                      type="password"
                      placeholder="Retype password"
                      style={arePasswordsMathing ? {} : { borderColor: "red" }}
                    />
                    <button
                      type="submit"
                      className="btn btn--color"
                      disabled={this.state.busy || !arePasswordsMathing}
                    >
                      register
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
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
