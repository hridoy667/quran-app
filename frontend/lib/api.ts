import quranData from './quranwithtranslation.json';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const transformSurah = (surah: any) => ({
  id: surah.id,
  name: surah.transliteration || `Surah ${surah.id}`,
  arabic: surah.name,
  translation: surah.translation || '',
  transliteration: surah.transliteration || `Surah ${surah.id}`,
  ayahs: (surah.verses || []).map((verse: any) => ({
    id: verse.id,
    arabic: verse.text,
    translation: verse.translation || '',
  })),
});

export async function getSurahs() {
  if (!BASE_URL) {
    return quranData.map(transformSurah);
  }

  const res = await fetch(`${BASE_URL}/surahs`);

  if (!res.ok) {
    throw new Error('Failed to fetch surahs');
  }

  return res.json();
}

export async function getSurah(id: any) {
  if (!BASE_URL) {
    const surah = quranData.find((item) => item.id === Number(id));
    if (!surah) {
      return null;
    }

    return transformSurah(surah);
  }

  const res = await fetch(`${BASE_URL}/surahs/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch surah');
  }

  return res.json();
}
