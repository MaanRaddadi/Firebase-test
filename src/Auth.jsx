import React, { useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, deleteUser, updateCurrentUser, updateProfile } from "firebase/auth";
function Auth() {
  const [userInput, setUserInput] = useState({});

  const handelInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();
      
      createUserWithEmailAndPassword(auth, userInput.email, userInput.password).then((res)=>{
       updateProfile(res.user,{
        displayName:userInput.username
       }).then((res)=>{
        console.log(res)
       })
        
      }).catch((error)=>{
        if(error.code === "auth/email-already-in-use"){
          console.log("Email is in use")
        }
        
      })
    
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  className="input input-bordered"
                  required
                  onChange={handelInput}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={handelInput}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={handelInput}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" onClick={createUser}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
