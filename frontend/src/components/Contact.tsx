import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { api, type ContactMessage } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      await api.submitContact(form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#e41e26]" />
            <span className="section-label">Get In Touch</span>
            <div className="w-8 h-[2px] bg-[#e41e26]" />
          </div>
          <h2 className="ghost-logo-text text-5xl md:text-6xl text-white">
            Contact <span className="text-[#e41e26]">Us</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <p className="text-white/60 leading-relaxed">
              Questions about products, orders, or partnerships? The  Axe Breaker
              team is ready to back you up. Reach out and we will respond within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'axebreakerofficial@gmail.com' },
                { icon: Phone, label: 'Phone', value: '+91 6362302029' },
                { icon: MapPin, label: 'Headquarters', value: 'The Commercial , #590 , 15th cross, 15 C main, sector 4, HSR Layout, Banglore-560102' },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 flex items-center justify-center border border-[#e41e26]/40 flex-shrink-0">
                      <Icon size={20} className="text-[#e41e26]" />
                    </div>
                    <div>
                      <div className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase font-display mb-1">
                        {c.label}
                      </div>
                      <div className="text-white text-lg">{c.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hours */}
            <div className="bg-[#111111] border border-white/5 p-6">
              <h4 className="font-fire text-white mb-3">
                Business Hours
              </h4>
              <div className="space-y-1 text-sm text-white/50">
                <div className="flex justify-between">
                  <span>Mon - Sat</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>

                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-[#e41e26]">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#111111] border border-white/10 p-8">
            {status === 'success' ? (
              <div className="text-center py-16 animate-fadeIn">
                <CheckCircle2 size={56} className="text-[#e41e26] mx-auto mb-5" />
                <h3 className="ghost-logo-text text-2xl text-white mb-2">
                  Message Sent
                </h3>
                <p className="text-white/50 mb-6">
                  We will get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-outline">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="ghost-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                    Email *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="ghost-input"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="ghost-input"
                    placeholder="What is this about?"
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="ghost-input resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[#e41e26] text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}