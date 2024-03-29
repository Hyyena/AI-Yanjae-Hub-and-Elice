import $ from "jquery";
import axios from "axios";
import port from "./../../data/port.json";
import { useRef, useState } from "react";

const SignUpForm = ({ signUpData, onChangeSignUpData, setSignUpData }) => {
  const emailRef = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  const onClickSignUpButton = () => {
    if (signUpData.email === "") {
      alert("이메일을 입력해주세요.");
      emailRef.current.focus();
      return;
    }

    if (signUpData.password === "") {
      alert("비밀번호를 입력해주세요.");
      $("#password").focus();
      return;
    }

    if (signUpData.rePassword === "") {
      alert("비밀번호를 입력해주세요.");
      $("#rePassword").focus();
      return;
    }

    if (signUpData.name === "") {
      alert("이름을 입력해주세요.");
      $("#name").focus();
      return;
    }

    if (signUpData.password !== signUpData.rePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setSignUpData({
        ...signUpData,
        password: "",
        rePassword: "",
      });
      $("#password").focus();
      return;
    }

    sendSignUpData()
      .then((res) => {
        console.log(res.data);
        alert(res.data.result);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.error);
      });
  };

  const sendSignUpData = async () => {
    return await axios.post(`${port.url}/user/signUp`, signUpData);
  };

  return (
    <div className="album">
      <div className="container">
        <form className="col g-4 was-validated" novalidate>
          <div
            className="col-md-4 my-4"
            style={{ float: "none", margin: "0 auto" }}
          >
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              ref={emailRef}
              aria-describedby="emailHelp"
              onChange={onChangeSignUpData}
              defaultValue={signUpData.email}
              required
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ float: "none", margin: "0 auto" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div
            className="col-md-4 my-4"
            style={{ float: "none", margin: "0 auto" }}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={onChangeSignUpData}
              defaultValue={signUpData.password}
              required
            />
          </div>
          <div
            className="col-md-4 my-4"
            style={{ float: "none", margin: "0 auto" }}
          >
            <label htmlFor="rePassword" className="form-label">
              Check Password
            </label>
            <input
              type="password"
              className="form-control"
              name="rePassword"
              id="rePassword"
              onChange={onChangeSignUpData}
              defaultValue={signUpData.rePassword}
              required
            />
          </div>
          <div
            className="col-md-4 my-4"
            style={{ float: "none", margin: "0 auto" }}
          >
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={onChangeSignUpData}
              defaultValue={signUpData.name}
              required
            />
          </div>
          <div
            className="col-md-4 my-4"
            style={{ float: "none", margin: "0 auto" }}
          >
            <p className="text-danger">{errorMessage}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickSignUpButton}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
