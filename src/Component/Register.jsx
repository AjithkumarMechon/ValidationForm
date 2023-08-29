import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../Api/axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.css";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [formData, setFormData] = useState({
    user: "",
    pwd: "",
    matchPwd: "",
  });

  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [toggle, setToggle] = useState(true);

  const [ValidPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(formData.user);
    setValidName(result);
  }, [formData.user]);

  useEffect(() => {
    const result = PWD_REGEX.test(formData.pwd);
    setValidPwd(result);
    const match = formData.pwd === formData.matchPwd;
    setValidMatch(match);
  }, [formData.pwd, formData.matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [formData.user, formData.pwd, formData.matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(formData.user);
    const v2 = PWD_REGEX.test(formData.pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ validName, ValidPwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("no server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("username Taken");
      } else {
        setErrMsg("Registrartion failed");
      }
      errRef.current.focus();
    }

    localStorage.setItem("userData", JSON.stringify(formData));
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setToggle(!toggle);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="h1-register">Register</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} style={{ color: "#008000" }} />
              </span>
              <span
                className={validName || !formData.user ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} style={{ color: "#ff0000" }} />
              </span>
            </label>
            <input
              type="text"
              id="username-input"
              ref={userRef}
              data-testid="username-input"
              autoComplete="off"
              value={formData.user}
              onChange={(e) =>
                setFormData({ ...formData, user: e.target.value })
              }
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && formData.user && !validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4-24 Characters. <br />
              Must begin with a letter. <br />
              Letter, numbers, underscores allowed.
            </p>
            <label>
              Password
              <span className={ValidPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} style={{ color: "#008000" }} />
              </span>
              <span className={ValidPwd || !formData.pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} style={{ color: "#ff0000" }} />
              </span>
            </label>
            <input
              type={toggle ? "password" : "text"}
              id="password-input"
              autoComplete="off"
              value={formData.pwd}
              onChange={(e) =>
                setFormData({ ...formData, pwd: e.target.value })
              }
              aria-invalid={ValidPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              required
              data-testid="password-input"
            />
            <p
              id="pwdnote"
              className={
                pwdFocus && formData.pwd && !ValidPwd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8-24 Characters. <br />
              At least one uppercase, one lowercase, one digit, and one special
              character.
            </p>
            <label>
              Confirm Password
              <span
                className={
                  formData.matchPwd
                    ? validMatch
                      ? "valid"
                      : "invalid"
                    : "hide"
                }
              >
                <FontAwesomeIcon
                  icon={validMatch ? faCheck : faTimes}
                  style={{ color: validMatch ? "#008000" : "#ff0000" }}
                />
              </span>
            </label>
            <input
              type={toggle ? "password" : "text"}
              id="confirm-password-input"
              autoComplete="off"
              value={formData.matchPwd}
              onChange={(e) =>
                setFormData({ ...formData, matchPwd: e.target.value })
              }
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              required
              data-testid="confirm-password-input"
            />
            <p
              id="matchnote"
              className={
                matchFocus && formData.matchPwd && !validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4-24 Characters. <br />
              Must match the password above.
            </p>
            <div>
              <input type="checkbox" value={toggle} onClick={handleToggle} />
              <span> Show Password</span>
            </div>
            <button
              data-testid="sign-up-button"
              id="sign-up-button"
              disabled={!validName || !ValidPwd || !validMatch}
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
}
