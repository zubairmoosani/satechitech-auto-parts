import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import PolicyPageLayout from '@/app/auto-parts/components/PolicyPageLayout'
import { companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Cancellation Policy | ${companyInfo.legalName}`,
  description: `Order cancellation policy for ${companyInfo.legalName} online and in-store purchases.`,
}

const CancellationPolicyPage = () => {
  return (
    <AutoPartsShell>
      <PolicyPageLayout title="Cancellation Policy">
        <p>
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p>
          This Cancellation Policy explains how you may cancel an order with {companyInfo.legalName} before or after
          payment, including orders placed on our website.
        </p>

        <h2 className="h5 text-body mt-4">1. Before payment is completed</h2>
        <p>
          If you have not yet completed payment on our checkout page (DPO Pay, Flutterwave, Lenco, or other methods), you
          may simply close the payment window or leave checkout. Your cart items will remain saved unless you clear your
          browser data. No charge applies until payment is successfully confirmed.
        </p>

        <h2 className="h5 text-body mt-4">2. After payment — before dispatch or collection</h2>
        <p>
          Contact us as soon as possible with your <strong>order number</strong> if you wish to cancel:
        </p>
        <ul>
          <li>WhatsApp or phone (see footer)</li>
          <li>Email: Stanmubanga38@gmail.com</li>
          <li>In person at our Mansa shop during business hours (Mon–Sat: 8:00 – 17:30)</li>
        </ul>
        <p>
          If we have not yet prepared or released your order, we will cancel it and initiate a refund to your original
          payment method where applicable. If parts have already been picked, packed, or ordered from a supplier
          specifically for you, we may charge a restocking fee or offer store credit instead of a full refund.
        </p>

        <h2 className="h5 text-body mt-4">3. After dispatch or collection</h2>
        <p>
          Once you have collected your order or it has been dispatched for delivery, cancellation is treated as a return.
          Please refer to our <Link href="/refund-policy">Refund Policy</Link> for faulty or incorrect items.
        </p>

        <h2 className="h5 text-body mt-4">4. Payment pending or failed</h2>
        <p>
          If your payment shows as pending or failed on the payment provider&apos;s page, your order is not complete. You
          may return to checkout and try again, or contact us for assistance. We do not fulfil orders until payment is
          verified as successful.
        </p>

        <h2 className="h5 text-body mt-4">5. Our right to cancel</h2>
        <p>
          We may cancel an order if a product is out of stock, pricing was displayed in error, we suspect fraud, or we
          cannot reach you to confirm details. If payment was taken, a full refund will be issued.
        </p>

        <h2 className="h5 text-body mt-4">6. Changes to this policy</h2>
        <p>
          We may update this Cancellation Policy from time to time. The version on this website applies to orders placed
          after the &quot;Last updated&quot; date above.
        </p>
      </PolicyPageLayout>
    </AutoPartsShell>
  )
}

export default CancellationPolicyPage
