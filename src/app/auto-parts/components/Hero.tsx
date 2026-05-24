import CategoryNav from '@/app/auto-parts/components/CategoryNav'
import HeroPromos from '@/app/auto-parts/components/HeroPromos'
import { autoPartsContact, pageImages, sectionCopy } from '@/app/auto-parts/data'
import Image from 'next/image'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'
import { FaWhatsapp } from 'react-icons/fa6'

const Hero = () => {
  const { hero } = sectionCopy

  return (
    <section className="pt-3 pt-lg-5">
      <Container>
        <Row className="g-4 g-lg-5 align-items-center mb-4">
          <Col lg={6}>
            <h1 className="display-5 mb-3">
              {hero.title} <span className="text-primary">{hero.titleHighlight}</span>
            </h1>
            <p className="mb-4">{hero.description}</p>
            <div className="d-flex flex-wrap gap-2">
              <Link href="#products" className="btn btn-primary-soft mb-0">
                {hero.cta}
              </Link>
              <Link
                href={autoPartsContact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mb-0 flex-centered gap-2"
              >
                <FaWhatsapp />
                WhatsApp us
              </Link>
            </div>
          </Col>
          <Col lg={6}>
            <Image alt="Auto parts workshop" src={pageImages.hero} className="rounded-3 w-100 object-fit-cover" style={{ minHeight: 280 }} />
          </Col>
        </Row>

        <Row className="justify-content-center mb-4">
          <Col xs={12} lg={10}>
            <div className="text-center mb-3 mb-md-4">
              <p className="text-body-secondary mb-0">{hero.categoryLabel}</p>
            </div>
            <CategoryNav />
          </Col>
        </Row>

        <Row className="justify-content-center pt-2">
          <Col lg={10} xl={11}>
            <div className="text-center mb-4">
              <h5 className="mb-1">{hero.promosTitle}</h5>
              <p className="text-body-secondary small mb-0">{hero.promosSubtitle}</p>
            </div>
            <HeroPromos />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
