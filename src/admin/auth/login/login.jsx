import React from "react";
import styles from "./style.module.css";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth.slice";
import { baseAPI } from "../../../config";
import Alert from "../../../componentsAdmin/alert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (user) => {
    setLoading(true);
    const response = await fetch(`${baseAPI}/api/user/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        dispatch(authActions.loginUser(data));
        history.replace("/dashboard");
        // history.goBack();
        setLoading(false);
        setError(null);
      } else {
        setLoading(false);
        setError("Your login credentials are incorrect. Please try again!");
      }
    } else {
      setLoading(false);
      setError("Your login credentials are incorrect. Please try again!");
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const user = { email, password };

    loginUser(user);
  };

  return (
    <>
      {error && <Alert message={error} type={"error"} />}

      <div className={styles.login_wrapper}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
            required="true"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            width={100}
          />
          <div style={{ marginBottom: "20px" }}></div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            required="true"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div style={{ marginBottom: "20px" }}></div>
          <Button variant="contained" color="secondary">
            Log In
          </Button>
        </form>

        <div style={{ marginBottom: "20px" }}></div>

        <div>
          <Link to="/auth/register">
            <a>
              <h4>Register as Reporter</h4>
            </a>
          </Link>
        </div>
      </div>

      <div className={styles.login_wrapper}>
        <div>
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <div>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                required="true"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                width={100}
              />
              <div style={{ marginBottom: "20px" }}></div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                required="true"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button variant="contained" color="secondary">
                Log In
              </Button>
              {/* <div className={styles.login_box}>
            
                {(!email || !password) && !loading && (
                  <button
                    className={styles.disabled_button}
                    type="submit"
                    disabled
                  >
                    Log In
                  </button>
                )}

                {email && password && !loading && (
                  <button
                    className={styles.active_button}
                    type="submit"
                    onClick={loginHandler}
                  >
                    Log In
                  </button>
                )}

                {email && password && loading && (
                  <button
                    className={styles.disabled_button}
                    type="submit"
                    disabled
                  >
                    Logging you in...
                  </button>
                )}
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
