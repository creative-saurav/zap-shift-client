import React from 'react';
import Logo from '../../../components/Logo/Logo';

const Footer = () => {
    return (
        <footer className=" mt-6 mb-6 bg-secondary rounded-3xl px-8 py-12">
            <div className="flex flex-col items-center text-center">

                {/* Logo */}
                <div className="mb-4">
                    <Logo></Logo>
                </div>

                {/* Tagline */}
                <p className="text-gray-400 text-sm max-w-lg mb-8">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                    From personal packages to business shipments — we deliver on time, every time.
                </p>

                {/* Top divider */}
                <div className="w-full border-t border-dashed border-gray-700 mb-6"></div>

                {/* Nav links */}
                <ul className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-sm mb-6">
                    <li><a href="#" className="hover:text-white transition">Services</a></li>
                    <li><a href="#" className="hover:text-white transition">Coverage</a></li>
                    <li><a href="#" className="hover:text-white transition">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact</a></li>
                </ul>

                {/* Bottom divider */}
                <div className="w-full border-t border-dashed border-gray-700 mb-6"></div>

                {/* Social icons */}
                <div className="flex items-center gap-3">
                    <a href="#" aria-label="LinkedIn"
                       className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.56V9h3.554v11.452z"/>
                        </svg>
                    </a>

                    <a href="#" aria-label="X"
                       className="w-8 h-8 rounded-full bg-black border border-gray-700 flex items-center justify-center hover:opacity-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>

                    <a href="#" aria-label="Facebook"
                       className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z"/>
                        </svg>
                    </a>

                    <a href="#" aria-label="YouTube"
                       className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-90 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z"/>
                        </svg>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;