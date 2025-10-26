import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

function Step({ step, onToggle }) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(step.id)}
      className={`w-full text-left rounded-xl border p-4 bg-white shadow-sm flex items-start gap-3 ${
        step.done ? 'border-emerald-200' : 'border-slate-200'
      }`}
    >
      <CheckCircle2 className={`w-5 h-5 mt-0.5 ${step.done ? 'text-emerald-600' : 'text-slate-300'}`} />
      <div>
        <div className="font-semibold text-slate-800">{step.title}</div>
        <div className="text-sm text-slate-600 mt-0.5">{step.desc}</div>
      </div>
    </motion.button>
  );
}

function YieldBars({ current, potential }) {
  const gap = useMemo(() => Math.max(potential - current, 0), [current, potential]);
  const max = Math.max(current, potential, 1);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Current Yield</span>
        <span>{current} q/ha</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(current / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-sm text-slate-600">
        <span>Potential Yield</span>
        <span>{potential} q/ha</span>
      </div>
      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${(potential / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
        />
      </div>

      <div className="mt-3 text-sm text-slate-700">
        Opportunity: <span className="font-semibold text-[#059669]">+{gap} q/ha</span>
      </div>
    </div>
  );
}

export default function AdvisoryInsights() {
  const [open, setOpen] = useState(true);
  const [steps, setSteps] = useState([
    { id: 1, title: 'Irrigate 18mm this evening', desc: 'Soil moisture is low and evapotranspiration is high today.', done: false },
    { id: 2, title: 'Scout for aphids on lower leaves', desc: 'Risk is moderate; use yellow sticky traps as a first line.', done: false },
    { id: 3, title: 'Apply micronutrient foliar spray', desc: 'Zinc and boron boost pod formation at this stage.', done: false },
  ]);

  const progress = useMemo(() => Math.round((steps.filter(s => s.done).length / steps.length) * 100), [steps]);

  const toggle = (id) => {
    setSteps(prev => prev.map(s => (s.id === id ? { ...s, done: !s.done } : s)));
  };

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-[#334155]">Advisory & Insights</h2>
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1 text-sm text-[#1e40af] hover:underline"
          >
            {open ? <><ChevronUp className="w-4 h-4" /> Collapse</> : <><ChevronDown className="w-4 h-4" /> Expand</>}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-slate-700">Today's Action Plan</div>

                <div className="mt-4 space-y-3">
                  {steps.map((s) => (
                    <Step key={s.id} step={s} onToggle={toggle} />
                  ))}
                </div>

                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-[#1e40af] via-[#16a34a] to-[#059669]"
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm font-semibold text-slate-700">Yield Gap Analysis</div>
                <YieldBars current={10.2} potential={14.8} />
                <div className="mt-4 text-sm text-slate-600">
                  By implementing the recommended practices, you can move closer to the green target and unlock higher income per hectare.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Micro-interactions are enabled—mark steps as complete to see satisfying progress updates.
        </div>
      </div>
    </section>
  );
}
