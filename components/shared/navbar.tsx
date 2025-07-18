"use client";
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Button } from '../ui/button';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  url: string;
}

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>(null);


  // Mock search suggestions - replace with your actual search logic
  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Flowers', category: 'Flowers', url: '/flowers' },
    { id: '2', title: 'Exotic Plants Collection', category: 'Licensed Exotics', url: '/exotics/plants' },
    { id: '3', title: 'Organic Fertilizer', category: 'Soil Exotics', url: '/soil/fertilizer' },
    { id: '4', title: 'Indoor Grow Lights', category: 'Licensed Indoors', url: '/indoors/grow-lights' },
    { id: '5', title: 'Wax Melts', category: 'Wax', url: '/wax/melts' },
    { id: '6', title: 'AAA Grade Seeds', category: 'Licensed AAA', url: '/aaa/seeds' },
    { id: '7', title: 'Last Chance Clearance', category: 'Deals', url: '/deals/clearance' },
  ];

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    {
      name: 'Flowers', href: '/flowers', sub: [
        { name: 'Tier 1 (EXOTIC)', href: '/flowers/tier1' },
        { name: 'Tier 2 (TOP SHELF)', href: '/flowers/tier2' },
        { name: 'Tier 3 (CHEAP)', href: '/flowers/tier3' },
        { name: 'Snowcaps', href: '/flowers/snowcaps' },
        { name: 'Moonrocks', href: '/flowers/moonrocks' },
      ]
    },
    { name: 'Pre-Rolls', href: '/pre-rolls' },
    { name: 'Extracts', href: '/extracts' },
    { name: 'Edibles', href: '/edibles' },
    { name: 'Vapes', href: '/vapes' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleDropdownEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Filter suggestions based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockSuggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Handle mobile submenu toggle
  const toggleMobileSubMenu = (itemName: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === itemName ? null : itemName);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Handle search submission here
      setIsSearchOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    console.log('Navigating to:', suggestion.url);
    setSearchQuery('');
    setIsSearchOpen(false);
    // Handle navigation here
  };



  return (
    <>
      <nav className="bg-black text-white relative z-50 border-b border-gray-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="grid place-items-center w-12 h-12 rounded-full overflow-hidden border border-gray-700 cursor-pointer">
                <img className=' ' src="/logo.jpeg" alt="" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.sub && handleDropdownEnter(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <a
                    href={item.sub ? '#' : item.href}
                    className={`px-3 py-2 rounded-md text-nowrap text-sm font-medium transition-all duration-200 hover:text-green-400 ${item.sub ? '' : 'hover:bg-gray-900'} flex items-center gap-1 ${activeDropdown === item.name ? 'text-green-400 bg-gray-900' : ''
                      }`}
                  >
                    {item.name}
                    {item.sub && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.sub && (
                    <div
                      className={`absolute top-full left-0 mt-1 w-56 bg-green-900/30 backdrop-blur-lg border border-gray-700 rounded-lg shadow-2xl transition-all duration-300 ease-out transform ${activeDropdown === item.name
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                        }`}
                    >
                      <div className="py-2">
                        {item.sub.map((subItem, index) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-3 text-sm text-gray-300 hover:text-green-500 hover:bg-green-600/10 transition-all duration-200 transform hover:translate-x-1 ${activeDropdown === item.name ? 'animate-in slide-in-from-left' : ''
                              }`}
                            style={{
                              animationDelay: activeDropdown === item.name ? `${index * 50}ms` : '0ms'
                            }}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Daily Special Button */}
              <Button
                variant="outline"
                className="relative rounded-full overflow-hidden  border-white bg-transparent hover:text-black hover:bg-transparent text-white group cursor-pointer"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 px-2 pr-4 py-2">Daily Special  </span>
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-gray-300 transition-colors relative w-6 h-6 flex flex-col justify-center items-center"
                aria-label="Toggle menu"
              >
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'rotate-45 translate-y-0.5' : 'translate-y-0 rotate-0 mb-1'
                  }`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-0' : 'opacity-100 mb-1'
                  }`} />
                <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-0 rotate-0'
                  }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden bg-black border-t border-gray-800 transition-all duration-300 ease-out overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.sub ? '#' : item.href}
                    onClick={() => toggleMobileSubMenu(item.name)}
                    className={`flex-1 block px-3 py-2 rounded-md text-base font-medium transition-all hover:text-green-400 ${item.sub ? '' : 'hover:bg-gray-900 '} duration-300 ease-out transform ${isMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                      }`}
                    style={{
                      transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                    }}
                  >
                    {item.name}
                  </a>

                  {/* Mobile submenu toggle */}
                  {item.sub && (
                    <button
                      onClick={() => toggleMobileSubMenu(item.name)}
                      className={`px-3 py-2 text-gray-400 hover:text-white transition-all duration-200 transform ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                        }`}
                      style={{
                        transitionDelay: isMenuOpen ? `${index * 50 + 25}ms` : '0ms'
                      }}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${mobileSubMenuOpen === item.name ? 'rotate-180' : ''
                          }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.sub && (
                  <div className={`overflow-hidden transition-all duration-300 ease-out ${mobileSubMenuOpen === item.name ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className="ml-4 border-l border-gray-700 pl-4 py-2 space-y-1">
                      {item.sub.map((subItem, subIndex) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-3 py-2 rounded-md text-sm text-gray-400 hover:text-green-500 hover:bg-gray-800 transition-all duration-200 transform ${mobileSubMenuOpen === item.name ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                            }`}
                          style={{
                            transitionDelay: mobileSubMenuOpen === item.name ? `${subIndex * 50}ms` : '0ms'
                          }}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 animate-in fade-in duration-300">
          <div
            ref={searchRef}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-hidden transform transition-all duration-300 ease-out scale-100 translate-y-0"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="relative flex items-center">
                <Search className="absolute left-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                  placeholder="Search products, categories..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition-all duration-200"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="max-h-64 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition-all duration-200 transform hover:translate-x-1"
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{suggestion.title}</div>
                        <div className="text-sm text-gray-500">{suggestion.category}</div>
                      </div>
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No results */}
            {searchQuery && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500 animate-in fade-in duration-300">
                No results found for "{searchQuery}"
              </div>
            )}

            {/* Popular searches or recent searches when no query */}
            {!searchQuery && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Flowers', 'Pre-Rolls', 'Exotic Plants', 'Wax Products'].map((term, index) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                      style={{
                        animationDelay: `${index * 100}ms`
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;