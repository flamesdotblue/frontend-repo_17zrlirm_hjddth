import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Bug, CalendarDays, AlertTriangle, Sun, CloudRain } from 'lucide-react';

function HealthOrb({ score }) {
  const color = useMemo(() => {
    if (score >= 80) return 'from-emerald-400 to-emerald-600';
    if (score >= 50) return 'from-amber-400 to-amber-600';
    return 'from-red-400 to-red-600';
  }, [score]);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-[2px] bg-gradient-to-br from-white/30 to-white/5"
    >
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl shadow-emerald-900/30`}>
        <div className="text-center">
          <div className="text-white text-4xl md:text-5xl font-extrabold drop-shadow">{score}</div>
          <div className="text-white/90 text-xs uppercase tracking-wider">Health</div>
        </div>
      </div>
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        className="pointer-events-none absolute -inset-1 rounded-full border border-white/10"
      />
    </motion.div>
  );
}

function ActionCard({ title, status, Icon, color }) {
  const statusColor = {
    Urgent: 'bg-amber-500/15 text-amber-600',
    Good: 'bg-emerald-500/15 text-emerald-600',
    Info: 'bg-blue-500/15 text-blue-600',
  }[status] || 'bg-slate-500/15 text-slate-600';

  return (
    <motion.div whileHover={{ y: -4 }} className="rounded-xl border border-slate-200/40 bg-white p-4 shadow-sm">
      <div className={`inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
        <Icon className="w-3.5 h-3.5" />
        {status}
      </div>
      <div className="mt-3 text-slate-800 font-semibold">{title}</div>
    </motion.div>
  );
}

export default function DashboardGlance() {
  const healthScore = 82;

  return (
    <section className="mt-10 md:mt-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2 flex justify-center">
            <HealthOrb score={healthScore} />
          </div>

          <div className="md:col-span-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#334155]">Field health at a glance</h2>
            <p className="mt-2 text-slate-600">Your crop is thriving. Stay on track with the key actions below.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ActionCard title="Irrigate in 6 hours" status="Urgent" Icon={Droplets} />
              <ActionCard title="Pest risk low" status="Good" Icon={Bug} />
              <ActionCard title="Harvest in 10 days" status="Info" Icon={CalendarDays} />
            </div>

            <div className="mt-5 rounded-xl bg-gradient-to-r from-[#1e40af] to-[#0f2b7a] text-white p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-300" />
              <div className="text-sm md:text-base">
                Light rain expected tomorrow afternoon. Consider reducing irrigation by 20%.
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-2 text-white/80 text-sm">
                <Sun className="w-4 h-4" />
                <span>Today 32°C</span>
                <CloudRain className="w-4 h-4 ml-3" />
                <span>Tomorrow 28°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
