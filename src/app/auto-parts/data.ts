import featured1 from '@/assets/images/auto-parts/featured-1.jpg'
import featured2 from '@/assets/images/auto-parts/featured-2.jpg'
import featured3 from '@/assets/images/auto-parts/featured-3.jpg'
import featured4 from '@/assets/images/auto-parts/featured-4.jpg'
import heroImage from '@/assets/images/auto-parts/hero.jpg'
import aboutImage from '@/assets/images/auto-parts/about.jpg'
import contactImage from '@/assets/images/auto-parts/contact.jpg'
import product1 from '@/assets/images/auto-parts/product-1.webp'
import product2 from '@/assets/images/auto-parts/products-2.jpg'
import product3 from '@/assets/images/auto-parts/product7.jpg'
import product4 from '@/assets/images/auto-parts/product8.jpg'
import product5 from '@/assets/images/auto-parts/product-3.webp'
import product6 from '@/assets/images/auto-parts/product-4.webp'
import product7 from '@/assets/images/auto-parts/product5.jpg'
import product8 from '@/assets/images/auto-parts/product6.jpg'
import promoBrakes from '@/assets/images/auto-parts/promo-brakes.jpg'
import promoOil from '@/assets/images/auto-parts/promo-oil.jpg'
import promoBattery from '@/assets/images/auto-parts/promo-battery.jpg'
import companyLogo from '@/assets/images/satechitech-logo.png'
import { StaticImageData } from 'next/image'
import { type IconType } from 'react-icons'
import { BsLightningFill, BsShieldCheck, BsTruck } from 'react-icons/bs'
import { FaBatteryFull, FaCarBurst, FaGaugeHigh, FaLightbulb, FaOilCan, FaScrewdriverWrench, FaStar } from 'react-icons/fa6'

export const pageImages = {
  hero: heroImage,
  about: aboutImage,
  contact: contactImage,
}

export const companyInfo = {
  legalName: 'SATECHI TECH ENTERPRISES',
  logo: companyLogo,
  logoAlt: 'SATECHI TECH ENTERPRISES logo',
  currency: 'ZMW',
  tagline:
    'Your local auto parts supplier in Katima Mulilo — brakes, filters, oils, batteries, and accessories for cars, bakkies, and light commercial vehicles.',
  metaDescription:
    'SATECHI TECH ENTERPRISES supplies quality auto parts in Katima Mulilo, Namibia. Visit us or enquire on WhatsApp for brakes, filters, oils, batteries, and more.',
}

/** Client pricing rule: ZMW price = original N$ price + 75 (e.g. N$75 → ZMW 150). */
export const ZMW_PRICE_OFFSET = 75

export const formatPrice = (amount: number): string =>
  `${companyInfo.currency} ${amount.toLocaleString('en-ZM', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`

export const autoPartsContact = {
  address: '41648 1/Shop E G JIMBARA MALL, MANSA',
  phone: '+260 977161341',
  phoneHref: 'tel:+260977161341',
  whatsapp: '+260 961606167',
  whatsappHref: 'https://wa.me/260961606167',
  email: 'Stanmubanga38@gmail.com',
  emailHref: 'mailto:Stanmubanga38@gmail.com',
  hours: 'Mon–Sat: 8:00 – 17:30',
}

/** Update href values with your official business social pages before DPO re-review. */
export const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/260961606167',
    ariaLabel: 'Chat with us on WhatsApp',
  },
  {
    label: 'Facebook',
    href:
      process.env.NEXT_PUBLIC_FACEBOOK_URL ??
      'https://www.facebook.com/profile.php?id=61590653036815',
    ariaLabel: 'Follow Satechi Tech Enterprises on Facebook',
  },
  {
    label: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://www.instagram.com/satechitechenterprises/',
    ariaLabel: 'Follow Satechi Tech Enterprises on Instagram',
  },
] as const

