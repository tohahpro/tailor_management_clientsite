
import { FacebookIcon, InstagramIcon, LinkedinIcon, ScissorsIcon, TwitterIcon } from 'lucide-react'
import BrandLogo from './BrandLogo'
export function Footer() {
    return (
        <footer className="relative bg-linear-to-br from-[#8f43ec]/5 via-[#8545d3]/5 to-[#4e1e8a]/5 border-t border-white/20 pt-20 pb-10 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-75 h-75 bg-[#8f43ec]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-62.5 h-62.5 bg-[#4e1e8a]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-5 relative z-10">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left justify-between gap-10 pb-8">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 rounded-lg bg-linear-to-br from-[#8f43ec]/20 to-[#4e1e8a]/20">
                                <ScissorsIcon className="h-5 w-5 text-[#8f43ec]" />
                            </div>
                            <BrandLogo />
                        </div>

                        <p className="text-slate-600 mb-6 max-w-sm">
                            The elegant management platform designed exclusively for modern
                            tailors and bespoke clothing artisans.
                        </p>

                        {/* Socials */}
                        <div className="flex justify-center md:justify-start gap-4">
                            {[InstagramIcon, TwitterIcon, FacebookIcon, LinkedinIcon].map(
                                (Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-500 hover:text-white hover:bg-linear-to-r hover:from-[#8f43ec] hover:to-[#4e1e8a] transition-all duration-300 shadow-sm"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex-1 flex justify-end flex-wrap gap-8 text-sm text-center md:text-left">

                        <div className="flex-1">
                            <h4 className="font-semibold text-black mb-3">Product</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li className="hover:text-[#8f43ec] cursor-pointer">Features</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Pricing</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Updates</li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <h4 className="font-semibold text-black mb-3">Company</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li className="hover:text-[#8f43ec] cursor-pointer">About</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Contact</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Careers</li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <h4 className="font-semibold text-black mb-3">Support</h4>
                            <ul className="space-y-2 text-slate-600">
                                <li className="hover:text-[#8f43ec] cursor-pointer">Help Center</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Terms</li>
                                <li className="hover:text-[#8f43ec] cursor-pointer">Privacy</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-slate-500 flex flex-col md:flex-row md:justify-between text-center">
                    <span>© {new Date().getFullYear()} TailorDesk. All rights reserved.</span>

                    <span>Built by <span className="text-black font-medium">Toha Hossain</span> •
                        <a href="mailto:tohahpro@email.com" className="text-[#8f43ec] hover:underline ml-1">
                            tohahpro@email.com
                        </a></span>
                </div>
            </div>
        </footer>
    )
}
