import React from "react";

/** Static Contact page. */
const Contact = () => {
  return (
    <div className="px-10 py-5 w-full max-w-3xl">
      <h1 className="text-2xl font-bold">Contact Us</h1>
      <p className="mt-4 text-lg">
        Got questions? Reach out to us at{" "}
        <a href="mailto:support@plagguard.com" className="text-blue-500">
          support@plagguard.com
        </a>
        .
      </p>
    </div>
  );
};

export default Contact;
