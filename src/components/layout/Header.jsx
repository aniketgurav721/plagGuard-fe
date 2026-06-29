import React, { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

/**
 * Top navigation bar with auth-aware links and sign-out action.
 */
const Header = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  /** Signs the user out and returns to the home page. */
  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#ededed] px-10 py-3">
      <div className="flex items-center gap-4 text-[#141414]">
        <div className="heading-logo">
          <img src="/images/logo.svg" alt="PlagGuard logo" />
        </div>
        <h2 className="text-[#141414] text-lg font-bold leading-tight tracking-[-0.015em]">
          PlagGuard
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <Link className="text-[#141414] text-sm font-medium leading-normal" to="/">
            Home
          </Link>
          <Link className="text-[#141414] text-sm font-medium leading-normal" to="/contact">
            Contact
          </Link>

          {user ? (
            <>
              <span className="text-sm text-[#141414] font-medium leading-normal">
                Welcome, {user.email}
              </span>
              <button
                type="button"
                className="text-[#141414] text-sm font-medium leading-normal"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              className="text-[#141414] text-sm font-medium leading-normal"
              to="/signin"
              state={{ from: location.pathname }}
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
