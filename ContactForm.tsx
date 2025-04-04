/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-closing-tag-location */
"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  // Load reCAPTCHA script
  useEffect(() => {
    // Avoid duplicate loading
    if (
      typeof window !== "undefined" &&
      !window.grecaptcha &&
      !document.querySelector('script[src*="recaptcha/api.js"]')
    ) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setRecaptchaLoaded(true);
      };
      document.head.appendChild(script);
    } else if (typeof window !== "undefined" && window.grecaptcha) {
      setRecaptchaLoaded(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get reCAPTCHA response
    if (!window.grecaptcha) {
      setStatus("error");
      setStatusMessage(
        "reCAPTCHA not loaded. Please refresh the page and try again."
      );
      return;
    }

    const recaptchaResponse = window.grecaptcha.getResponse();
    if (!recaptchaResponse) {
      setStatus("error");
      setStatusMessage("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      // This is the URL of our own Static Forms API endpoint
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: process.env.NEXT_PUBLIC_STATIC_FORMS_API_KEY || "",
          name,
          email,
          subject,
          message,
          recaptchaToken: recaptchaResponse,
          // Set replyTo directly to the email address
          replyTo: email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you for your message! We will get back to you soon."
        );
        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        // Reset reCAPTCHA
        window.grecaptcha.reset();
      } else {
        setStatus("error");
        setStatusMessage(
          data.error || "Failed to send your message. Please try again later."
        );
      }
    } catch (error) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {status === "success" && (
        <div className="mb-6 bg-green-50 p-4 rounded-md border border-green-200">
          <h3 className="text-green-800 font-medium">Message Sent</h3>
          <p className="text-green-700 mt-1">{statusMessage}</p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 bg-red-50 p-4 rounded-md border border-red-200">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-700 mt-1">{statusMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="subject"
            className="block mb-2 font-medium text-gray-700"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Your subject"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mb-2 font-medium text-gray-700"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Your message"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Verify you&apos;re human <span className="text-red-500">*</span>
          </label>
          <div
            className="g-recaptcha"
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ></div>
          <p className="text-sm text-gray-500 mt-1">
            Please complete the captcha to submit the form.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !recaptchaLoaded}
          className={`py-3 px-6 rounded-md text-white font-medium transition-colors ${
            isSubmitting || !recaptchaLoaded
              ? "bg-[var(--primary-disabled)] cursor-not-allowed"
              : "bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
}

// Declare the global grecaptcha object
declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement | string, parameters: object) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}
