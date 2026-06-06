
/*
 * Copyright (c) 2026 Srabon Das
 * All Rights Reserved.
 */


import { motion } from "framer-motion";


import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { Mail, MapPin, Phone } from "lucide-react"




export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-4">About Tech_Laundry</h3>
            <p className="text-dark-muted text-sm leading-relaxed">
              Your trusted platform for professional laundry services. Fast, reliable, and affordable washing solutions at your doorstep.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-dark-muted text-sm">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="/shops" className="hover:text-primary transition">Find Shops</a></li>
              <li><a href="#" className="hover:text-primary transition">Services</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-dark-muted text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                +880123456789
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                support@techlaundry.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                Dhaka, Bangladesh
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition">
                <FaFacebook size={20} className="text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition">
                <FaTwitter size={20} className="text-primary" />
              </a>
              <a href="#" className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition">
                <FaInstagram size={20} className="text-primary" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-lighter/20 mt-8 pt-8">
          <div className="text-center text-dark-muted text-sm">
            <p>&copy; 2025 Tech_Laundry. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ for clean clothes</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
