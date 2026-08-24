import { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { api, type DistributorInquiry } from '../lib/api';

export default function Distributor() {
  const [form, setForm] = useState<DistributorInquiry>({
    fullName: '',
    email: '',
    phone: '',
    businessName: '',
    city: '',
    state: '',
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
    if (!form.fullName || !form.email) return;
    setStatus('loading');
    try {
      await api.submitDistributor(form);
      setStatus('success');
      setForm({
        fullName: '',
        email: '',
        phone: '',
        businessName: '',
        city: '',
        state: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="distribute"
      className="relative py-24 bg-[#0a0a0a] overflow-hidden noise-overlay"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <img
          src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: pitch */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#e41e26]" />
              <span className="section-label">Partnership</span>
            </div>
            <h2 className="ghost-logo-text text-5xl md:text-6xl text-white mb-6 leading-[0.9]">
              DISTRIBUTOR
              <br />
              <span className="text-[#e41e26]">APPLICATION</span>
            </h2>
            <div className="red-divider" />
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Join the  Axe Breaker network. We partner with driven entrepreneurs
              and retailers who share our obsession for quality and dominance. Bring
              the shadows to your city.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { num: '40%', label: 'Margin on retail' },
                { num: '24h', label: 'Dispatch turnaround' },
                { num: '0', label: 'Franchise fees' },
                { num: '∞', label: 'Growth potential' },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-[#e41e26] pl-4">
                  <div className="ghost-logo-text text-3xl text-white">{s.num}</div>
                  <div className="text-[0.65rem] tracking-[0.2em] text-white/40 uppercase mt-1 font-display">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-[#111111] border border-white/10 p-8 md:p-10">
            {status === 'success' ? (
              <div className="text-center py-12 animate-fadeIn">
                <CheckCircle2 size={64} className="text-[#e41e26] mx-auto mb-6" />
                <h3 className="ghost-logo-text text-3xl text-white mb-3">
                  Application Received
                </h3>
                <p className="text-white/50 mb-8">
                  Our team will reach out within 48 hours. Welcome to the brotherhood.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-outline"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-fire text-2xl text-white mb-2">
                  Distributor Application
                </h3>
                <p className="text-white/40 text-sm mb-4">
                  Fill in your details and we will get back to you.
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                      Full Name *
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="ghost-input"
                      placeholder="John Doe"
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
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="ghost-input"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                      Business Name
                    </label>
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      className="ghost-input"
                      placeholder="Your store / gym"
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                      City
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      className="ghost-input"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                      State
                    </label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      className="ghost-input"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[0.65rem] tracking-[0.2em] text-white/50 uppercase font-display block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="ghost-input resize-none"
                    placeholder="Tell us about your business..."
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
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit Application
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