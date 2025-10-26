import { motion } from 'framer-motion';
import { MapPinned, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=67.5%2C6.0%2C97.5%2C37.5&layer=mapnik&marker=22.9734%2C78.6569`;
  const osmLink = `https://www.openstreetmap.org/#map=5/22.973/78.657`;

  return (
    <section className="mt-12 md:mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-[#334155] flex items-center gap-2">
            <MapPinned className="w-6 h-6 text-[#1e40af]" />
            Field Map
          </h2>
          <a
            href={osmLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#1e40af] hover:underline"
          >
            Open full map <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-4 overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
        >
          <div className="relative w-full aspect-[16/10] bg-slate-100">
            <iframe
              title="Field Map"
              src={osmSrc}
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
            {/* Soft overlay legend */}
            <div className="pointer-events-none absolute left-3 top-3 rounded-lg bg-white/80 backdrop-blur px-3 py-2 text-xs text-slate-700 shadow">
              Crop: Mustard • Layer: Base map (OSM)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
