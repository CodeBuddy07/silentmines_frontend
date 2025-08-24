import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              🚀 The Green Thumb
            </h3>
            <p className="text-gray-400 text-sm">
              Your one-stop shop for galactic flavors, cosmic curiosities, and
              more.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-3">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@example.com"
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  hello@example.com
                </a>
              </li>
              <li className="flex space-x-4 mt-3">
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 text-lg"
                >
                  <img src="/telegram_logo.avif" alt="Element" className="w-6 h-6  rounded-2xl" />
                </a>
                <a
                  href="https://element.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400 text-lg"
                >
                  <img src="/element_logo.png" alt="Element" className="w-6 h-6  rounded-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <span>© {currentYear} The Green Thumb. All rights reserved.</span>
          <span className="mt-2 md:mt-0">
            Made with ❤️ somewhere in the universe.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
