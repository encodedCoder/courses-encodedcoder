import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className="container mx-auto flex justify-between items-center p-4 content-width">
        <div>
          <Link href="/" className="text-2xl font-bold">
            encodedCoder · Courses
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link
            href="https://encodedcoder.com/"
            className="nav-link"
            target="_blank"
          >
            {" "}
            encodedCoder
          </Link>
          {/* <Link href="/portfolio" className="nav-link">
            Portfolio
          </Link>
          <Link href="/projects" className="nav-link">
            Projects
          </Link>
          <Link href="/about" className="nav-link">
            About
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link> */}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="https://encodedcoder.com/"
              className="nav-link"
              target="_blank"
            >
              {" "}
              encodedCoder
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
