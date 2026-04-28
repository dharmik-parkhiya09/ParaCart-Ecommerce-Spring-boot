import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">ParaCart</h3>
            <p className="text-gray-300 text-sm">
              Your trusted online shopping destination for quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@paracart.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-6PM EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {currentYear} ParaCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
