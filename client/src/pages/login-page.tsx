import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { login, register } from "../services/user.service";
import {
  loginValidationSchema,
  regValidationSchema,
} from "../schema/yupValidation";
import { useScreenSize } from "../custom-hooks/screenSize";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import { FormGenerator } from "../components/login-form";
import type { formDataModel } from "../models/form.model";
import { useNavigate } from "react-router";

export default function LogPage() {
  const [isRegister, setIsRegister] = useState<boolean>(true);
  const [loginError, setLoginError] = useState<string>("");
  const { adminUrl } = useParams();
  const { width, height } = useScreenSize();
  const navigate = useNavigate();

  const instrumentOptions = ["Guitar", "Ukilaly", "Bass", "Drum", "Singer"];

  // useMemo to save operation cost
  const initialValues = useMemo(
    () =>
      isRegister
        ? { username: "", instrument: "", password: "" }
        : { username: "", password: "" },
    [isRegister]
  );

  const formData = useMemo(() => {
    const baseFields: formDataModel[] = [
      { name: "username" },
      { name: "password", label: isRegister ? "Create Password" : "" },
    ];

    if (isRegister) {
      baseFields.splice(1, 0, {
        name: "instrument",
        type: "select",
        dataArr: instrumentOptions,
      });
    }

    return [...baseFields, { buttonText: isRegister ? "Register" : "Log in" }];
  }, [isRegister, instrumentOptions]);

  // login form submit handling
  async function handleRegister(values: any) {
    try {
      await register(values, adminUrl);
      console.log(values, adminUrl);
      navigate(`/${adminUrl && "admin"}`);
    } catch (err) {
      console.error("Register error:", err);
    }
  }

  // login form submit handling
  async function handleLogin(values: any) {
    try {
      const data = await login(values);
      navigate(`/${data.role === "admin" && "admin"}`);
    } catch (err: any) {
      if (err.status == 401) {
        setLoginError(err.response.data.err);
        setTimeout(() => setLoginError(""), 4000);
      }
    }
  }

  const toggleState = () => setIsRegister(!isRegister);

  return (
    <section className="h-view login-page-container">
      {/* custom form generator with many jsx input possibilities */}
      <FormGenerator
        handleSubmit={isRegister ? handleRegister : handleLogin}
        validationSchema={
          isRegister ? regValidationSchema : loginValidationSchema
        }
        initialValues={initialValues}
        headerChildren={[
          () =>
            width < 800 || height < 600 ? (
              <section className="login-title">
                <HeadphonesOutlinedIcon style={{ fontSize: 60 }} />
                <h1>JAMOVEO</h1>
              </section>
            ) : (
              ""
            ),
          () => (
            <header>
              <h3>Welcome to jaMoveo!</h3>
              <h1>{isRegister ? "Register" : "Log In"}</h1>
            </header>
          ),
          () => loginError ? <p className="error-msg">{loginError}</p> : "",
        ]}
        formData={formData}
        footerChildren={[
          () =>
            isRegister ? (
              <section className="rememberMe">
                <div>
                  <input type="checkbox" />
                  <p>Remember me</p>
                </div>
                <p>Forgot Password?</p>
              </section>
            ) : null,
          () => (
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
          ),
        ]}
      />
      {width < 800 || height < 600 ? (
        ""
      ) : (
        <div className="h-prec-size image-side">
          <img
            src={`images/${
              isRegister ? "register-image.png" : "login-image.png"
            }`}
          />
        </div>
      )}
    </section>
  );
}
