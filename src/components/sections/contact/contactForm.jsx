"use client"
import React, { useState } from 'react'
import { RiMailLine } from '@remixicon/react'
import Reveal from '@/components/motion/Reveal'
import Magnetic from '@/components/motion/Magnetic'

const ContactForm = () => {
    const [status, setStatus] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = new FormData(form)
        
        // Ajouter un sujet par défaut
        data.append('subject', 'Contact sur le portfolio')

        try {
            const response = await fetch('https://formspree.io/f/xqaylgje', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setStatus('Merci ! Votre message a été envoyé.')
                form.reset()
            } else {
                setStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
            }
        } catch (error) {
            setStatus('Erreur lors de l\'envoi. Veuillez réessayer.')
        }
    }

    return (
        <div className="col-lg-8">
            <Reveal delay={2}>
                <div className="contact-form contact-form-area">
                    <form className="contactForm" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">Nom et prénom</label>
                                    <input type="text" id="name" name="name" className="form-control" required autoComplete="name" />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="email">Adresse mail</label>
                                    <input type="email" id="email" name="email" className="form-control" required autoComplete="email" />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label htmlFor="message">Votre message</label>
                                    <textarea name="message" id="message" className="form-control" rows="4" required></textarea>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-0">
                                    <Magnetic>
                                        <button type="submit" className="theme-btn">
                                            Envoyer le message <i><RiMailLine size={15} /></i>
                                        </button>
                                    </Magnetic>
                                    <div id="msgSubmit" className={status ? '' : 'hidden'} role="status" aria-live="polite">
                                        {status && (
                                            <p className={`status-message ${status.includes('Merci') ? 'success' : 'error'}`}>
                                                {status}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Reveal>
        </div>
    )
}

export default ContactForm