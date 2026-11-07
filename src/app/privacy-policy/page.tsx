import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import PolicyPageLayout from '@/app/auto-parts/components/PolicyPageLayout'
import { autoPartsContact, companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Privacy Policy | ${companyInfo.legalName}`,
  description: `How ${companyInfo.legalName} collects, uses, and protects your personal information.`,
}

const PrivacyPolicyPage = () => {
  return (
    <AutoPartsShell>
      <PolicyPageLayout title="Privacy Policy">
        <p>
          <strong>Last updated:</strong>{' '}
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p>
          This Privacy Policy explains how <strong>{companyInfo.legalName}</strong> (&quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;) collects, uses, stores, and protects personal information when you visit our website, place an
          order, make a payment, or contact us. By using our website or services, you agree to the practices described
          in this policy.
        </p>

        <h2 className="h5 text-body mt-4">1. Who we are</h2>
        <p>
          We are an auto parts retailer operating in Zambia. Our shop is located at {autoPartsContact.address}. For
          privacy questions, contact us at{' '}
          <Link href={autoPartsContact.emailHref}>{autoPartsContact.email}</Link> or{' '}
          <Link href={autoPartsContact.phoneHref}>{autoPartsContact.phone}</Link>.
        </p>

        <h2 className="h5 text-body mt-4">2. Information we collect</h2>
        <p>We may collect the following information when you interact with us:</p>
        <ul>
          <li>
            <strong>Identity and contact details:</strong> name, phone number, email address, and delivery or collection
            address.
          </li>
          <li>
            <strong>Order details:</strong> products ordered, quantities, order references, fulfilment preferences
            (pickup or delivery), and notes you provide (for example vehicle make/model).
          </li>
          <li>
            <strong>Payment-related information:</strong> payment method selected, transaction status, transaction
            references, and amounts. We do not store full card numbers or CVV on our servers. Card and mobile money
            payments are processed by third-party payment providers.
          </li>
          <li>
            <strong>Technical data:</strong> browser type, device information, IP address, and general usage data that
            may be collected automatically when you browse our website.
          </li>
          <li>
            <strong>Communications:</strong> messages you send us by email, WhatsApp, phone, or contact forms.
          </li>
        </ul>

        <h2 className="h5 text-body mt-4">3. How we use your information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Process, confirm, and fulfil orders</li>
          <li>Process payments and verify transactions with payment providers</li>
          <li>Communicate about orders, stock, quotes, refunds, or cancellations</li>
          <li>Provide customer support and respond to enquiries</li>
          <li>Improve our website, products, and services</li>
          <li>Comply with legal, regulatory, accounting, and fraud-prevention obligations</li>
          <li>Protect our rights, customers, and business from misuse or security incidents</li>
        </ul>

        <h2 className="h5 text-body mt-4">4. Payments and third-party providers</h2>
        <p>
          Online payments on our website may be processed by third-party payment gateways such as{' '}
          <strong>Flutterwave</strong>, <strong>DPO Pay</strong>, <strong>Lenco</strong>, or other providers we enable
          from time to time. When you pay online, you may be redirected to the provider&apos;s secure payment page.
        </p>
        <p>
          Those providers process payment data under their own privacy policies and security standards. We receive
          limited information needed to confirm payment status (for example transaction reference, amount, currency, and
          success/failure status). Please review the privacy policy of the payment provider you use when completing a
          payment.
        </p>

        <h2 className="h5 text-body mt-4">5. Cookies and similar technologies</h2>
        <p>
          Our website may use cookies or local storage to keep your shopping cart, remember session preferences, and
          support login for authorised admin users. You can control cookies through your browser settings. Disabling
          cookies may affect checkout or cart features.
        </p>

        <h2 className="h5 text-body mt-4">6. Sharing of information</h2>
        <p>We do not sell your personal information. We may share information only when necessary with:</p>
        <ul>
          <li>Payment processors to complete and verify transactions</li>
          <li>Hosting and technical service providers that help us operate the website</li>
          <li>Delivery or logistics partners if you request delivery</li>
          <li>Professional advisers or authorities where required by law or to protect our legal rights</li>
        </ul>

        <h2 className="h5 text-body mt-4">7. Data retention</h2>
        <p>
          We keep personal information only as long as needed for the purposes above, including order history,
          accounting, dispute resolution, and legal compliance. When information is no longer required, we take
          reasonable steps to delete or anonymise it.
        </p>

        <h2 className="h5 text-body mt-4">8. Security</h2>
        <p>
          We take reasonable technical and organisational measures to protect personal information against unauthorised
          access, loss, misuse, or alteration. No method of transmission over the internet is completely secure; please
          use strong passwords for any accounts and keep your devices secure.
        </p>

        <h2 className="h5 text-body mt-4">9. Your rights</h2>
        <p>Subject to applicable Zambian law, you may request to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate or incomplete information</li>
          <li>Request deletion of information where we are not required to keep it</li>
          <li>Ask questions about how we process your data</li>
        </ul>
        <p>
          To make a request, contact us using the details in section 1. We may need to verify your identity before
          responding.
        </p>

        <h2 className="h5 text-body mt-4">10. Children</h2>
        <p>
          Our website and services are intended for adults and business customers purchasing auto parts. We do not
          knowingly collect personal information from children.
        </p>

        <h2 className="h5 text-body mt-4">11. International processing</h2>
        <p>
          Some service providers (including payment and hosting providers) may process data on servers outside Zambia.
          By using our website and payment services, you acknowledge that your information may be transferred and
          processed in those locations under the provider&apos;s safeguards.
        </p>

        <h2 className="h5 text-body mt-4">12. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The updated version will be posted on this page with a
          revised &quot;Last updated&quot; date. Continued use of our website after changes means you accept the updated
          policy.
        </p>

        <h2 className="h5 text-body mt-4">13. Contact</h2>
        <p>
          {companyInfo.legalName}
          <br />
          {autoPartsContact.address}
          <br />
          Email: <Link href={autoPartsContact.emailHref}>{autoPartsContact.email}</Link>
          <br />
          Phone: <Link href={autoPartsContact.phoneHref}>{autoPartsContact.phone}</Link>
          <br />
          WhatsApp:{' '}
          <Link href={autoPartsContact.whatsappHref} target="_blank" rel="noopener noreferrer">
            {autoPartsContact.whatsapp}
          </Link>
        </p>
      </PolicyPageLayout>
    </AutoPartsShell>
  )
}

export default PrivacyPolicyPage
