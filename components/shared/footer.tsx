import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <a 
                href="#gallery" 
                className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium underline"
              >
                Gallery
              </a>
              <a 
                href="#reviews" 
                className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium underline"
              >
                Reviews
              </a>
              <a 
                href="#contact" 
                className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium underline"
              >
                Contact Us
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} All rights reserved
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;