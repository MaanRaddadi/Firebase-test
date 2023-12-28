import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { auth } from "./firebase";
function SignIn() {
  const [userInput, setUserInput] = React.useState({});

  const handelInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userInput.email, userInput.password).then(
      (res) => {
        console.log(res.user);
      }
    );
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                  onChange={handelInput}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  name="password"
                  onChange={handelInput}
                />
                <label className="label"></label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={loginUser}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
