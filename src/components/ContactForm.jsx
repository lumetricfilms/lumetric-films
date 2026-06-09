import { useState } from 'react';
import { Send } from 'lucide-react';

// To deliver inquiries straight to the inbox, paste a free Web3Forms access key
// here (get one in 2 minutes at https://web3forms.com using lumetricfilms@gmail.com).
// Until a key is set, the form falls back to opening the visitor's email app
// pre-filled, and shows on-page confirmation either way.
const ACCESS_KEY = '9988ca34-1acd-456c-8a0d-418a9fb03ef9';

const inputClass =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:border-cyan-200/50 focus:outline-none focus:ring-1 focus:ring-cyan-200/40';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Project inquiry from ${name || 'the website'}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      window.location.href = `mailto:lumetricfilms@gmail.com?subject=${subject}&body=${body}`;
      setStatus('drafted');
      return;
    }

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
        setError(result.message || 'Something went wrong. Please email us directly.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please email us directly.');
    }
  };

  if (status === 'success' || status === 'drafted') {
    return (
      <div className="rounded-lg border border-cyan-200/30 bg-cyan-300/[0.05] p-6 text-center">
        <p className="text-lg font-semibold text-white">
          {status === 'success' ? 'Thank you' : 'Almost there'}
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          {status === 'success'
            ? 'Your message is on its way. We will get back to you soon.'
            : 'We opened a draft in your email app. If nothing happened, email us directly at lumetricfilms@gmail.com.'}
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
        <p className="text-sm text-red-300">{error}</p>
      ) : null}
    </form>
  );
}
