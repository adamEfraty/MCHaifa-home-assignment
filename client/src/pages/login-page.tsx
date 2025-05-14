import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function LogPage() {
  const [isRegister, setIsRegister] = useState<boolean>(true);

  const instrumentOptions = ["Guitar", "Bass"];

  async function handleRegister(values: any) {
    const { data } = await axios.post(
      "http://localhost:3000/user/register",
      values
    );
    console.log(data);
  }

  async function handleLogin(values: any) {
    const { data } = await axios.get(
      "http://localhost:3000/api/user/login",
      values
    );
    console.log(data);
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
        onSubmit={isRegister ? handleRegister : handleLogin}
      >
        {() => (
          <Form className="main-log-form">
            <div className="form-body">
              <header>
                <h3>Welcome to jaMoveo!</h3>
                <h1>{isRegister ? "Register" : "Log In"}</h1>
              </header>
              {isRegister ? (
                <section className="form-data">
                  <div className="username-section form-section">
                    <label htmlFor="username">Username*</label>
                    <Field
                      name="username"
                      type="username"
                      placeholder="Select Your username"
                    />
                    <ErrorMessage name="username" component="div" />
                  </div>
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
                    <ErrorMessage name="instrument" component="div" />
                  </div>
                  <div className="password-section form-section">
                    <label htmlFor="password">Create Password*</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Your Password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                </section>
              ) : (
                <section className="form-data">
                  <div className="username-section form-section">
                    <label htmlFor="username">Username:</label>
                    <Field
                      name="username"
                      type="username"
                      placeholder="Username"
                    />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div className="password-section form-section">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                </section>
              )}
              {!isRegister ? (
                <section className="rememberMe">
                  <div>
                    <input type="checkbox" />
                    <p>Remember me</p>
                  </div>
                  <p>Forgot Password?</p>
                </section>
              ) : (
                ""
              )}
            </div>
            <button type="submit">{isRegister ? "Register" : "Log In"}</button>
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
      <img src="images/login.png" />
    </section>
  );
}

export default LogPage;