export const sectionCopy = {
  hero: {
    title: 'Auto parts you can trust',
    titleHighlight: 'in Katima Mulilo',
    description:
      'SATECHI TECH ENTERPRISES keeps everyday service parts in stock — from brake pads and oil filters to batteries and lighting. Walk in, call, or message us on WhatsApp for a quick quote.',
    cta: 'View products',
    categoryLabel: 'What are you looking for?',
    promosTitle: 'Current specials',
    promosSubtitle: 'Ask in-store or on WhatsApp — prices and stock updated regularly.',
  },
  featured: {
    title: 'Featured parts',
    subtitle: 'Popular items our customers request most often.',
  },
  products: {
    title: 'Our products',
    subtitle: 'A sample of lines we stock and supply. Contact us to confirm availability for your vehicle.',
    viewAll: 'View all products',
  },
  categories: {
    title: 'Our Categories',
    subtitle: 'Find the right line for your repair, service, or upgrade.',
    viewAll: 'View all',
  },
  whyUs: {
    title: 'Why choose SATECHI TECH',
    subtitle: 'Local service, honest advice, and parts that keep you moving.',
  },
  brands: {
    title: 'Brands & quality',
    subtitle: 'We work with reputable suppliers for brakes, lubricants, filters, electrical, and general service parts.',
  },
  about: {
    title: 'About us',
    lead: `${companyInfo.legalName} is a Katima Mulilo–based auto parts business serving private motorists, taxi operators, mechanics, and small fleets across the Zambezi region.`,
    body: 'We focus on fast-moving service items and common repair parts — not fancy promises, just the right component at a fair price. Tell us your vehicle make, model, and year, and we will help you find what fits.',
    extra:
      'Whether you are doing a full service, replacing worn brakes, or fixing lights and mirrors before a long trip, our team is here to help you get back on the road safely.',
  },
  contact: {
    title: 'Contact us',
    subtitle: 'Visit our shop, call, or WhatsApp for stock checks and quotations.',
    detailsTitle: 'Contact details',
    mapTitle: 'Find us in Katima Mulilo',
  },
}

export type AutoPartCategoryKey = 'engine' | 'brakes' | 'body' | 'accessories'

export type AutoPartCategory = {
  key: AutoPartCategoryKey
  label: string
  icon: IconType
}

export const autoPartCategories: AutoPartCategory[] = [
  { key: 'engine', label: 'Engine parts', icon: FaGaugeHigh },
  { key: 'brakes', label: 'Brakes', icon: FaCarBurst },
  { key: 'body', label: 'Body', icon: FaScrewdriverWrench },
  { key: 'accessories', label: 'Accessories', icon: FaOilCan },
]

export type HeroPromoType = {
  image: StaticImageData
  badge: string
  title: string
  detail: string
}

export const heroPromosData: HeroPromoType[] = [
  {
    image: promoBrakes,
    badge: 'Service special',
    title: 'Brake pad & disc combos',
    detail: 'Matched front sets for common sedans and bakkies — ask for today’s price.',
  },
  {
    image: promoOil,
    badge: 'Oil change',
    title: 'Filter + oil bundles',
    detail: 'Air, oil, and fuel filters with recommended grades for your engine.',
  },
  {
    image: promoBattery,
    badge: 'In stock',
    title: 'Batteries & charging',
    detail: 'Starting batteries for cars and light trucks — fitting advice available.',
  },
]

export type FeaturedPartType = {
  name: string
  category: string
  price: number
  rating: number
  image: StaticImageData
}

export const featuredPartsData: FeaturedPartType[] = [
  {
    name: 'Front Brake Pad Set (Universal fit)',
    category: 'Brakes',
    price: 525,
    rating: 4.8,
    image: featured1,
  },
  {
    name: 'Engine Oil Filter',
    category: 'Filters',
    price: 195,
    rating: 4.6,
    image: featured2,
  },
  {
    name: 'H4 Headlamp Bulb Pair',
    category: 'Lighting',
    price: 255,
    rating: 4.7,
    image: featured3,
  },
  {
    name: 'Rubber Floor Mat Set (4 pc)',
    category: 'Accessories',
    price: 395,
    rating: 4.5,
    image: featured4,
  },
]

export type ProductType = {
  name: string
  category: string
  brand: string
  price: number
  salePrice?: number
  rating: number
  image: StaticImageData
  badge?: string
  stockLabel?: string
}

