'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/premium/Header';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

/**
 * Contact Page with Functional Form
 * Sends message to database AND sends email notification
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.consent) {
      setSubmitStatus({
        type: 'error',
        message: 'Vous devez accepter la politique de confidentialité',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Prepare data - only include phone if it has a value
      const requestData: any = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };
      
      // Only add phone if it's not empty
      if (formData.phone && formData.phone.trim()) {
        requestData.phone = formData.phone.trim();
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.',
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          consent: false,
        });
      } else {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-amber-50/20 to-neutral-50">
        {/* Hero Section - Modern & Elegant */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-2xl shadow-amber-500/30 mb-8"
              >
                <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6">
                Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Nous</span>
              </h1>
              <p className="text-xl lg:text-2xl text-neutral-600 leading-relaxed">
                Prêt à donner vie à votre projet ? Notre équipe d'artisans passionnés 
                est à votre écoute pour transformer vos idées en réalité.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 relative z-10" aria-label="Formulaire de contact et informations">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-5">
              {/* Formulaire de Contact - 3 colonnes */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-3xl shadow-2xl border border-amber-100/50 overflow-hidden">
                  {/* Header du formulaire */}
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <PaperAirplaneIcon className="w-8 h-8" />
                      Envoyez-nous un Message
                    </h2>
                    <p className="text-amber-100 mt-2">Nous vous répondrons dans les 24 heures</p>
                  </div>

                  <div className="p-8">
                    {/* Status Messages */}
                    {submitStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-5 rounded-2xl flex items-start gap-3 ${
                          submitStatus.type === 'success'
                            ? 'bg-green-50 border-2 border-green-200 text-green-800'
                            : 'bg-red-50 border-2 border-red-200 text-red-800'
                        }`}
                      >
                        {submitStatus.type === 'success' && (
                          <CheckCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium">{submitStatus.message}</span>
                      </motion.div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulaire de contact">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Prénom <span className="text-amber-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                            placeholder="Votre prénom"
                            aria-required="true"
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-semibold text-neutral-700 mb-2">
                            Nom <span className="text-amber-600">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                            placeholder="Votre nom"
                            aria-required="true"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Email <span className="text-amber-600">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                          placeholder="votre.email@exemple.com"
                          aria-required="true"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                          placeholder="+216 XX XXX XXX"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Sujet <span className="text-amber-600">*</span>
                        </label>
                        <select 
                          id="subject" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required 
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                          aria-required="true"
                          disabled={isSubmitting}
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="Demande de devis">💰 Demande de devis</option>
                          <option value="Nouveau projet">🎨 Nouveau projet</option>
                          <option value="Demande d'information">ℹ️ Demande d'information</option>
                          <option value="Autre">📝 Autre</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                          Message <span className="text-amber-600">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all outline-none resize-none"
                          placeholder="Décrivez votre projet ou votre demande en détail..."
                          aria-required="true"
                          disabled={isSubmitting}
                        ></textarea>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <input
                          type="checkbox"
                          id="consent"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          required
                          className="mt-1 w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                          aria-required="true"
                          disabled={isSubmitting}
                        />
                        <label htmlFor="consent" className="text-sm text-neutral-700 font-medium">
                          J'accepte que mes données personnelles soient utilisées pour traiter ma demande. <span className="text-amber-600">*</span>
                        </label>
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-4 px-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-amber-700 focus:ring-4 focus:ring-amber-500/50 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                        aria-label="Envoyer le message de contact"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Envoi en cours...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <PaperAirplaneIcon className="w-5 h-5" />
                            Envoyer le Message
                          </span>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Informations de Contact - 2 colonnes */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2 space-y-6"
              >
                {/* Coordonnées - Enhanced */}
                <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                        <MapPinIcon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-3xl font-bold">Nos Coordonnées</h3>
                    </div>
                    
                    <div className="grid gap-4">
                      {/* Address */}
                      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                        <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                          <MapPinIcon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-amber-400 mb-2 text-lg">Adresse</p>
                          <address className="text-neutral-200 not-italic leading-relaxed text-base">
                            Zone Industrielle<br />
                            Tunis, Tunisie
                          </address>
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                        <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                          <PhoneIcon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-amber-400 mb-2 text-lg">Téléphone</p>
                          <a 
                            href="tel:+216XXXXXXXX" 
                            className="text-neutral-200 hover:text-amber-300 transition-colors text-base font-medium"
                            aria-label="Appeler ÉBENOR CRÉATION"
                          >
                            +216 XX XXX XXX
                          </a>
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                        <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                          <EnvelopeIcon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-amber-400 mb-2 text-lg">Email</p>
                          <a 
                            href="mailto:contact@ebenor-creation.tn" 
                            className="text-neutral-200 hover:text-amber-300 transition-colors break-all text-base font-medium"
                            aria-label="Envoyer un email à ÉBENOR CRÉATION"
                          >
                            contact@ebenor-creation.tn
                          </a>
                        </div>
                      </div>
                      
                      {/* Hours */}
                      <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-500/30 transition-all group">
                        <div className="p-3 bg-amber-500/20 rounded-xl group-hover:bg-amber-500/30 transition-colors">
                          <ClockIcon className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-amber-400 mb-2 text-lg">Horaires</p>
                          <div className="text-neutral-200 leading-relaxed text-base space-y-1">
                            <p className="flex justify-between">
                              <span className="font-medium">Lun - Ven</span>
                              <span>8h00 - 17h00</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="font-medium">Samedi</span>
                              <span>8h00 - 12h00</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="font-medium">Dimanche</span>
                              <span className="text-red-400">Fermé</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp - Enhanced */}
                <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-400/0 via-green-300/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                        <span className="text-3xl">💬</span>
                      </div>
                      <h3 className="text-2xl font-bold">Contact Rapide</h3>
                    </div>
                    
                    <p className="text-green-50 mb-6 text-base leading-relaxed">
                      Besoin d'une réponse immédiate ? Contactez-nous via WhatsApp pour un échange instantané !
                    </p>
                    
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Bonjour, je souhaiterais obtenir des informations sur vos services.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-white text-green-600 font-bold text-lg rounded-2xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
                      aria-label="Ouvrir WhatsApp pour contacter ÉBENOR CRÉATION (ouvre dans un nouvel onglet)"
                    >
                      <span className="text-2xl">📱</span>
                      <span>Ouvrir WhatsApp</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Google Maps - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-20"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-6">
                  <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                    <MapPinIcon className="w-8 h-8" />
                    Notre Localisation
                  </h3>
                  <p className="text-amber-100 mt-2">Zone Industrielle, Tunis - Tunisie</p>
                </div>
                <div className="relative h-[500px] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102948.82073654844!2d10.08080475!3d36.8064948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34cf7c5f06b1%3A0x6b94f7608db567e!2sZone%20Industrielle%2C%20Tunis%2C%20Tunisia!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ÉBENOR CRÉATION - Zone Industrielle, Tunis, Tunisie"
                    className="grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="py-20 bg-white" aria-label="Questions fréquemment posées">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Fréquentes</span>
              </h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Trouvez rapidement les réponses aux questions les plus courantes
              </p>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
              {[
                {
                  question: "Quel est le délai de fabrication ?",
                  answer: "Les délais varient selon la complexité du projet, généralement entre 2 à 8 semaines pour les créations sur mesure.",
                  icon: "⏱️"
                },
                {
                  question: "Proposez-vous la livraison ?",
                  answer: "Oui, nous assurons la livraison et l'installation dans toute la Tunisie. Les frais dépendent de la distance et du volume.",
                  icon: "🚚"
                },
                {
                  question: "Quelles essences de bois utilisez-vous ?",
                  answer: "Nous travaillons avec diverses essences : chêne, hêtre, noyer, acajou, selon vos préférences et le budget.",
                  icon: "🌳"
                },
                {
                  question: "Comment obtenir un devis ?",
                  answer: "Contactez-nous avec les détails de votre projet. Nous vous fournirons un devis détaillé gratuit sous 48h.",
                  icon: "💰"
                }
              ].map((faq, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl p-6 border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-4xl group-hover:scale-110 transition-transform">{faq.icon}</span>
                    <div>
                      <h3 className="font-bold text-neutral-900 mb-2 text-lg group-hover:text-amber-600 transition-colors">
                        {faq.question}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
