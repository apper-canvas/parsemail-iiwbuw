import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 inline-block p-4 rounded-full bg-surface-100 dark:bg-surface-800 transition-all-sm">
          <AlertTriangleIcon size={48} className="text-accent" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Page Not Found</h1>
        
        <p className="text-base text-surface-600 dark:text-surface-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="btn-primary inline-flex items-center gap-2 px-4 py-2 transition-all-sm"
        >
          <HomeIcon size={18} />
          Go back home
        </Link>
      </motion.div>
    </div>
  );
}