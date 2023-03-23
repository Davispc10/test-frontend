import React from 'react';

const ErrorPage = () => {
  return (
    <div
      className="text-marvel-red w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">
        {'Ooops, something went wrong :('}
      </h2>
      <button
        className="mt-4 rounded-lg bg-neutral-300 p-2"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </button>
    </div>
  );
};

export default ErrorPage;
