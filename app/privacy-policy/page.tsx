"use client";

import Header from "../components/Header";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import LeadPopup from "../components/LeadPopup";
import WhatsAppPopup from "../components/WhatsAppPopup";
import CallNowButton from "../components/CallNowButton";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fcfbf9]" data-header-theme="light">
      <Header />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-[#DEC79A]/10">
          <div className="mb-8 border-b border-[#DEC79A]/30 pb-4">
            <h1 className="text-4xl md:text-5xl font-serif text-[#15243D] mb-2">
              Privacy Policy
            </h1>
            <p className="text-[#D8AE51] font-medium">Effective Date: 24 - 04 - 2026</p>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <p>
              Welcome to Presidential Park (<a href="https://www.presidentialpark.in/" target="_blank" rel="noopener noreferrer" className="text-[#D8AE51] hover:underline">https://www.presidentialpark.in/</a>). This Privacy Policy outlines how Oneness Realtors, our strategic partners (including Falcon Realty), and our affiliates ("we," "our," or "us") collect, use, protect, and disclose your personal information when you visit our website and use our services.
            </p>
            <p>
              By accessing or using our website, you consent to the data practices described in this Privacy Policy.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">1. Information We Collect</h2>
              <p>We collect information to provide better services to our users and to help you find your ideal property.</p>
              
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-[#15243D] mb-2 font-semibold">A. Information You Provide to Us</h3>
                  <p className="mb-3">When you fill out an inquiry form, request a brochure, or schedule a site visit on our website, we collect the following personal information:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Full Name</li>
                    <li>Email Address</li>
                    <li>Mobile Number</li>
                    <li>Property Preferences (e.g., Tentative Budget)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-[#15243D] mb-2 font-semibold">B. Automatically Collected Information</h3>
                  <p className="mb-3">When you visit our website, we may automatically collect certain technical data to improve your browsing experience. This may include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Device Information:</strong> IP address, browser type, operating system, and device type.</li>
                    <li><strong>Usage Data:</strong> Pages viewed, time spent on the site, links clicked, and referring website addresses.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to analyze site traffic, remember your preferences, and deliver targeted advertisements.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for the following business and commercial purposes:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>To Respond to Inquiries:</strong> To contact you via phone, SMS, WhatsApp, or email regarding your interest in Presidential Park NA plots.</li>
                <li><strong>To Provide Services:</strong> To schedule site visits, share project brochures, and provide updates regarding pricing, RERA details, and construction progress.</li>
                <li><strong>Marketing and Promotions:</strong> To send you promotional materials, newsletters, and special offers related to Presidential Park and related real estate projects by Oneness Realtors or Falcon Realty.</li>
                <li><strong>To Improve Our Website:</strong> To analyze user behavior and enhance the functionality, design, and user experience of our website.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">3. Information Sharing and Disclosure</h2>
              <p className="mb-4">We respect your privacy and do not sell your personal data to third parties. However, we may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Internal Teams and Partners:</strong> With our sales team, CRM systems, and strategic partners (e.g., Falcon Realty) solely for the purpose of assisting you with your property inquiry.</li>
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting marketing campaigns, or managing customer communications.</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or government regulation, we may disclose your information to comply with legal processes or protect our rights, property, and safety.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">4. Data Security</h2>
              <p>
                We implement reasonable technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services (e.g., Google Maps for directions). We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any external sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">6. Your Rights and Choices</h2>
              <p className="mb-4">You have the right to control your personal data. You may:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Opt-Out of Marketing:</strong> You can opt out of receiving promotional emails, SMS, or WhatsApp messages from us at any time by following the unsubscribe instructions included in those messages or by contacting us directly.</li>
                <li><strong>Request Data Update/Deletion:</strong> You can request that we update, correct, or delete your personal information from our database by contacting us using the details provided below.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">7. Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated "Effective Date." We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#15243D] mb-4">8. Contact Us</h2>
              <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please contact us at:</p>
              <div className="p-6 bg-[#15243D]/5 rounded-2xl border border-[#DEC79A]/20 space-y-2">
                <p><span className="font-bold text-[#15243D]">Project By:</span> Oneness Realtors</p>
                <p><span className="font-bold text-[#15243D]">Strategic Partner:</span> Falcon Realty</p>
                <p><span className="font-bold text-[#15243D]">Address:</span> Opp. Pimpri Chinchwad University, Talegaon, Maharashtra 412 106.</p>
                <p><span className="font-bold text-[#15243D]">Phone:</span> +91 9975211184</p>
                <p><span className="font-bold text-[#15243D]">Email:</span> info@falconrealty.co.in</p>
              </div>
            </section>
          </div>
        </section>
      </main>

      <Partners />
      <Footer />
      <LeadPopup />
      <WhatsAppPopup />
      <CallNowButton />
      <ScrollToTop />
    </div>
  );
}
