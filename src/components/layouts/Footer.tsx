"use client";

import React from "react";
import { motion } from "motion/react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/common";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { colors } = useTheme();

  const footerLinks = {
    product: [
      { label: "Features", href: "/features" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Pricing", href: "/pricing" },
      { label: "API", href: "/api" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Help Center", href: "/help" },
      { label: "Community", href: "/community" },
      { label: "Status", href: "/status" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@example.com", label: "Email" },
  ];

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: colors.background,
        borderColor: colors.border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Logo showText={true} />
            <p
              className="mt-4 text-sm leading-6 max-w-xs"
              style={{ color: colors.text }}
            >
              Predict your content's viral potential with AI-powered analytics.
              Make data-driven decisions before you publish.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    color: colors.text,
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      colors.hoverBackground;
                    e.currentTarget.style.color = colors.hoverText;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = colors.text;
                  }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: colors.text }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.text;
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center"
          style={{ borderColor: colors.border }}
        >
          <p className="text-sm" style={{ color: colors.text }}>
            © 2024 Viral Predictor. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a
              href="/privacy"
              className="text-sm transition-colors"
              style={{ color: colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm transition-colors"
              style={{ color: colors.text }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.text;
              }}
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
