import React from 'react'
import ContactOption from '../../components/sections/contact/contactOption'
import ContactForm from '../../components/sections/contact/contactForm'
import Reveal from '@/components/motion/Reveal'
import SplitReveal from '@/components/motion/SplitReveal'

const Contact = () => {
  return (
    <section id="contact" className="contact-area innerpage-single-area">
      <div className="container">
        <div className="container-inner">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="section-title text-center">
                <Reveal>
                  <p>Contact</p>
                </Reveal>
                <SplitReveal as="h2" by="chars">
                  Contactez-moi !
                </SplitReveal>
              </div>
            </div>
          </div>
          <div className="row">
            <ContactOption />
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
