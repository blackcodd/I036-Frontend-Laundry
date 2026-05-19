import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, MapPin, Truck, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-10 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Fresh Clean Clothes, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Delivered Fast</span>
              </h1>
              <p className="text-xl text-dark-muted mb-8 leading-relaxed">
                Experience premium laundry service at your doorstep. Find nearby laundry shops, place orders, and track deliveries in real-time.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="btn-primary inline-flex items-center gap-2 group"
                >
                  Get Started
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/shops"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Find Shops
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                <div className="text-9xl">🧺</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-dark-card/30 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Tech_Laundry?</h2>
            <p className="text-xl text-dark-muted">The most trusted laundry service platform</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Super Fast",
                desc: "Express service with quick turnaround times",
              },
              {
                icon: MapPin,
                title: "Find Nearby",
                desc: "Discover laundry shops closest to you instantly",
              },
              {
                icon: Truck,
                title: "Free Delivery",
                desc: "Free pickup and delivery on all orders",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                desc: "Multiple payment options with buyer protection",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card text-center group hover:border-primary/80"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-dark-muted text-sm">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Find Shop", desc: "Browse nearby laundry shops" },
              { step: "2", title: "Place Order", desc: "Add items to cart" },
              { step: "3", title: "Pay Securely", desc: "Multiple payment methods" },
              { step: "4", title: "Track & Enjoy", desc: "Real-time order tracking" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="card text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-dark-muted text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-primary">
                    <ArrowRight size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-dark-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmed Hassan",
                role: "Regular Customer",
                text: "Amazing service! My clothes are always perfect. Highly recommended!",
                rating: 5,
              },
              {
                name: "Fatima Khan",
                role: "Shop Owner",
                text: "Great platform to manage my business. Easy to use interface!",
                rating: 5,
              },
              {
                name: "Ravi Patel",
                role: "First Time User",
                text: "Impressed with the speed and professionalism. Will use again!",
                rating: 4.5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div className="flex gap-1 mb-4">
                  {Array(Math.floor(testimonial.rating))
                    .fill(0)
                    .map((_, j) => (
                      <span key={j} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                </div>
                <p className="text-dark-muted mb-4 italic">"{testimonial.text}"</p>
                <h4 className="text-white font-bold">{testimonial.name}</h4>
                <p className="text-dark-muted text-sm">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card text-center py-12 border-primary/50 bg-gradient-to-r from-primary/5 to-secondary/5"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Clean?</h2>
            <p className="text-xl text-dark-muted mb-8">Join thousands of satisfied customers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary">
                Create Account
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
