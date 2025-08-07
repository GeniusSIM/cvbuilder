import Link from "next/link"
import { Heart, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-teal-500 fill-current" />
              <span className="text-xl font-semibold">Enhancv</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Build a resume that gets you hired at top companies. Professional templates and expert guidance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Resume Builder</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Resume Templates</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Cover Letter Builder</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Resume Checker</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Career Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Resume Examples</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Career Advice</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Interview Tips</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Enhancv. All rights reserved. Built with ❤️ for job seekers worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
