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

  const rawEndpoint = (personalInfo.contactConfig.formEndpoint || '').trim();
  const hasEndpoint = /^https?:\/\//i.test(rawEndpoint);
  const fallbackMailAddress =
    personalInfo.social.email ||
    (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEndpoint) ? rawEndpoint : '');
  const hasEmail = Boolean(fallbackMailAddress);

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
      await navigator.clipboard.writeText(fallbackMailAddress);
      setCopiedEmail(true);
      onShowToast({
        type: 'success',
        title: 'Email Copied',
        message: `${fallbackMailAddress} copied to clipboard.`
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
        const response = await fetch(rawEndpoint, {
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
      const mailtoLink = `mailto:${fallbackMailAddress}?subject=${encodeURIComponent(
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
    <section id="contact" className="py-14 xs:py-16 sm:py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-mono mb-3 transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Let's Build Something <span className="text-[var(--accent-primary)]">Amazing Together.</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Actively seeking Full Stack Developer and Software Development Internships. Reach out to discuss opportunities or collaborate on projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="premium-card rounded-2xl p-5 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2">Contact Channels</h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                  Connect directly via email, LinkedIn, or GitHub.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Location */}
                <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] transition-colors duration-300">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-[var(--text-secondary)]">Location</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-0.5">{personalInfo.location}</p>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-start justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent-secondary-soft)] border border-[var(--accent-secondary-border)] flex items-center justify-center text-[var(--accent-secondary)] shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-[var(--text-secondary)]">Email</p>
                      {hasEmail ? (
                        <a
                          href={`mailto:${fallbackMailAddress}`}
                          className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors break-all mt-0.5 block"
                        >
                          {fallbackMailAddress}
                        </a>
                      ) : (
                        <p className="text-xs text-[var(--text-secondary)] mt-1">
                          Configurable via <code className="text-[var(--accent-primary)]">VITE_CONTACT_EMAIL</code>
                        </p>
                      )}
                    </div>
                  </div>
                  {hasEmail && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-secondary)] transition-colors shrink-0"
                      aria-label="Copy Email Address"
                      title="Copy email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-[var(--accent-primary)]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Optional Phone */}
                {personalInfo.social.phone && (
                  <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] transition-colors duration-300">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] flex items-center justify-center text-[var(--accent-primary)] shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-[var(--text-secondary)]">Phone</p>
                      <a
                        href={`tel:${personalInfo.social.phone}`}
                        className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors mt-0.5 block"
                      >
                        {personalInfo.social.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* LinkedIn & GitHub */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <p className="text-xs font-mono text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                  Social Profiles
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-[var(--text-primary)] transition-all group"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Linkedin className="w-4 h-4 text-[var(--accent-primary)]" />
                      <span className="text-xs font-semibold">LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent-secondary)] transition-colors" />
                  </a>

                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-[var(--text-primary)] transition-all group"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <Github className="w-4 h-4 text-[var(--text-primary)]" />
                      <span className="text-xs font-semibold">GitHub</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] transition-colors" />
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
              className="premium-card rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5"
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border-color)]">
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[var(--accent-primary)]" />
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">Send a Message</h3>
                </div>
                <span className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-1 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                  {hasEndpoint ? 'Live Service Active' : hasEmail ? 'Mail Client Mode' : 'Configurable Form'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                    Name <span className="text-[var(--accent-secondary)]">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--bg-primary)] border ${
                      errors.name
                        ? 'border-[var(--accent-secondary)]'
                        : 'border-[var(--border-color)] hover:border-[var(--accent-secondary)] focus:border-[var(--accent-primary)]'
                    } text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] transition-all`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-[var(--accent-secondary)]">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                    Email <span className="text-[var(--accent-secondary)]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--bg-primary)] border ${
                      errors.email
                        ? 'border-[var(--accent-secondary)]'
                        : 'border-[var(--border-color)] hover:border-[var(--accent-secondary)] focus:border-[var(--accent-primary)]'
                    } text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] transition-all`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-[var(--accent-secondary)]">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                  Subject <span className="text-[var(--accent-secondary)]">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Full Stack Developer Internship Inquiry"
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--bg-primary)] border ${
                    errors.subject
                      ? 'border-[var(--accent-secondary)]'
                      : 'border-[var(--border-color)] hover:border-[var(--accent-secondary)] focus:border-[var(--accent-primary)]'
                  } text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] transition-all`}
                />
                {errors.subject && <p className="mt-1 text-xs text-[var(--accent-secondary)]">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[var(--text-primary)] mb-1.5">
                  Message <span className="text-[var(--accent-secondary)]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share internship details, role requirements, or project ideas..."
                  className={`w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[var(--bg-primary)] border ${
                    errors.message
                      ? 'border-[var(--accent-secondary)]'
                      : 'border-[var(--border-color)] hover:border-[var(--accent-secondary)] focus:border-[var(--accent-primary)]'
                  } text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)] transition-all resize-y`}
                />
                {errors.message && <p className="mt-1 text-xs text-[var(--accent-secondary)]">{errors.message}</p>}
              </div>

              {/* Honest Submission Feedback */}
              {submitState === 'sent' && (
                <div className="p-4 rounded-xl bg-[var(--accent-primary-soft)] border border-[var(--accent-primary-border)] text-xs sm:text-sm text-[var(--text-primary)] flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>Your message was delivered via the configured form endpoint.</span>
                </div>
              )}

              {submitState === 'not_configured' && (
                <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)] space-y-2.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] text-xs font-medium text-[var(--text-primary)] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      <span>Copy Draft</span>
                    </button>
                    <a
                      href={personalInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent-secondary)] text-xs font-medium text-[var(--text-primary)] transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] border border-[var(--accent-primary)] hover:border-[var(--accent-secondary)] text-white font-semibold text-sm shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                <span className="text-xs text-[var(--text-secondary)]">
                  {hasEndpoint
                    ? 'Connected to configured form endpoint.'
                    : hasEmail
                    ? 'Opens your email client or copy draft.'
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
