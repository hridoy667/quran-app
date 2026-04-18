'use client'

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Ayah = {
  id: number;
  arabic: string;
  translation: string;
};

type Surah = {
  id: number;
  name: string;
  arabic: string;
  translation: string;
  transliteration: string;
  ayahs: Ayah[];
};

type Props = {
  surahs: Surah[];
};

export default function SurahBrowser({ surahs }: Props) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return surahs.flatMap((surah) =>
      surah.ayahs
        .filter((ayah) => ayah.translation.toLowerCase().includes(normalizedQuery))
        .map((ayah) => ({
          ...ayah,
          surahId: surah.id,
          surahName: surah.name,
          surahArabic: surah.arabic,
          surahTransliteration: surah.transliteration,
        }))
    );
  }, [normalizedQuery, surahs]);

  return (
    <div className="space-y-5">
      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-slate-700">Search Ayahs by Translation</label>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find ayahs by English translation"
          className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-500"
        />
      </div>

      {normalizedQuery ? (
        searchResults.length ? (
          <div className="space-y-4">
            {searchResults.map((match) => (
              <Link key={`${match.surahId}-${match.id}`} href={`/surah/${match.surahId}`}>
                <div className="group cursor-pointer rounded-3xl border border-slate-200 p-4 hover:border-slate-400 hover:bg-slate-50">
                  <p className="text-sm font-semibold text-white group-hover:text-black">
                    {match.surahTransliteration} · {match.surahArabic}
                  </p>
                  <p
                    className="mt-3 text-right text-lg"
                    style={{
                      fontFamily: 'var(--arabic-font-family)',
                      fontSize: 'var(--arabic-font-size)',
                    }}
                  >
                    {match.arabic}
                  </p>
                  <p
                    className="mt-3 text-sm leading-6 text-slate-600"
                    style={{ fontSize: 'var(--translation-font-size)' }}
                  >
                    {match.translation}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No ayahs matched your search terms.</p>
        )
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {surahs.map((surah) => (
            <Link key={surah.id} href={`/surah/${surah.id}`}>
              <div className="group rounded-3xl border border-slate-200 p-4 hover:border-slate-400 hover:bg-slate-50">
                <p className="text-lg font-semibold text-white group-hover:text-black">{surah.transliteration}</p>
                <p
                  className="mt-2 text-right text-2xl"
                  style={{ fontFamily: 'var(--arabic-font-family)' }}
                >
                  {surah.arabic}
                </p>
                <p className="mt-2 text-sm text-slate-500">{surah.translation}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
