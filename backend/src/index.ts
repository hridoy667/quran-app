import { Hono } from 'hono';
import quran from './data/quranwithtranslation.json';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());

function transform(data: any) {
  return data.map((surah: any) => ({
    id: surah.id,
    name: surah.transliteration || `Surah ${surah.id}`,
    arabic: surah.name,
    translation: surah.translation || '',
    ayahs: (surah.verses || []).map((verse: any) => ({
      id: verse.id,
      arabic: verse.text,
      translation: verse.translation || '',
    })),
  }));
}

const formatted = transform(quran);

// Routes
app.get('/surahs', (c) => {
  return c.json(formatted);
});

app.get('/surahs/:id', (c) => {
  const id = Number(c.req.param('id'));
  const surah = formatted.find((s) => s.id === id);

  if (!surah) {
    return c.json({ message: 'Not found' }, 404);
  }

  return c.json(surah);
});

// 3. Single Export for Bun
export default {
  port: 5000,
  fetch: app.fetch,
};