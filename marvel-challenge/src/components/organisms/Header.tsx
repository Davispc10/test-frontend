import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-red-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* <Link href="/"> */}
          <h1 className="text-2xl font-bold">Personagens da Marvel</h1>
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;