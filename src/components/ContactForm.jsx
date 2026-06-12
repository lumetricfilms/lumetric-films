import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

// Inquiries deliver straight to the inbox via Web3Forms (key registered to
// lumetricfilms@gmail.com at https://web3forms.com).
const ACCESS_KEY = 'c3ddba5b-1695-4d74-a6f0-0b97140a1e7f';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-400 transition focus:border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-200/40';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const successRef = useRef(null);

  // Move focus to the confirmation so the outcome is announced and the
  // keyboard isn't dropped on <body> when the form unmounts.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    setStatus('sending');
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New project inquiry from ${name}`,
          from_name: 'Lumetric Films website',
          name,
          email,
          message,
          botcheck: Boolean(data.get('botcheck')),
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setError(result.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setError('Network error.');
    }
  };

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-lg border border-cyan-200/30 bg-cyan-300/[0.05] p-6 text-center focus:outline-none"
      >
        <p className="text-lg font-semibold text-white">Thank you</p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Your message is on its way. We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            Your name
          </label>
          <input
            id="cf-name"
            name="name"
            required
            placeholder="Your name"
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="sr-only">
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="sr-only">
          Project details
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Tell us about the project, the date, the location, and the feeling it should carry."
          className={inputClass}
        />
      </div>

      {/* Honeypot: hidden from people, catches bots. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-200 px-7 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {status === 'sending' ? 'Sending...' : 'Send inquiry'}
      </button>
      {status === 'error' ? (
        <p role="alert" className="text-sm text-red-300">
          {error}{' '}
          <a href="mailto:lumetricfilms@gmail.com" className="font-semibold text-cyan-200 underline">
            Email us directly
          </a>{' '}
          instead.
        </p>
      ) : null}
    </form>
  );
}
