import { getSurahs } from '../lib/api';
import SettingsPanel from './components/SettingsPanel';
import SurahBrowser from './components/SurahBrowser';

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <div className="p-6 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Quran Reader</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">Explore Surahs and Search Ayahs</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Browse all 114 surahs with Arabic and English names, and search translations across ayahs.
          </p>
        </div>

        <SurahBrowser surahs={surahs} />
      </div>

      <SettingsPanel />
    </div>
  );
}
