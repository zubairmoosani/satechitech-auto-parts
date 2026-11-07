import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import PolicyPageLayout from '@/app/auto-parts/components/PolicyPageLayout'
import { autoPartsContact, companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `Terms & Conditions | ${companyInfo.legalName}`,
  description: `Terms and conditions for using the ${companyInfo.legalName} website and purchasing auto parts.`,
}

const TermsPage = () => {
  return (
    <AutoPartsShell>
      <PolicyPageLayout title="Terms & Conditions">
        <p>
          <strong>Last updated:</strong>{' '}
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the website and services of{' '}
          <strong>{companyInfo.legalName}</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), including browsing
          products, placing orders, and making payments. By accessing our website or placing an order, you agree to
          these Terms.
        </p>
        <p>
          If you do not agree, please do not use our website or complete a purchase. Please also read our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>, <Link href="/refund-policy">Refund Policy</Link>, and{' '}
          <Link href="/cancellation-policy">Cancellation Policy</Link>.
        </p>

        <h2 className="h5 text-body mt-4">1. About us</h2>
        <p>
          {companyInfo.legalName} sells automotive parts and related accessories from our premises at{' '}
          {autoPartsContact.address}, Zambia, and through our online store. Contact:{' '}
          <Link href={autoPartsContact.emailHref}>{autoPartsContact.email}</Link> |{' '}
          <Link href={autoPartsContact.phoneHref}>{autoPartsContact.phone}</Link>.
        </p>

        <h2 className="h5 text-body mt-4">2. Eligibility</h2>
        <p>
          You must be able to form a legally binding contract under applicable Zambian law to place an order. By
          ordering, you confirm that the information you provide is accurate and complete.
        </p>

        <h2 className="h5 text-body mt-4">3. Products and descriptions</h2>
        <ul>
          <li>
            Product images, names, and descriptions on the website are for information. Minor differences may occur.
          </li>
          <li>Prices are shown in Zambian Kwacha (ZMW) unless otherwise stated.</li>
          <li>
            Stock and prices may change without notice. We may contact you to confirm availability or pricing before
            fulfilment.
          </li>
          <li>
            You are responsible for confirming that a part fits your vehicle (make, model, year, and relevant
            specifications). Ask us if you are unsure before paying.
          </li>
        </ul>

        <h2 className="h5 text-body mt-4">4. Orders</h2>
        <p>
          An order placed on our website is an offer to buy. We may accept or decline an order (for example if an item
          is out of stock, priced incorrectly, or suspected of fraud). A contract is formed when we confirm the order
          and/or payment is successfully completed and accepted.
        </p>
        <p>
          You will receive an order reference. Keep this reference for support, collection, refunds, or cancellations.
        </p>

        <h2 className="h5 text-body mt-4">5. Pricing and payment</h2>
        <ul>
          <li>All prices are in ZMW and may exclude or include taxes as displayed at checkout.</li>
          <li>
            Online payments may be processed by third-party providers such as Flutterwave, DPO Pay, Lenco, or other
            gateways we enable. Their terms and security processes also apply to the payment step.
          </li>
          <li>We do not store full card details on our servers.</li>
          <li>
            Payment must be completed successfully before we treat an online order as paid. Failed, cancelled, or
            incomplete payments do not create a paid order.
          </li>
          <li>If a payment is charged in error or duplicated, contact us promptly with your transaction details.</li>
        </ul>

        <h2 className="h5 text-body mt-4">6. Fulfilment — collection and delivery</h2>
        <ul>
          <li>
            <strong>Collection:</strong> Collect from our shop during business hours ({autoPartsContact.hours}) unless
            otherwise arranged. Bring your order reference and a valid form of identification if requested.
          </li>
          <li>
            <strong>Delivery:</strong> If you request delivery, details, timing, and any delivery fee will be agreed with
            you. Risk in the goods passes on delivery to the address you provided, or on collection if you choose
            pickup.
          </li>
        </ul>

        <h2 className="h5 text-body mt-4">7. Cancellations and refunds</h2>
        <p>
          Cancellation and refund rules are set out in our{' '}
          <Link href="/cancellation-policy">Cancellation Policy</Link> and <Link href="/refund-policy">Refund Policy</Link>
          . In summary, change-of-mind refunds may not be available once an order is fulfilled, and fitted or used parts
          are generally not returnable except where required by law or where the part is faulty/not as described.
        </p>

        <h2 className="h5 text-body mt-4">8. Website use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for unlawful purposes</li>
          <li>Attempt to gain unauthorised access to our systems, admin areas, or other users&apos; data</li>
          <li>Interfere with the security or operation of the website</li>
          <li>Submit false, misleading, or fraudulent order or payment information</li>
        </ul>
        <p>We may suspend access if we reasonably believe these Terms have been breached.</p>

        <h2 className="h5 text-body mt-4">9. Intellectual property</h2>
        <p>
          Website content, branding, logos, and materials belonging to {companyInfo.legalName} remain our property (or
          that of our licensors). You may not copy or reuse them for commercial purposes without our written permission.
        </p>

        <h2 className="h5 text-body mt-4">10. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, {companyInfo.legalName} is not liable for indirect,
          incidental, or consequential losses arising from use of the website or products, including loss of profit,
          downtime, or vehicle-related consequential damage, except where such limitation is prohibited by law.
        </p>
        <p>
          Nothing in these Terms excludes liability for fraud, death or personal injury caused by negligence, or any
          other liability that cannot be excluded under Zambian law. Our total liability for any claim relating to an
          order is generally limited to the amount you paid for that order.
        </p>
        <p>
          We are not responsible for installation errors by third parties, incorrect part selection by the customer
          despite available guidance, or delays caused by payment providers, networks, or events beyond our reasonable
          control.
        </p>

        <h2 className="h5 text-body mt-4">11. Privacy</h2>
        <p>
          How we handle personal data is explained in our <Link href="/privacy-policy">Privacy Policy</Link>. By using
          our website and services, you also acknowledge that policy.
        </p>

        <h2 className="h5 text-body mt-4">12. Governing law</h2>
        <p>
          These Terms are governed by the laws of Zambia. Courts in Zambia shall have jurisdiction over disputes arising
          from these Terms or your purchases, without prejudice to any mandatory consumer protections that apply.
        </p>

        <h2 className="h5 text-body mt-4">13. Changes</h2>
        <p>
          We may update these Terms from time to time. The version published on this page applies to use of the website
          and orders placed after the &quot;Last updated&quot; date. Material changes may be highlighted on the website.
        </p>

        <h2 className="h5 text-body mt-4">14. Contact</h2>
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

export default TermsPage
