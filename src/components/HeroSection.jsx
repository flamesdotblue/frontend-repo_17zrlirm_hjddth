import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, MapPin, Sprout, Sparkles } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export default function HeroSection({ onGetStarted }) {
  const [lang, setLang] = useState('en');
  const [location, setLocation] = useState('');

  return (
    <section className="relative w-full min-h-[80vh] md:h-[88vh] overflow-hidden rounded-2xl md:rounded-3xl bg-black">
      {/* Spline cover background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Readability veil that does not block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

      {/* Subtle animated edge glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -inset-24 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(20,255,120,0.12),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white/80 px-3 py-1.5 backdrop-blur border border-white/10"
        >
          <Sprout className="w-4 h-4 text-emerald-300" />
          <span className="text-xs sm:text-sm">KrishiSarthi • AI for Oilseed Farmers</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-6 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white"
        >
          Grow Smarter with Real‑time Field Intelligence
          <span className="block text-emerald-300/90">Dark topo map • neon contours • data aware</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-4 md:mt-5 text-base md:text-lg text-white/85 max-w-2xl"
        >
          Personalized guidance for sowing, irrigation, pests, and harvest—delivered in your language and tuned to your location.
        </motion.p>

        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl"
        >
          <div className="col-span-1 flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-3 py-2.5 border border-white/10">
            <Globe2 className="w-5 h-5 text-white/80" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full bg-transparent text-white/90 focus:outline-none"
            >
              <option value="en" className="text-slate-800">English</option>
              <option value="hi" className="text-slate-800">हिन्दी</option>
              <option value="te" className="text-slate-800">తెలుగు</option>
              <option value="ta" className="text-slate-800">தமிழ்</option>
              <option value="mr" className="text-slate-800">मराठी</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2 flex items-center gap-2 bg-white/10 backdrop-blur rounded-xl px-3 py-2.5 border border-white/10">
            <MapPin className="w-5 h-5 text-white/80" />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter village or PIN code"
              className="w-full bg-transparent text-white placeholder:text-white/60 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onGetStarted?.(location, lang)}
              className="shrink-0 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 font-medium shadow-lg shadow-emerald-900/30"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        {/* Decorative sparkles for flair */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex items-center gap-2 text-emerald-200/90"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Live contours react to your pointer — explore the terrain.</span>
        </motion.div>
      </div>
    </section>
  );
}
