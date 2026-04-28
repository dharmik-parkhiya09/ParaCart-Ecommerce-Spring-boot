'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[v0] Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Get in Touch</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-muted">support@paracart.com</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold mb-2">Phone</h3>
              <p className="text-muted">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🕐</div>
              <h3 className="font-bold mb-2">Hours</h3>
              <p className="text-muted">Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
              ✓ Thank you for your message! We&apos;ll get back to you soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-secondary rounded-lg p-8 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-semibold mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="">Select a subject</option>
                <option value="product-inquiry">Product Inquiry</option>
                <option value="order-support">Order Support</option>
                <option value="return-refund">Return/Refund</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-gray-800 transition-smooth"
            >
              Send Message
            </button>
          </form>

          <p className="text-center text-muted mt-8">
            We typically respond within 24 hours during business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
