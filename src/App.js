import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import PlagiarismForm from "./components/plagiarism/PlagiarismForm";
import MainPage from "./components/plagiarism/MainPage";
import Result from "./components/plagiarism/Result";
import AboutUs from "./components/pages/AboutUs";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import Contact from "./components/pages/Contact";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { AuthProvider, AuthContext } from "./context/AuthContext";

/** Defines application routes with auth-aware result page. */
const AppRoutes = () => {
  const { user } = React.useContext(AuthContext);

  return useRoutes([
    { path: "/", element: <PlagiarismForm /> },
    { path: "/main", element: <MainPage /> },
    { path: "/result", element: <Result isLoggedIn={!!user} /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/privacy", element: <PrivacyPolicy /> },
    { path: "/terms", element: <TermsOfService /> },
    { path: "/contact", element: <Contact /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
  ]);
};

/** Root application component with layout shell and routing. */
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div
          className="relative flex size-full min-h-screen flex-col bg-neutral-50 overflow-x-hidden"
          style={{ fontFamily: '"Be Vietnam Pro", "Noto Sans", sans-serif' }}
        >
          <div className="layout-container flex h-full grow flex-col">
            <Header />
            <main className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
