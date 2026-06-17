'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  arabicLabel: string;
  href: string;
  icon: React.ReactNode;
}

const PortalNavigation: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Teacher Icon SVG
  const TeacherIcon = () => (
    <svg
      className="w-8 h-8 lg:w-10 lg:h-10"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-9c1.66 0 2.99-1.34 2.99-3S17.66 4 16 4c-1.66 0-3 1.34-3 3s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );

  // Student Icon SVG
  const StudentIcon = () => (
    <svg
      className="w-8 h-8 lg:w-10 lg:h-10"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L1 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-11-5zm7 10.99h-5v5h-4v-5H5V11h5V6h4v5h5v1.99z" />
    </svg>
  );

  // Information Center Icon SVG
  const InfoIcon = () => (
    <svg
      className="w-8 h-8 lg:w-10 lg:h-10"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  );

  // Logo/Emblem Icon SVG (Golden)
  const LogoIcon = () => (
    <svg
      className="w-12 h-12 lg:w-14 lg:h-14"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L6.5 7V12C6.5 16.41 9.15 20.31 12 22.77C14.85 20.31 17.5 16.41 17.5 12V7L12 2M12 4.18L15.5 7.18V12C15.5 14.76 14.09 17.19 12 18.88C9.91 17.19 8.5 14.76 8.5 12V7.18L12 4.18Z" />
    </svg>
  );

  const navigationItems: NavItem[] = [
    {
      label: 'Teachers',
      arabicLabel: 'المعلمين',
      href: '/teachers',
      icon: <TeacherIcon />,
    },
    {
      label: 'Students',
      arabicLabel: 'الطلاب',
      href: '/students',
      icon: <StudentIcon />,
    },
  ];

  const NavItemComponent: React.FC<{ item: NavItem; index: number }> = ({ item, index }) => (
    <Link href={item.href}>
      <div className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
        {/* Text Container */}
        <div className="text-center mb-4 lg:mb-5">
          <p className="text-white text-sm lg:text-base font-bold mb-1 tracking-wide transition-colors duration-300 group-hover:text-yellow-200">
            {item.arabicLabel}
          </p>
          <p className="text-yellow-300 text-xs lg:text-sm font-medium transition-colors duration-300 group-hover:text-yellow-100">
            {item.label}
          </p>
        </div>

        {/* Icon Container with Advanced Effects */}
        <div className="relative">
          {/* Animated background circles */}
          <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-75 group-hover:scale-100 -z-10"></div>
          <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500 scale-90 group-hover:scale-110 -z-10"></div>

          {/* Main Icon Circle */}
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:from-yellow-200 group-hover:to-yellow-300 transform">
            <span className="text-[#1e3d7b] transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8a9bc4] via-[#9aabcc] to-[#a8afd4] flex items-center justify-center p-3 sm:p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-52 h-52 bg-blue-400 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Main Card Container with Animation */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 animate-fade-in">
        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[650px]">
          {/* Left Column - Showcase Image (65%) */}
          <div className="w-full lg:w-[65%] h-72 lg:h-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative group">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop"
              alt="Building Showcase"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
          </div>

          {/* Right Column - Navigation Panel (35%) */}
          <div className="w-full lg:w-[35%] bg-gradient-to-b from-[#1e3d7b] to-[#162d5e] flex flex-col items-center justify-center px-6 sm:px-8 py-12 lg:py-0 relative overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-300 rounded-full blur-2xl"></div>
            </div>

            {/* Content wrapper */}
            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Logo Section - Animated */}
              <div className="mb-10 lg:mb-12 transform transition-all duration-500 animate-fade-in-up">
                <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-110 group-hover:from-yellow-200 group-hover:to-yellow-300 relative">
                  {/* Rotating border effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-yellow-600 border-r-yellow-600 opacity-20 animate-spin-slow"></div>
                  <span className="text-[#1e3d7b] relative z-10">
                    <LogoIcon />
                  </span>
                </div>
              </div>

              {/* Navigation Grid - Staggered Animation */}
              <nav className="w-full" dir="rtl">
                <div className="grid grid-cols-2 gap-6 lg:gap-8 mb-10 lg:mb-12">
                  {navigationItems.map((item, index) => (
                    <div
                      key={index}
                      className="transform transition-all duration-500 animate-fade-in"
                      style={{
                        animationDelay: `${(index + 1) * 100}ms`,
                      }}
                    >
                      <NavItemComponent item={item} index={index} />
                    </div>
                  ))}
                </div>

                {/* Bottom Centered Navigation Item */}
                <div className="flex justify-center transform transition-all duration-500 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <Link href="/information">
                    <div className="flex flex-col items-center group cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
                      {/* Text */}
                      <div className="text-center mb-4 lg:mb-5">
                        <p className="text-white text-sm lg:text-base font-bold mb-1 tracking-wide transition-colors duration-300 group-hover:text-yellow-200">
                          مركز المعلومات
                        </p>
                        <p className="text-yellow-300 text-xs lg:text-sm font-medium transition-colors duration-300 group-hover:text-yellow-100">
                          Information Center
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-75 group-hover:scale-100 -z-10"></div>
                        <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500 scale-90 group-hover:scale-110 -z-10"></div>

                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-400 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:from-yellow-200 group-hover:to-yellow-300 transform">
                          <span className="text-[#1e3d7b] transition-transform duration-300 group-hover:scale-110">
                            <InfoIcon />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        /* Smooth page transitions */
        @supports (animation-timeline: view()) {
          .animate-fade-in {
            animation-timeline: view();
          }
        }
      `}</style>
    </div>
  );
};

export default PortalNavigation;
