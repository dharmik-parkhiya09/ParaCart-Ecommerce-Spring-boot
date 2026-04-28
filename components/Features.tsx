export default function Features() {
  const features = [
    {
      icon: '🚚',
      title: 'Fast Shipping',
      description: 'Get your orders delivered quickly to your doorstep',
    },
    {
      icon: '🔒',
      title: 'Secure Checkout',
      description: 'Safe and encrypted payment processing',
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day return policy for your peace of mind',
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our team is here to help anytime',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
          Why Choose ParaCart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
