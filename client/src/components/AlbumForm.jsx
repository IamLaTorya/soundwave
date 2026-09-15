import { useState } from 'react';

const EMPTY_FORM = { title: '', artist: '', year: '' };

export default function AlbumForm({ onSubmit, error }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    // IMPORTANT #1
    // Without this line, the browser does its default form behaviour:
    // a full page reload. Everything on screen resets.
    event.preventDefault();

    // Stops a double-click creating two albums. POST is not idempotent:
    // two requests means two albums.
    if (isSaving) return;

    setIsSaving(true);

    // IMPORTANT #2
    // Everything typed into an input is a STRING, even in a number
    // field. Your backend checks typeof year === 'number' and would
    // reject "1991" with a 400. So convert it here.
    const payload = {
      title: form.title,
      artist: form.artist,
      year: form.year === '' ? undefined : Number(form.year),
    };

    const succeeded = await onSubmit(payload);

    // Only clear on success — a failed save should not destroy the
    // user's typing.
    if (succeeded) setForm(EMPTY_FORM);
    setIsSaving(false);
  }

  return (
    <form className="album-form" onSubmit={handleSubmit}>
      <h2>Add an album</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-row">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Nevermind"
        />
      </div>

      <div className="form-row">
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          value={form.artist}
          onChange={handleChange}
          placeholder="Nirvana"
        />
      </div>

      <div className="form-row">
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          placeholder="1991"
        />
      </div>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving…' : 'Add album'}
      </button>
    </form>
  );
}
