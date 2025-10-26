import HeroSection from './components/HeroSection.jsx';
import DashboardGlance from './components/DashboardGlance.jsx';
import AdvisoryInsights from './components/AdvisoryInsights.jsx';
import SarthiChat from './components/SarthiChat.jsx';
import MapSection from './components/MapSection.jsx';
import { useState } from 'react';
import { Sprout } from 'lucide-react';

function App() {
  const [userLoc, setUserLoc] = useState(null);

  const handleGetStarted = (loc, lang) => {
    setUserLoc({ loc, lang });
    const target = document.getElementById('glance');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full bg-[#fef7ed] text-[#334155]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[#fef7ed]/80 backdrop-blur border-b border-amber-900/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#1e40af] text-white shadow">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="font-extrabold tracking-tight">KrishiSarthi</div>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-700">
            <a href="#" className="hover:text-[#1e40af]">Home</a>
            <a href="#glance" className="hover:text-[#1e40af]">Dashboard</a>
            <a href="#advisory" className="hover:text-[#1e40af]">Advisory</a>
            <a href="#map" className="hover:text-[#1e40af]">Map</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <HeroSection onGetStarted={handleGetStarted} />

        <div id="glance">
          <DashboardGlance />
        </div>

        <div id="advisory">
          <AdvisoryInsights />
        </div>

        <div id="map">
          <MapSection />
        </div>
      </main>

      <footer className="mt-10 border-t border-amber-900/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-slate-600">
          {userLoc ? (
            <div>
              Personalized for <span className="font-medium text-[#1e40af]">{userLoc.loc || 'your location'}</span> · Language: <span className="font-medium">{userLoc.lang?.toUpperCase()}</span>
            </div>
          ) : (
            <div>Made with care for Indian oilseed farmers • Be future-ready with your digital farm partner</div>
          )}
        </div>
      </footer>

      <SarthiChat />
    </div>
  );
}

export default App;
