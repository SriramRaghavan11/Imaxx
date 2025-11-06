// src/components/ui/FloatingActionButton.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Phone, MessageCircle, X, Mail } from "lucide-react";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Phone,
      label: "Call Now",
      href: "tel:+917904994834",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/917904994834",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:admin@imaxxsports.com",
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.a
                key={index}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-4 py-3 ${action.color} text-white rounded-full shadow-2xl transition-all duration-300 group`}
              >
                <action.icon size={20} />
                <span className="text-sm font-medium whitespace-nowrap">
                  {action.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-14 h-14 ${
          isOpen
            ? "bg-red-600 hover:bg-red-700"
            : "bg-orange-600 hover:bg-orange-700"
        } text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X size={24} /> : <Phone size={24} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActionButton;
