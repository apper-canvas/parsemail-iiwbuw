import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

export default function Header({ toggleDarkMode, darkMode }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const HomeIcon = getIcon('Home');
  const MenuIcon = getIcon('Menu');
  const XIcon = getIcon('X');
  const MailIcon = getIcon('Mail');
  const CodeIcon = getIcon('Code');
  const WebhookIcon = getIcon('Webhook');
  const SunIcon = getIcon('Sun');
  const MoonIcon = getIcon('Moon');
  const GithubIcon = getIcon('Github');

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Email Setup', path: '#email-setup', icon: MailIcon },
    { name: 'Parsing', path: '#parsing', icon: CodeIcon },
    { name: 'Integrations', path: '#integration', icon: WebhookIcon },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-30 bg-white dark:bg-surface-800 transition-all-md ${
        scrolled ? 'shadow-md py-1' : 'py-2'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <span className="text-lg font-bold text-primary">
                <span className="text-accent">Parse</span>Mail
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-1.5 text-sm rounded-md transition-all-sm flex items-center space-x-1 ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <item.icon size={14} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-surface-500 hover:text-primary transition-all-sm hidden md:block"
            >
              <GithubIcon size={18} />
            </a>
            
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 transition-all-sm"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md hover:bg-surface-100 dark:hover:bg-surface-700 transition-all-sm md:hidden"
            >
              {isOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}