import express from 'express';
import { randomUUID } from 'node:crypto';
import { albums } from './data.js';

const app = express();
const PORT = 5000;

// ---------------------------------------------------------------
// 1. MIDDLEWARE  (runs on every request, before the routes)
// ---------------------------------------------------------------

app.use(express.json());

// ---------------------------------------------------------------
// 2. ROUTES
// ---------------------------------------------------------------

app.get('/', (req, res) => {
  res.send('The SoundWave server is running!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// READ ALL  ------------------------------------------------------
// GET /api/albums
// GET /api/albums?artist=nirv     (partial, case-insensitive)
app.get('/api/albums', (req, res) => {
  const { artist } = req.query;

  if (artist) {
    const search = artist.toLowerCase();
    const filtered = albums.filter((album) =>
      album.artist.toLowerCase().includes(search)
    );
    // An empty result is a SUCCESSFUL search that found nothing.
    // 200 with [], never 404.
    return res.json(filtered);
  }

  res.json(albums);
});

// READ ONE  ------------------------------------------------------
app.get('/api/albums/:id', (req, res) => {
  const album = albums.find((a) => a.id === req.params.id);

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  res.json(album);
});

// CREATE  --------------------------------------------------------
app.post('/api/albums', (req, res) => {
  const { title, artist, year } = req.body;

  // Guard clauses: handle the bad cases first, return early.
  if (!title || !artist) {
    return res.status(400).json({ message: 'Title and artist are required' });
  }

  if (year !== undefined && (typeof year !== 'number' || year < 1900 || year > 2100)) {
    return res
      .status(400)
      .json({ message: 'Year must be a number between 1900 and 2100' });
  }

  const newAlbum = {
    id: randomUUID(), // the SERVER owns ids. Never take one from req.body.
    title,
    artist,
    year,
  };

  albums.push(newAlbum);

  // 201 Created, and return the new album so the client knows its id.
  res.status(201).json(newAlbum);
});

// UPDATE (partial)  ----------------------------------------------
app.patch('/api/albums/:id', (req, res) => {
  const album = albums.find((a) => a.id === req.params.id);

  if (!album) {
    return res.status(404).json({ message: 'Album not found' });
  }

  const { title, artist, year } = req.body;

  if (title !== undefined && !title.trim()) {
    return res.status(400).json({ message: 'Title cannot be empty' });
  }
  if (artist !== undefined && !artist.trim()) {
    return res.status(400).json({ message: 'Artist cannot be empty' });
  }
  if (year !== undefined && (typeof year !== 'number' || year < 1900 || year > 2100)) {
    return res
      .status(400)
      .json({ message: 'Year must be a number between 1900 and 2100' });
  }

  // PATCH only touches fields that were actually sent.
  if (title !== undefined) album.title = title;
  if (artist !== undefined) album.artist = artist;
  if (year !== undefined) album.year = year;

  res.json(album);
});

// DELETE  --------------------------------------------------------
app.delete('/api/albums/:id', (req, res) => {
  const index = albums.findIndex((a) => a.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Album not found' });
  }

  albums.splice(index, 1);

  // 204 No Content — nothing to send back.
  // Do NOT use res.json() here. A 204 must have an empty body.
  res.status(204).send();
});

// ---------------------------------------------------------------
// 3. CATCH-ALL 404  (after all routes)
// ---------------------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    message: `No route for ${req.method} ${req.originalUrl}`,
  });
});

// ---------------------------------------------------------------
// 4. ERROR HANDLER  (FOUR parameters, always last)
// ---------------------------------------------------------------

app.use((err, req, res, next) => {
  console.error(err); // details go to YOUR terminal
  res.status(500).json({ message: 'Something went wrong on the server' });
});

// ---------------------------------------------------------------
// 5. START LISTENING
// ---------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
