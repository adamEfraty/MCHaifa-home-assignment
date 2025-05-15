import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router";
import { setUserSession } from "../services/user.service";
import {
  loginValidationSchema,
  regValidationSchema,
} from "../schema/yupValidation";
import { httpService } from "../services/http.service";

function LogPage() {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>("");
  const { adminUrl } = useParams();

  const instrumentOptions = ["Guitar", "Bass", "Drum", "Singer"];

  async function handleRegister(values: any) {
    async function register() {
      const data = await httpService.post("auth/register", {
        ...values,
        role: adminUrl ? "admin" : "user",
      });
      setUserSession(data);
    }
    register()
      .then(() => {
        window.location.href = "/"
      })
      .catch((err) => {
        console.error("Register error:", err);
      });
  }

  async function handleLogin(values: any) {
    async function login() {
      const data = await httpService.post("auth/login", values);
      setUserSession(data);
    }
    login()
      .then(() => {
        window.location.href = "/"
      })
      .catch((err) => {
        if (err.status == 401) {
          setLoginError(err.response.data.err);
          setTimeout(() => setLoginError(""), 4000);
        }
      });
  }

  const toggleState = () => setIsRegister(!isRegister);

  return (
    <section className="login-page-container">
      <Formik
        initialValues={
          isRegister
            ? { username: "", instrument: "", password: "" }
            : { username: "", password: "" }
        }
        validationSchema={
          isRegister ? regValidationSchema : loginValidationSchema
        }
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="main-log-form">
            <div className="form-body">
              <header>
                <h3>Welcome to jaMoveo!</h3>
                <h1>{isRegister ? "Register" : "Log In"}</h1>
              </header>
              <section className="form-data">
                {loginError ? <p className="error-msg">{loginError}</p> : ""}
                <div className="username-section form-section">
                  <label htmlFor="username">Username*</label>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error-msg"
                  />
                </div>

                {isRegister && (
                  <div className="instrument-section form-section">
                    <label htmlFor="instrument">Your instrument*</label>
                    <Field name="instrument" as="select">
                      <option value="">Select your instrument</option>
                      {instrumentOptions.map((instrument) => (
                        <option key={instrument} value={instrument}>
                          {instrument}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="instrument"
                      component="div"
                      className="error-msg"
                    />
                  </div>
                )}

                <div className="password-section form-section">
                  <label htmlFor="password">
                    {isRegister ? "Create Password*" : "Password*"}
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-msg"
                  />
                </div>
              </section>

              {!isRegister && (
                <section className="rememberMe">
                  <div>
                    <input type="checkbox" />
                    <p>Remember me</p>
                  </div>
                  <p>Forgot Password?</p>
                </section>
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isRegister ? "Register" : "Log In"}
            </button>

            <section className="login-question">
              <p>
                {isRegister
                  ? "Already have an account? "
                  : "Don't have an account? "}
              </p>
              <p className="highlight" onClick={toggleState}>
                {isRegister ? "Log In" : "Register"}
              </p>
            </section>
          </Form>
        )}
      </Formik>
      <img
        src={`images/${isRegister ? "register-image.png" : "login-image.png"}`}
      />
    </section>
  );
}

export default LogPage;
