import { getSurah } from '../../../lib/api';
import SettingsPanel from '../../components/SettingsPanel';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const surah = await getSurah(id);

  if (!surah) {
    notFound();
  }

  return (
    <div className="p-6 grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Surah detail</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">{surah.name}</h1>
          <p
            className="mt-3 text-right text-2xl text-black"
            style={{ fontFamily: 'var(--arabic-font-family)' }}
          >
            {surah.arabic}
          </p>
          <p className="mt-3 text-sm text-slate-500">{surah.translation}</p>
        </div>

        <div className="space-y-5">
          {surah.ayahs?.map((ayah: any) => (
            <div key={ayah.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p
                className="text-right text-2xl leading-tight text-black"
                style={{
                  fontFamily: 'var(--arabic-font-family)',
                  fontSize: 'var(--arabic-font-size)',
                }}
              >
                {ayah.arabic}
              </p>
              <p className="mt-3 text-slate-600" style={{ fontSize: 'var(--translation-font-size)' }}>
                {ayah.translation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SettingsPanel />
    </div>
  );
}
