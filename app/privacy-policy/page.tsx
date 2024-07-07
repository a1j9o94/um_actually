import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white text-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">1. Information We Collect</h2>
          <p>We collect minimal personal information necessary for the functioning of our service. This may include:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Information you provide when creating an account (if applicable)</li>
            <li>Usage data and analytics to improve our service</li>
            <li>Cookies for essential website functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Provide and improve our services</li>
            <li>Analyze usage patterns and optimize user experience</li>
            <li>Communicate with you about your account or our services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">3. Google Ads</h2>
          <p>We use Google Ads to support our service. Google may use cookies to personalize ads based on your browsing history. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">4. Your Choices</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Access, correct, or delete your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Disable cookies through your browser settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">5. Data Security</h2>
          <p>We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">6. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
        </section>

        <section className="mt-12 text-center">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <Link href="/" className="inline-block mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
            Back to Home
          </Link>
        </section>
      </div>
    </main>
  );
}
