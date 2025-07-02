import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import dynamic from "next/dynamic";

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

const Footer7 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "EduHub",
  },
  sections = defaultSections,
  description = "A collection of components for your startup business or side project.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2025 .com. All rights reserved.",
  legalLinks = defaultLegalLinks,
  // New content props
  newsletter = {
    title: "Subscribe to our newsletter",
    description: "Get the latest updates and offers directly in your inbox.",
    placeholder: "Enter your email",
    buttonText: "Subscribe"
  },
  contact = {
    title: "Contact Info",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business St, Suite 100, City, State 12345"
  }
}) => {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex w-full flex-col gap-12 lg:gap-16 xl:gap-20">
          
          {/* Top Section - Logo and Description */}
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-8 lg:gap-12">
            <div className="flex flex-col items-center lg:items-start gap-6 max-w-lg">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <a href={logo.url} className="hover:opacity-80 transition-opacity">
                  <img src={logo.src} alt={logo.alt} title={logo.title} className="h-6 sm:h-8" />
                </a>
                <h2 className="text-lg sm:text-xl font-semibold text-white">{logo.title}</h2>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {description}
              </p>
              {/* Social Links */}
              <ul className="flex items-center space-x-4 sm:space-x-6">
                {socialLinks.map((social, idx) => (
                  <li key={idx}>
                    <a 
                      href={social.href} 
                      aria-label={social.label}
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-110 hover:underline decoration-2 underline-offset-4"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section - Mobile/Tablet Repositioned */}
            {/* {newsletter && (
              <div className="w-full max-w-md lg:max-w-sm xl:max-w-md">
                <h3 className="text-base sm:text-lg font-bold text-white mb-3">{newsletter.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{newsletter.description}</p>
                <div className="flex flex-col gap-3 sm:gap-2">
                  <input
                    type="email"
                    placeholder={newsletter.placeholder}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-300 hover:shadow-lg transform hover:scale-105">
                    {newsletter.buttonText}
                  </button>
                </div>
              </div>
            )} */}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="text-center sm:text-left">
                <h3 className="mb-4 sm:mb-6 font-bold text-white text-sm sm:text-base">{section.title}</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-blue-400 font-medium text-sm sm:text-base transition-all duration-300 hover:underline decoration-2 underline-offset-4 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Contact Information */}
            {contact && (
              <div className="text-center sm:text-left md:col-span-1">
                <h3 className="mb-4 sm:mb-6 font-bold text-white text-sm sm:text-base">{contact.title || "Contact"}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {contact.email && (
                    <div>
                      <p className="font-medium text-gray-200 text-xs sm:text-sm mb-1">Email:</p>
                      <a 
                        href={`mailto:${contact.email}`} 
                        className="text-gray-300 hover:text-blue-400 text-sm sm:text-base transition-all duration-300 hover:underline decoration-2 underline-offset-4 inline-block break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div>
                      <p className="font-medium text-gray-200 text-xs sm:text-sm mb-1">Phone:</p>
                      <a 
                        href={`tel:${contact.phone}`} 
                        className="text-gray-300 hover:text-blue-400 text-sm sm:text-base transition-all duration-300 hover:underline decoration-2 underline-offset-4 inline-block"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <p className="font-medium text-gray-200 text-xs sm:text-sm mb-1">Address:</p>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{contact.address}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Copyright and Legal */}
        {/* <div className="mt-12 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between md:items-center">
            <p className="text-gray-400 text-xs sm:text-sm font-medium text-center md:text-left order-2 md:order-1">
              {copyright}
            </p>
            <ul className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 md:gap-6 order-1 md:order-2">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 text-xs sm:text-sm font-medium transition-all duration-300 hover:underline decoration-2 underline-offset-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export { Footer7 };