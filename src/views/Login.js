import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      error: false,
    };
  }
  sendLoginInfo = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/api/login";

    const body = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    if (data.status === "ok") {
      this.props.logMeIn(data.data);
    }
  };

  sendBasicAuth = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:5000/token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${btoa(
            e.target.username.value + ":" + e.target.password.value
          )}`,
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "ok") {
        this.props.logMeIn(data.data);
        this.setState({ redirect: true });
      }
    } catch (error) {
      this.setState({ error: true });
    }
  };

  render() {
    return this.state.redirect ? (
      <Navigate to="/preferences" />
    ) : (
      <>
        <div className="body">
          <div className="login-card ">
            <div className="login-header-cont">
              <h5 className="login-header">Login to </h5>
              <h5 className="brand-label">Dispatched </h5>
            </div>
            <form
              className=""
              onSubmit={(e) => {
                this.sendBasicAuth(e);
              }}
            >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input type="text" className="form-control" name="username" />
              </div>

              <div className="mb-3 login-form">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                />
                <a href="#" className="login-link1">
                  Forgot your password?
                </a>
              </div>

              <button type="submit" className="btn btn-primary login-btn ">
                Log In<i className="fa-solid fa-arrow-right-long fa-lg"></i>
              </button>
              <p className="mt-3">
                Don't have an account?{" "}
                <Link to='/login' className="login-link2" href="#">
                  Sign Up
                </Link>
                
              </p>
            </form>
          </div>
        </div>
      </>
    );
  }
}
