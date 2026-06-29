import React from "react";
import { Link } from "react-router-dom";

/**
 * Site footer with navigation links and copyright notice.
 */
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row px-4">
        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-xl font-bold mb-2">PlagGuard</h2>
          <p className="text-sm text-gray-400">
            Safeguard your content with reliable AI-powered plagiarism detection.
          </p>
        </div>

        <div className="flex gap-6 mt-4 sm:mt-0">
          <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
            About Us
          </Link>
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} PlagGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
