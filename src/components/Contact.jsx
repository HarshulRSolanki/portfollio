import React, { useState } from 'react';
import {
  Mail, MapPin, Github, Linkedin, Send, Copy, Check,
  Sparkles, Phone, AlertCircle, ExternalLink, MessageSquare
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitState, setSubmitState] = useState(null);

  const hasEndpoint = Boolean(personalInfo.contactConfig.formEndpoint);
  const hasEmail = Boolean(personalInfo.social.email);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please enter a subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message (at least 10 characters).';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitState) setSubmitState(null);
  };

  const handleCopyEmail = async () => {
    if (!hasEmail) return;
    try {
      await navigator.clipboard.writeText(personalInfo.social.email);
      setCopiedEmail(true);
      onShowToast({
        type: 'success',
        title: 'Email Copied',
        message: `${personalInfo.social.email} copied to clipboard.`
      });
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      onShowToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Could not copy email to clipboard.'
      });
    }
  };

  const handleCopyDraft = async () => {
    const draft = `Subject: ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(draft);
      onShowToast({
        type: 'success',
        title: 'Draft Copied',
        message: 'Your message draft has been copied to your clipboard.'
      });
    } catch {
      onShowToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Could not access clipboard.'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (hasEndpoint) {
      setIsSubmitting(true);
      try {
        const response = await fetch(personalInfo.contactConfig.formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setSubmitState('sent');
          setFormData({ name: '', email: '', subject: '', message: '' });
          onShowToast({
            type: 'success',
            title: 'Message Delivered',
            message: 'Thank you! Your message has been sent via the configured form service.'
          });
        } else {
          setSubmitState('error');
          onShowToast({
            type: 'error',
            title: 'Delivery Error',
            message: 'The form service rejected the request. Please try again or connect via LinkedIn.'
          });
        }
      } catch {
        setSubmitState('error');
        onShowToast({
          type: 'error',
          title: 'Network Error',
          message: 'Could not reach the form endpoint. Please check your connection or connect via LinkedIn.'
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (hasEmail) {
      const mailtoLink = `mailto:${personalInfo.social.email}?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Hi Harshul,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoLink;
      setSubmitState('not_configured');
      onShowToast({
        type: 'info',
        title: 'Opening Email Client',
        message: 'Direct form backend is not configured; opening your default mail app.'
      });
    } else {
      setSubmitState('not_configured');
      onShowToast({
        type: 'info',
        title: 'Form Endpoint Configurable',
        message: 'Configure VITE_FORMSPREE_ENDPOINT or VITE_CONTACT_EMAIL in .env, or connect via LinkedIn.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#252525] text-[#007BA7] text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D75]" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-[#007BA7]">Amazing Together.</span>
          </h2>
          <p className="mt-4 text-base text-[#A1A1AA] leading-relaxed">
            Actively seeking Full Stack Developer and Software Development Internships. Reach out to discuss opportunities or collaborate on projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-card rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Contact Channels</h3>
                <p className="text-sm text-[#A1A1AA]">
                  Connect directly via email, LinkedIn, or GitHub.
                </p>
              </div>

              <div className="space-y-4">
                {/* Location */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0A0A] border border-[#252525]">
                  <div className="w-10 h-10 rounded-xl bg-[#007BA7]/15 border border-[#007BA7]/40 flex items-center justify-center text-[#007BA7] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[#A1A1AA]">Location</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{personalInfo.location}</p>
                  </div>
                </div>

                {/* Email Contact (Configurable) */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#FF2D75]/50 transition-colors">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#FF2D75]/10 border border-[#FF2D75]/35 flex items-center justify-center text-[#FF2D75] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-[#A1A1AA]">Email</p>
                      {hasEmail ? (
                        <a
                          href={`mailto:${personalInfo.social.email}`}
                          className="text-sm font-semibold text-white hover:text-[#007BA7] transition-colors break-all mt-0.5 block"
                        >
                          {personalInfo.social.email}
                        </a>
                      ) : (
                        <p className="text-xs text-[#A1A1AA] mt-1">
                          Configurable via <code className="text-[#007BA7]">VITE_CONTACT_EMAIL</code>
                        </p>
                      )}
                    </div>
                  </div>
                  {hasEmail && (
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-[#141414] border border-[#252525] text-[#A1A1AA] hover:text-white hover:border-[#FF2D75] transition-colors shrink-0"
                      aria-label="Copy Email Address"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-[#007BA7]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Optional Phone */}
                {personalInfo.social.phone && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0A0A0A] border border-[#252525]">
                    <div className="w-10 h-10 rounded-xl bg-[#007BA7]/15 border border-[#007BA7]/40 flex items-center justify-center text-[#007BA7] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[#A1A1AA]">Phone</p>
                      <a
                        href={`tel:${personalInfo.social.phone}`}
                        className="text-sm font-semibold text-white hover:text-[#007BA7] transition-colors mt-0.5 block"
                      >
                        {personalInfo.social.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* LinkedIn & GitHub */}
              <div className="pt-4 border-t border-[#252525]">
                <p className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mb-3">
                  Social Profiles
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#007BA7] text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-[#007BA7]" />
                      <span className="text-xs font-semibold">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-[#FF2D75] transition-colors" />
                  </a>

                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0A0A0A] border border-[#252525] hover:border-[#FF2D75] text-white transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-white" />
                      <span className="text-xs font-semibold">GitHub</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA] group-hover:text-[#007BA7] transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="premium-card rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#252525]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#007BA7]" />
                  <h3 className="text-lg font-bold text-white">Send a Message</h3>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#0A0A0A] border border-[#252525] text-[#A1A1AA]">
                  {hasEndpoint ? 'Live Service Active' : hasEmail ? 'Mail Client Mode' : 'Configurable Form'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-white/90 mb-1.5">
                    Name <span className="text-[#FF2D75]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border ${
                      errors.name ? 'border-[#FF2D75]' : 'border-[#252525] hover:border-[#FF2D75]/50 focus:border-[#007BA7]'
                    } text-sm text-white placeholder-[#A1A1AA]/60 focus:outline-none focus:ring-1 focus:ring-[#007BA7] transition-all`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-[#FF2D75]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-white/90 mb-1.5">
                    Email <span className="text-[#FF2D75]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border ${
                      errors.email ? 'border-[#FF2D75]' : 'border-[#252525] hover:border-[#FF2D75]/50 focus:border-[#007BA7]'
                    } text-sm text-white placeholder-[#A1A1AA]/60 focus:outline-none focus:ring-1 focus:ring-[#007BA7] transition-all`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#FF2D75]">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-white/90 mb-1.5">
                  Subject <span className="text-[#FF2D75]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Full Stack Developer Internship Inquiry"
                  className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border ${
                    errors.subject ? 'border-[#FF2D75]' : 'border-[#252525] hover:border-[#FF2D75]/50 focus:border-[#007BA7]'
                  } text-sm text-white placeholder-[#A1A1AA]/60 focus:outline-none focus:ring-1 focus:ring-[#007BA7] transition-all`}
                />
                {errors.subject && <p className="mt-1 text-xs text-[#FF2D75]">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-white/90 mb-1.5">
                  Message <span className="text-[#FF2D75]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share internship details, role requirements, or project ideas..."
                  className={`w-full px-4 py-3 rounded-xl bg-[#0A0A0A] border ${
                    errors.message ? 'border-[#FF2D75]' : 'border-[#252525] hover:border-[#FF2D75]/50 focus:border-[#007BA7]'
                  } text-sm text-white placeholder-[#A1A1AA]/60 focus:outline-none focus:ring-1 focus:ring-[#007BA7] transition-all resize-y`}
                />
                {errors.message && <p className="mt-1 text-xs text-[#FF2D75]">{errors.message}</p>}
              </div>

              {/* Honest Submission Feedback */}
              {submitState === 'sent' && (
                <div className="p-4 rounded-xl bg-[#007BA7]/10 border border-[#007BA7]/40 text-xs sm:text-sm text-white flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#007BA7] shrink-0 mt-0.5" />
                  <span>Your message was delivered via the configured form endpoint.</span>
                </div>
              )}

              {submitState === 'not_configured' && (
                <div className="p-4 rounded-xl bg-[#0A0A0A] border border-[#252525] text-xs sm:text-sm text-[#A1A1AA] space-y-2.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#FF2D75] shrink-0 mt-0.5" />
                    <span>
                      {hasEmail
                        ? 'Your mail client was opened because no backend form service endpoint is configured.'
                        : 'Configure VITE_FORMSPREE_ENDPOINT or VITE_CONTACT_EMAIL in .env to enable direct submission.'}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pl-6">
                    <button
                      type="button"
                      onClick={handleCopyDraft}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#007BA7] text-xs font-medium text-white transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#007BA7]" />
                      <span>Copy Draft</span>
                    </button>
                    <a
                      href={personalInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141414] border border-[#252525] hover:border-[#FF2D75] text-xs font-medium text-white transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#007BA7]" />
                      <span>Message on LinkedIn</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#007BA7] hover:bg-[#0090C2] border border-[#007BA7] hover:border-[#FF2D75]/70 text-white font-semibold text-sm shadow-lg shadow-[#007BA7]/25 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                <span className="text-xs text-[#A1A1AA]">
                  {hasEndpoint
                    ? 'Connected to configured form endpoint.'
                    : 'Set VITE_FORMSPREE_ENDPOINT for direct delivery.'}
                </span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
