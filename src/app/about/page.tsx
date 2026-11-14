import AutoPartsShell from '@/app/auto-parts/components/AutoPartsShell'
import PolicyPageLayout from '@/app/auto-parts/components/PolicyPageLayout'
import { autoPartsContact, companyInfo } from '@/app/auto-parts/data'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: `About Us | ${companyInfo.legalName}`,
  description: `Learn about ${companyInfo.legalName} — your local auto parts supplier in Mansa, Zambia.`,
}

const AboutPage = () => {
  return (
    <AutoPartsShell>
      <PolicyPageLayout title="About Us">
        <p>
          <strong>Last updated:</strong>{' '}
          {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <h2 className="h5 text-body mt-4">Who we are</h2>
        <p>
          <strong>{companyInfo.legalName}</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an auto parts retail
          business based in Mansa, Zambia. We supply quality service and repair parts for cars, pickups, taxis, and
          light commercial vehicles.
        </p>
        <p>
          Our focus is everyday parts that keep vehicles on the road — brakes, filters, oils and lubricants, batteries,
          lighting, suspension components, body fittings, and related accessories. We serve private motorists,
          mechanics, taxi operators, and small fleets with honest advice and fair pricing in Zambian Kwacha (ZMW).
        </p>

        <h2 className="h5 text-body mt-4">What we offer</h2>
        <ul>
          <li>In-store sales and stock checks at our shop in Jimbarra Mall, Mansa</li>
          <li>Online product browsing and orders through our website</li>
          <li>Secure online payments via approved payment providers (including Flutterwave and other gateways we enable)</li>
          <li>Quotations and order support by phone, WhatsApp, or email</li>
          <li>Collection from our shop and delivery options where arranged with the customer</li>
        </ul>

        <h2 className="h5 text-body mt-4">Our approach</h2>
        <p>
          We aim to stock fast-moving service items and common repair parts. When you contact us, please share your
          vehicle make, model, and year so we can help confirm the correct part. Prices and availability may change;
          we confirm stock and final pricing before fulfilling an order where needed.
        </p>

        <h2 className="h5 text-body mt-4">Business details</h2>
        <ul>
          <li>
            <strong>Legal / trading name:</strong> {companyInfo.legalName}
          </li>
          <li>
            <strong>Address:</strong> {autoPartsContact.address}
          </li>
          <li>
            <strong>Country:</strong> Zambia
          </li>
          <li>
            <strong>Phone:</strong>{' '}
            <Link href={autoPartsContact.phoneHref}>{autoPartsContact.phone}</Link>
          </li>
          <li>
            <strong>WhatsApp:</strong>{' '}
            <Link href={autoPartsContact.whatsappHref} target="_blank" rel="noopener noreferrer">
              {autoPartsContact.whatsapp}
            </Link>
          </li>
          <li>
            <strong>Email:</strong>{' '}
            <Link href={autoPartsContact.emailHref}>{autoPartsContact.email}</Link>
          </li>
          <li>
            <strong>Business hours:</strong> {autoPartsContact.hours}
          </li>
        </ul>

        <h2 className="h5 text-body mt-4">Policies</h2>
        <p>Please also read our:</p>
        <ul>
          <li>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </li>
          <li>
            <Link href="/refund-policy">Refund Policy</Link>
          </li>
          <li>
            <Link href="/cancellation-policy">Cancellation Policy</Link>
          </li>
        </ul>

        <h2 className="h5 text-body mt-4">Contact</h2>
        <p>
          For product enquiries, orders, or account questions, reach us using the contact details above or via the{' '}
          <Link href="/#contact-us">Contact</Link> section on our homepage.
        </p>
      </PolicyPageLayout>
    </AutoPartsShell>
  )
}

export default AboutPage
