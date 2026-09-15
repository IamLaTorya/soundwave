import { useState, useEffect } from 'react';
import { getAlbums } from './api.js';
import AlbumList from './components/AlbumList.jsx';

export default function App() {
  // The three pieces of state every screen that loads data needs.
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect with [] means: run once, when the page first appears.
  useEffect(() => {
    // useEffect itself cannot be async, so we define a function inside.
    async function loadAlbums() {
      try {
        setIsLoading(true);
        setError(null);

        // ===== TODO (LAB 2) =================================
        // Call getAlbums() and put the result in state.
        //
        //   const data = await getAlbums();
        //   setAlbums(data);
        // ====================================================
        await getAlbums();
      } catch (err) {
        setError(err.message);
      } finally {
        // Runs whether it worked or failed.
        // Without this, a failed request leaves the spinner forever.
        setIsLoading(false);
      }
    }

    loadAlbums();
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h1>SoundWave</h1>
        <p className="subtitle">My album collection</p>
      </header>

      <main>
        {/* THE FOUR STATES. Every one of these matters. */}

        {isLoading && <p className="status">Loading albums…</p>}

        {error && <p className="status error">Could not load albums: {error}</p>}

        {!isLoading && !error && albums.length === 0 && (
          <p className="status">No albums yet.</p>
        )}

        {!isLoading && !error && albums.length > 0 && (
          <AlbumList albums={albums} />
        )}
      </main>
    </div>
  );
}
