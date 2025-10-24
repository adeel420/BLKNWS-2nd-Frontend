import React from "react";
import Header from "../components/Header";

const Privacy_Policy = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-balance text-3xl font-semibold tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-4 text-gray-400 italic">
          {"Last Updated: October 16, 2025"}
        </p>

        <p className="mt-8">
          {
            "BLKNWS (“we,” “us,” or “our”) values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect information when you visit our website, RSVP to events, or engage with our digital content."
          }
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"1. Information We Collect"}
        </h2>
        <p className="mt-4">
          {"We may collect the following types of information:"}
        </p>
        <ul className="mt-4 list-disc pl-6">
          <li>
            {
              "Personal Information: Your name, email address, location, or other details submitted through RSVP or contact forms."
            }
          </li>
          <li>
            {
              "Usage Data: Information such as IP address, browser type, device information, and pages visited."
            }
          </li>
          <li>
            {
              "Cookies & Tracking: We may use cookies or similar technologies to analyze website traffic and enhance performance."
            }
          </li>
        </ul>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"2. How We Use Your Information"}
        </h2>
        <p className="mt-4">{"We use your information to:"}</p>
        <ul className="mt-4 list-disc pl-6">
          <li>{"Process and confirm event RSVPs or submissions."}</li>
          <li>
            {"Send updates and communications related to BLKNWS programming."}
          </li>
          <li>{"Improve and personalize your experience on our website."}</li>
          <li>
            {"Ensure the security and functionality of our digital platforms."}
          </li>
        </ul>
        <p className="mt-4">
          {"We do not sell or rent personal information to third parties."}
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"3. How We Share Information"}
        </h2>
        <p className="mt-4">{"We may share information with:"}</p>
        <ul className="mt-4 list-disc pl-6">
          <li>
            {
              "Service Providers: For example, Brevo (email communication), hosting providers, and technical partners that help us operate the website."
            }
          </li>
          <li>
            {
              "Legal Compliance: If required by law or to protect the rights, property, or safety of BLKNWS and its users."
            }
          </li>
        </ul>
        <p className="mt-4">
          {
            "All third-party partners are required to handle data in compliance with privacy laws and only for the purpose of providing contracted services."
          }
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"4. Data Retention"}
        </h2>
        <p className="mt-4">
          {
            "We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law. You may request deletion of your personal information at any time."
          }
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"5. Your Rights"}
        </h2>
        <p className="mt-4">{"You have the right to:"}</p>
        <ul className="mt-4 list-disc pl-6">
          <li>{"Access or request a copy of your personal information."}</li>
          <li>{"Request correction or deletion of your information."}</li>
          <li>{"Withdraw consent for communications or data processing."}</li>
        </ul>
        <p className="mt-4">
          {"To exercise these rights, contact us at "}
          <a href="mailto:studio@richspirit.com" className="underline">
            {"studio@richspirit.com"}
          </a>
          {"."}
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"6. Data Security"}
        </h2>
        <p className="mt-4">
          {
            "We implement appropriate technical and organizational measures to safeguard your information from unauthorized access, loss, or misuse."
          }
        </p>

        {/* <p className="mt-8">{"⸻"}</p> */}

        <h2 className="mt-8 text-2xl font-semibold tracking-tight">
          {"7. Updates to This Policy"}
        </h2>
        <p className="mt-4">
          {
            "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date."
          }
        </p>
      </div>
    </main>
  );
};

export default Privacy_Policy;
