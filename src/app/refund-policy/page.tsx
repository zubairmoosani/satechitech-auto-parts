import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import PolicyPageLayout from '@/app/auto-parts/components/PolicyPageLayout'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Refund Policy | ${companyInfo.legalName}`,
  description: `Refund policy for online and in-store purchases at ${companyInfo.legalName}.`,
}

const RefundPolicyPage = () => {
  return (
    <AutoPartsShell>
      <PolicyPageLayout title="Refund Policy">
        <p>
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p>
          This Refund Policy applies to purchases made from {companyInfo.legalName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) through our
          website, in-store at Mansa, Zambia, or by phone/WhatsApp enquiry.
        </p>

        <h2 className="h5 text-body mt-4">1. Eligibility for refunds</h2>
        <p>
          We will consider a refund or replacement when:
        </p>
        <ul>
          <li>The part is faulty, damaged, or not as described at the time of sale.</li>
          <li>The wrong item was supplied and cannot be exchanged for the correct part.</li>
          <li>An online payment was charged in error or duplicated (subject to verification with our payment provider).</li>
        </ul>
        <p>
          Refunds are generally not provided for change-of-mind purchases, incorrect orders placed by the customer, or
          parts that have been fitted, used, or modified unless required by applicable consumer law.
        </p>

        <h2 className="h5 text-body mt-4">2. Timeframe</h2>
        <p>
          Please contact us within <strong>7 calendar days</strong> of receiving your order (or within 7 days of collection
          for in-store sales) to report an issue. Items must be returned in original packaging where possible, with proof
          of purchase (order number, receipt, or payment confirmation).
        </p>

        <h2 className="h5 text-body mt-4">3. Online card and mobile money payments</h2>
        <p>
          If you paid online via DPO Pay, Flutterwave, Lenco, or another approved gateway, approved refunds will be
          processed back to the original payment method where possible. Processing times depend on your bank or mobile
          money provider and may take <strong>5–14 business days</strong> after we approve the refund.
        </p>

        <h2 className="h5 text-body mt-4">4. How to request a refund</h2>
        <p>Contact us with your order reference, name, phone number, and reason for the request:</p>
        <ul>
          <li>WhatsApp or phone (see footer contact details)</li>
          <li>Email: Stanmubanga38@gmail.com</li>
          <li>Visit our shop: 41648 1/Shop E G JIMBARA MALL, MANSA</li>
        </ul>
        <p>We may ask for photos of the product and packaging to assess your claim.</p>

        <h2 className="h5 text-body mt-4">5. Exchanges</h2>
        <p>
          Where stock allows, we may offer an exchange for the correct part instead of a refund. Any price difference
          will be charged or credited accordingly.
        </p>

        <h2 className="h5 text-body mt-4">6. Changes to this policy</h2>
        <p>
          We may update this Refund Policy from time to time. The version published on this website applies to orders
          placed after the &quot;Last updated&quot; date above.
        </p>
      </PolicyPageLayout>
    </AutoPartsShell>
  )
}

export default RefundPolicyPage
