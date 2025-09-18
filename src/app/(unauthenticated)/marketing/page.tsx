"use client";

import { motion } from "motion/react";
import { ArrowRight, Play, Star, Users, Shield, Zap } from "lucide-react";
import Link from "next/link";

const MarketingPage = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Predictions",
      description:
        "Advanced machine learning algorithms predict content performance before you publish",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Audience Insights",
      description:
        "Deep understanding of your target audience behavior and preferences",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Real-time Analytics",
      description:
        "Monitor and optimize your content performance with live data insights",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator, 2M followers",
      content:
        "This platform helped me predict which posts would go viral. My engagement increased by 300%!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Director",
      content:
        "The AI predictions are incredibly accurate. We've saved thousands on failed campaigns.",
      rating: 5,
    },
  ];

  // 3D Floating shapes component
  const FloatingShapes = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple Sphere */}
      <motion.div
        className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-80"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
          boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)",
        }}
      />

      {/* Teal Cylinder */}
      <motion.div
        className="absolute top-40 right-80 w-16 h-48 opacity-90"
        animate={{
          y: [0, 15, 0],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(180deg, #14b8a6 0%, #0d9488 100%)",
          borderRadius: "8px",
          boxShadow: "0 25px 50px rgba(20, 184, 166, 0.4)",
          transform: "perspective(1000px) rotateX(15deg)",
        }}
      />

      {/* Orange Cube */}
      <motion.div
        className="absolute bottom-40 right-40 w-24 h-24 opacity-85"
        animate={{
          y: [0, -25, 0],
          rotateX: [0, 360],
          rotateZ: [0, 180],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(249, 115, 22, 0.4)",
          transform: "perspective(1000px) rotateY(25deg)",
        }}
      />

      {/* Purple Rectangular Prism */}
      <motion.div
        className="absolute bottom-20 right-20 w-20 h-40 opacity-80"
        animate={{
          y: [0, -30, 0],
          rotateY: [0, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)",
          borderRadius: "10px",
          boxShadow: "0 30px 60px rgba(139, 92, 246, 0.4)",
          transform: "perspective(1000px) rotateX(-10deg)",
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center">
        {/* Floating 3D Shapes */}
        <FloatingShapes />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
              >
                Imagine seeing your content go{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  viral
                </span>{" "}
                before you launch it
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
              >
                Predict content performance with AI-powered analytics. Test,
                optimize, and launch with confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href="/login"
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button className="inline-flex items-center px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </motion.div>
            </div>

            {/* Right Content - Video Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 shadow-2xl border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-slate-900/50 rounded-xl flex items-center justify-center border border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play className="w-8 h-8 text-slate-900 ml-1" />
                  </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500 rounded-full opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full opacity-60" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Advanced AI-powered features to predict and optimize your content
              performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center p-6 rounded-lg border border-white/10 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-700/50 p-6 rounded-lg border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to predict your viral content?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust our AI-powered predictions
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MarketingPage;
