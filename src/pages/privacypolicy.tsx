import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivacyPolicy() {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        {user && (
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Timer
          </Link>
        )}
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p className="text-gray-700">
            Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://countdownapp.com" className="text-blue-500 hover:underline">https://countdownapp.com</a>, and other sites we own and operate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700">
            We only collect information about you if we have a reason to do so – for example, to provide our services, to communicate with you, or to make our services better.
          </p>
          <p className="text-gray-700">
            We collect information in three ways: if and when you provide information to us, automatically through operating our services, and from outside sources.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <p className="text-gray-700">
            We use the information we collect in various ways, including to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Process your transactions</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Log Files</h2>
          <p className="text-gray-700">
            CountdownApp follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies and Web Beacons</h2>
          <p className="text-gray-700">
            Like any other website, CountdownApp uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Google DoubleClick DART Cookie</h2>
          <p className="text-gray-700">
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Advertising Partners</h2>
          <p className="text-gray-700">
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>
              <p>Google</p>
              <a href="https://policies.google.com/technologies/ads" className="text-blue-500 hover:underline">https://policies.google.com/technologies/ads</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third Party Privacy Policies</h2>
          <p className="text-gray-700">
            CountdownApp's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p className="text-gray-700">
            Under the CCPA, among other rights, California consumers have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
          <p className="text-gray-700">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">GDPR Data Protection Rights</h2>
          <p className="text-gray-700">
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
          </p>
          <ul className="list-disc list-inside text-gray-700">
            <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p className="text-gray-700">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Children's Information</h2>
          <p className="text-gray-700">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p className="text-gray-700">
            CountdownApp does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </section>
      </div>
    </div>
  );
}