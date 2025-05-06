import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

export default function Home() {
  const MailIcon = getIcon('Mail');
  const BrainCircuitIcon = getIcon('BrainCircuit');
  const WebhookIcon = getIcon('Webhook');
  const ArrowRightIcon = getIcon('ArrowRight');
  
  const [emailAddress, setEmailAddress] = useState('');
  
  const handleGenerateEmail = () => {
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const generatedEmail = `parse-${uniqueId}@parsemail.app`;
    setEmailAddress(generatedEmail);
    
    // Copy to clipboard
    navigator.clipboard.writeText(generatedEmail).then(() => {
      toast.success("Email address copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy email address");
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Extract Data from Emails <span className="text-accent">Effortlessly</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
            Get a unique email address, forward your emails, and extract exactly what you need with our intuitive parsing tools.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleGenerateEmail}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-lg"
            >
              <MailIcon size={20} /> Generate Your Email Address
            </button>
            
            <a href="#demo" className="btn-outline flex items-center gap-2">
              See How It Works <ArrowRightIcon size={18} />
            </a>
          </div>
          
          {emailAddress && (
            <motion.div 
              className="mt-8 p-4 rounded-lg bg-surface-100 dark:bg-surface-800 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-mono text-lg mb-2">Your unique email address:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="font-mono bg-white dark:bg-surface-700 p-2 rounded border border-surface-200 dark:border-surface-600">
                  {emailAddress}
                </code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(emailAddress);
                    toast.info("Copied again!");
                  }}
                  className="p-2 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  {getIcon('Copy')({ size: 18 })}
                </button>
              </div>
              <p className="text-sm mt-2 text-surface-500">
                Forward emails to this address to start parsing data
              </p>
            </motion.div>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div 
            className="card flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-full p-4 bg-primary/10 dark:bg-primary/20 mb-4">
              <MailIcon className="text-primary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Unique Email Address</h3>
            <p className="text-surface-600 dark:text-surface-300">
              Get your personal forwarding address and start sending emails you want to parse.
            </p>
          </motion.div>
          
          <motion.div 
            className="card flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-full p-4 bg-secondary/10 dark:bg-secondary/20 mb-4">
              <BrainCircuitIcon className="text-secondary" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Intelligent Parsing</h3>
            <p className="text-surface-600 dark:text-surface-300">
              Define parsing rules by simply selecting the text you want to extract from your emails.
            </p>
          </motion.div>
          
          <motion.div 
            className="card flex flex-col items-center text-center p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="rounded-full p-4 bg-accent/10 dark:bg-accent/20 mb-4">
              <WebhookIcon className="text-accent" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Webhook Integration</h3>
            <p className="text-surface-600 dark:text-surface-300">
              Send your parsed data anywhere with custom webhook configurations.
            </p>
          </motion.div>
        </div>
        
        <div id="demo" className="scroll-mt-20">
          <MainFeature />
        </div>
      </div>
    </div>
  );
}