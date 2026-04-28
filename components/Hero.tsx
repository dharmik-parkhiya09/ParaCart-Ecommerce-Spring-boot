import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-gray-800 text-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Shop Quality Products at Great Prices
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-balance">
          Discover a wide selection of high-quality products with fast shipping and secure checkout.
          Your satisfaction is our priority.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="bg-accent hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-smooth"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="border-2 border-white hover:bg-white hover:text-primary text-white font-bold py-3 px-8 rounded-lg transition-smooth"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