export const productsData: ProductType[] = [
  {
    name: 'Rear Brake Shoe Set',
    category: 'Brakes',
    brand: 'RoadSafe',
    price: 595,
    salePrice: 540,
    rating: 4.9,
    image: product1,
    badge: 'Popular',
    stockLabel: 'In stock',
  },
  {
    name: 'Air Filter — Panel Type',
    category: 'Filters',
    brand: 'FilterPro',
    price: 170,
    rating: 4.5,
    image: product2,
    stockLabel: 'In stock',
  },
  {
    name: 'Shock Absorber (Front pair)',
    category: 'Suspension',
    brand: 'RideMax',
    price: 1925,
    salePrice: 1765,
    rating: 4.7,
    image: product5,
    badge: 'Special',
    stockLabel: 'Order',
  },
  {
    name: '12V Car Battery 45Ah',
    category: 'Electrical',
    brand: 'PowerCell',
    price: 2175,
    rating: 4.8,
    image: product6,
    stockLabel: 'In stock',
  },
  {
    name: 'Wiper Blade Set (2 pc)',
    category: 'Body',
    brand: 'ClearDrive',
    price: 215,
    rating: 4.4,
    image: product7,
    stockLabel: 'In stock',
  },
  {
    name: 'Side Mirror — Left',
    category: 'Body',
    brand: 'AutoFit',
    price: 455,
    rating: 4.3,
    image: product8,
    badge: 'New',
    stockLabel: 'Limited',
  },
  {
    name: 'Engine Oil 5W-30 (4L)',
    category: 'Lubricants',
    brand: 'LubeLine',
    price: 495,
    salePrice: 460,
    rating: 4.6,
    image: product3,
    stockLabel: 'In stock',
  },
  {
    name: 'Spark Plug Set (4 pc)',
    category: 'Engine',
    brand: 'Ignite',
    price: 335,
    rating: 4.7,
    image: product4,
    stockLabel: 'In stock',
  },
]

export type PartCategoryBrowseType = {
  title: string
  description: string
  icon: IconType
  variant: string
}

export const partCategoriesBrowseData: PartCategoryBrowseType[] = [
  {
    title: 'Brakes & clutch',
    description: 'Pads, shoes, discs, drums, and hydraulic parts for safe stopping.',
    icon: FaCarBurst,
    variant: 'bg-danger text-danger',
  },
  {
    title: 'Oils & fluids',
    description: 'Engine oil, gear oil, coolant, brake fluid, and greases.',
    icon: FaOilCan,
    variant: 'bg-warning text-warning',
  },
  {
    title: 'Batteries',
    description: 'Car and bakkie batteries plus terminals and accessories.',
    icon: FaBatteryFull,
    variant: 'bg-success text-success',
  },
  {
    title: 'Lighting',
    description: 'Headlamps, indicators, brake lights, and bulbs.',
    icon: FaLightbulb,
    variant: 'bg-orange text-orange',
  },
  {
    title: 'Filters',
    description: 'Air, oil, fuel, and cabin filters for routine servicing.',
    icon: FaGaugeHigh,
    variant: 'bg-info text-info',
  },
  {
    title: 'Body & trim',
    description: 'Mirrors, wipers, bumpers, clips, and exterior fittings.',
    icon: FaScrewdriverWrench,
    variant: 'bg-primary text-primary',
  },
]

export type FeatureType = {
  icon: IconType
  variant: string
  title: string
  description: string
}

export const autoPartsFeatures: FeatureType[] = [
  {
    title: 'Local stock',
    description: 'Common service and repair parts available from our Katima Mulilo shop.',
    variant: 'bg-primary text-primary',
    icon: FaStar,
  },
  {
    title: 'Fitment guidance',
    description: 'Share your vehicle details and we help you choose the correct part the first time.',
    variant: 'bg-success text-success',
    icon: BsShieldCheck,
  },
  {
    title: 'WhatsApp quotes',
    description: 'Send a photo or part number on WhatsApp for a quick price and availability check.',
    variant: 'bg-warning text-warning',
    icon: BsLightningFill,
  },
  {
    title: 'Regional supply',
    description: 'Serving Katima Mulilo and surrounding areas — ask about delivery options.',
    variant: 'bg-orange text-orange',
    icon: BsTruck,
  },
]

export const trustedBrandLabels: string[] = ['Brake systems', 'Engine oils', 'Filters', 'Batteries', 'Lighting', 'Suspension']
