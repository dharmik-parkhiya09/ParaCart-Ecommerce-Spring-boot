import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">About ParaCart</h1>

        <div className="prose prose-invert max-w-none">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              ParaCart was founded with a simple mission: to make online shopping
              easier, faster, and more enjoyable for everyone. We believe that quality
              products should be accessible to all, and we&apos;re committed to providing
              the best shopping experience possible.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-4 text-muted text-lg">
              <li>
                <strong>Quality First:</strong> We only offer products that meet our
                high standards for quality and durability.
              </li>
              <li>
                <strong>Customer Focus:</strong> Your satisfaction is our priority, and
                we work hard to exceed your expectations.
              </li>
              <li>
                <strong>Fast Shipping:</strong> We partner with reliable carriers to get
                your orders to you quickly.
              </li>
              <li>
                <strong>Transparent Pricing:</strong> No hidden fees or surprises. You
                know exactly what you&apos;re paying.
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Why Shop With Us?</h2>
            <p className="text-muted text-lg leading-relaxed mb-6">
              With years of experience in the e-commerce industry, ParaCart has
              established itself as a trusted destination for quality products. We offer:
            </p>
            <ul className="space-y-3 text-muted text-lg">
              <li>✓ Wide selection of high-quality products</li>
              <li>✓ Competitive prices and regular discounts</li>
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ 30-day return policy</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Secure payment processing</li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-muted text-lg leading-relaxed">
              Behind ParaCart is a team of passionate individuals dedicated to bringing
              you the best products and service. From product sourcing to customer
              support, everyone on our team is committed to your satisfaction.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-blue-700 transition-smooth"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
