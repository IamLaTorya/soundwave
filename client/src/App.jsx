import { useState, useEffect } from 'react';
import { getAlbums, createAlbum, updateAlbum, deleteAlbum } from './api.js';
import AlbumList from './components/AlbumList.jsx';
import AlbumForm from './components/AlbumForm.jsx';
import SearchBar from './components/SearchBar.jsx';

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null);

  // What the user has typed in the search box.
  const [search, setSearch] = useState('');

  // Which album is currently being edited. null = nobody.
  //
  // Note where this lives: "am I being edited" is a fact about the
  // SCREEN, not about the album, so it belongs in component state,
  // not in the data from the server.
  const [editingId, setEditingId] = useState(null);

  async function loadAlbums(searchTerm = search) {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getAlbums(searchTerm);
      setAlbums(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Re-runs whenever `search` changes.
  useEffect(() => {
    loadAlbums(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // -------------------------------------------------------------
  // CREATE
  // -------------------------------------------------------------
  async function handleCreate(newAlbum) {
    try {
      setFormError(null);
      await createAlbum(newAlbum);
      await loadAlbums();
      return true;
    } catch (err) {
      setFormError(err.message);
      return false;
    }
  }

  // -------------------------------------------------------------
  // UPDATE
  // -------------------------------------------------------------
  async function handleUpdate(id, changes) {
    try {
      // TODO (LAB 4a): send only the changed fields, then reload
      // and close the editor.
      //
      await updateAlbum(id, changes);
      await loadAlbums();
      setEditingId(null);

      return true;
    } catch (err) {
      setError(err.message);
      // Note: we do NOT close the editor here. A failed save should
      // never throw away what the user typed.
      return false;
    }
  }

  // -------------------------------------------------------------
  // DELETE
  // -------------------------------------------------------------
  async function handleDelete(id) {
    if (!window.confirm('Delete this album?')) return;

    try {
      await deleteAlbum(id);
      await loadAlbums();
    } catch (err) {
      setError(err.message);
      loadAlbums();
    }
  }

  // Two different reasons the list can be empty, two different messages.
  const isSearching = search.trim() !== '';

  return (
    <div className="page">
      <header className="page-header">
        <h1>SoundWave</h1>
        <p className="subtitle">My album collection</p>
      </header>

      <main>
        <AlbumForm onSubmit={handleCreate} error={formError} />

        <SearchBar value={search} onChange={setSearch} />

        {isLoading && <p className="status">Loading albums…</p>}

        {error && (
          <p className="status error">Could not load albums: {error}</p>
        )}

        {!isLoading && !error && albums.length === 0 && (
          <p className="status">
            {isSearching
              ? `No albums match "${search}".`
              : 'No albums yet. Add your first one above!'}
          </p>
        )}

        {!isLoading && !error && albums.length > 0 && (
          <AlbumList
            albums={albums}
            editingId={editingId}
            onStartEdit={setEditingId}
            onCancelEdit={() => setEditingId(null)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}