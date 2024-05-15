export default function Page() {
  return (
    <div>
      <div className="mb-4">
        <div className="text-h1 mb-2">Terms of Use</div>
        <div className="text-lg">
          Welcome to CaCart. We’re delighted to have you here. Please make
          yourself comfortable and enjoy your time. <br />
          By accessing or using our website and services, you agree to comply
          with and be bound by these Terms of Use. If you do not agree to these
          terms, please do not use our services.
        </div>
      </div>
      <br />

      <div className="space-y-4">
        <div>
          <span className="font-bold text-lg">1. Eligibility</span>
          <p>
            You must be at least 18 years old and capable of entering into a
            legally binding contract to use our services. By using CaCart, you
            represent and warrant that you meet these eligibility requirements.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">2. User Accounts</span>
          <p>
            To access certain features, you may need to create an account. You
            are responsible for maintaining the confidentiality of your account
            information and for all activities that occur under your account.
            Please notify us immediately if you suspect any unauthorized use of
            your account.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">3. User Content</span>
          <p>
            You retain ownership of any content you post on CaCart, but you
            grant us a worldwide, non-exclusive, royalty-free license to use,
            display, reproduce, and distribute your content in connection with
            our services. You are solely responsible for the content you post
            and must ensure it does not violate any laws or infringe the rights
            of others.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">4. Prohibited Activities</span>
          <p>You agree not to engage in any activities that:</p>
          <ul className="list-disc ml-6">
            <li>Violate any laws or regulations</li>
            <li>
              Infringe on the intellectual property or privacy rights of others
            </li>
            <li>Are fraudulent, deceptive, or misleading</li>
            <li>Harm or exploit minors</li>
            <li>
              Disrupt or interfere with the security or functionality of our
              services
            </li>
          </ul>
        </div>
        <div>
          <span className="font-bold text-lg">5. Termination</span>
          <p>
            We reserve the right to suspend or terminate your account at any
            time, without notice, if we believe you have violated these Terms of
            Use or engaged in any prohibited activities. You may also terminate
            your account at any time by contacting us.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">6. Limitation of Liability</span>
          <p>
            CaCart is provided &quot;as is&quot; and &quot;as available&quot;
            without any warranties of any kind. We are not liable for any
            damages arising from your use of our services, including but not
            limited to direct, indirect, incidental, or consequential damages.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">7. Changes to Terms</span>
          <p>
            We may update these Terms of Use from time to time. Any changes will
            be posted on this page, and your continued use of CaCart after such
            changes constitutes your acceptance of the new terms.
          </p>
        </div>
        <div>
          <span className="font-bold text-lg">8. Contact Us</span>
          <p>
            If you have any questions or concerns about these Terms of Use,
            please contact us at{" "}
            <a href="mailto:support@cacart.com" className="underline">
              support@cacart.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
