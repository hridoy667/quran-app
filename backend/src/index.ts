import { Hono } from 'hono';
import quran from './data/quran.json';
import { cors } from 'hono/cors';

const app = new Hono();
app.use('*', cors());
// Transform function
function transform(data: any) {
  return Object.keys(data).map((key) => ({
    id: Number(key),
    name: `Surah ${key}`,
    arabic: '',
    ayahs: data[key].map((ayah: any) => ({
      id: ayah.verse,
      arabic: ayah.text,
      translation: '',
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