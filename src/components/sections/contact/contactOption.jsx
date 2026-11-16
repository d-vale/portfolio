import { RiMailLine, RiMapPinLine, RiPhoneLine } from '@remixicon/react'
import React from 'react'
import Reveal from '@/components/motion/Reveal'

const ContactOption = () => {
    return (
        <div className="col-lg-4">
            <Reveal className="h-100">
                <div className="contact-content-part h-100">
                    <Reveal delay={3}>
                        <div className="single-contact">
                            <div className="contact-icon">
                                <i> <RiMapPinLine size={20} /></i>
                            </div>
                            <h2>Localisation :</h2>
                            <p>Région lausannoise</p>
                        </div>
                    </Reveal>
                    <Reveal delay={5}>
                        <div className="single-contact">
                            <div className="contact-icon">
                                <i> <RiPhoneLine size={20} /></i>
                            </div>
                            <h2>Téléphone :</h2>
                            <p>
                                <a href="tel:+41796695062">+41 79 669 50 62</a>
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={7}>
                        <div className="single-contact">
                            <div className="contact-icon">
                                <i> <RiMailLine size={20} /></i>
                            </div>
                            <h2>Email :</h2>
                            <p>
                                <a href="mailto:dpv@bobst-immobilier.ch">dpv@bobst-immobilier.ch</a>
                            </p>
                        </div>
                    </Reveal>
                </div>
            </Reveal>
        </div>
    )
}

export default ContactOption
