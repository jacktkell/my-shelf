import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function LoginSignupPage({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <div class="form">
            <p>
              Don't have an account? &nbsp;
              <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </p>
          </div>
        </>
      ) : (
        <>
          <SignupForm onLogin={onLogin} />
          <div class="form">
            <p>
              Already have an account? &nbsp;
              <button onClick={() => setShowLogin(true)}>Log In</button>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginSignupPage;
