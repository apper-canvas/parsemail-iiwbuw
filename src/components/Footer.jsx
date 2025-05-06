import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function Footer() {
  const GithubIcon = getIcon('Github');
  const TwitterIcon = getIcon('Twitter');
  const LinkedinIcon = getIcon('Linkedin');
  const MailIcon = getIcon('Mail');
  const HeartIcon = getIcon('Heart');
  const ShieldIcon = getIcon('Shield');
  const LifeBuoyIcon = getIcon('LifeBuoy');
  const BookIcon = getIcon('BookOpen');

  // Footer navigation menus
  const footerNavs = [
    {
      title: "Product",
      items: [
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Use Cases", href: "#" },
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Documentation", href: "#", icon: BookIcon },
        { label: "Support", href: "#", icon: LifeBuoyIcon },
        { label: "Privacy", href: "#", icon: ShieldIcon },
      ]
    }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="text-lg font-bold text-primary mb-2">
              <span className="text-accent">Parse</span>Mail
            </div>
            <p className="text-xs text-surface-500 dark:text-surface-400">
              Extract and process data from your emails effortlessly with our powerful parsing tools.
            </p>
            <div className="flex space-x-3 mt-3">
              {[GithubIcon, TwitterIcon, LinkedinIcon, MailIcon].map((Icon, i) => (
                <a key={i} href="#" className="text-surface-500 hover:text-primary transition-all-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          {footerNavs.map((nav, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold mb-2">{nav.title}</h4>
              <ul className="space-y-1.5">
                {nav.items.map((item, j) => (
                  <li key={j}><a href={item.href} className="text-xs text-surface-500 hover:text-primary transition-all-sm flex items-center gap-1">{item.icon && <item.icon size={12} />} {item.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-surface-500 mt-4 pt-3 border-t border-surface-100 dark:border-surface-700 flex items-center justify-center">© {new Date().getFullYear()} ParseMail. Made with <HeartIcon size={12} className="text-red-500 mx-1" /> for developers.</div>
      </div>
    </motion.footer>
  );
}