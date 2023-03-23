import React from 'react';

const FullscrenLoader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-8 border-t-8 border-marvel-red" />
    </div>
  );
};

export default FullscrenLoader;
