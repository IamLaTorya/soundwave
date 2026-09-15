import { useState } from 'react';

export default function AlbumList({
  albums,
  editingId,
  onStartEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
}) {
  return (
    <ul className="album-list">
      {albums.map((album) =>
        editingId === album.id ? (
          <EditableRow
            key={album.id}
            album={album}
            onCancel={onCancelEdit}
            onSave={onUpdate}
          />
        ) : (
          <li key={album.id} className="album-card">
            <div>
              <h3 className="album-title">{album.title}</h3>
              <p className="album-meta">
                {album.artist}
                {album.year ? ` · ${album.year}` : ''}
              </p>
            </div>

            <div className="album-actions">
              {onStartEdit && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => onStartEdit(album.id)}
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className="delete-button"
                  onClick={() => onDelete(album.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </li>
        )
      )}
    </ul>
  );
}

function EditableRow({ album, onCancel, onSave }) {
  const [draft, setDraft] = useState({
    title: album.title,
    artist: album.artist,
    year: album.year ?? '',
  });
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setDraft((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSave() {
    if (isSaving) return;
    setIsSaving(true);

    // Send ONLY what actually changed. That is what PATCH means.
    const changes = {};
    if (draft.title !== album.title) changes.title = draft.title;
    if (draft.artist !== album.artist) changes.artist = draft.artist;

    const newYear = draft.year === '' ? undefined : Number(draft.year);
    if (newYear !== album.year) changes.year = newYear;

    // Nothing changed — no need to bother the server.
    if (Object.keys(changes).length === 0) {
      setIsSaving(false);
      onCancel();
      return;
    }

    await onSave(album.id, changes);
    setIsSaving(false);
  }

  return (
    <li className="album-card editing">
      <div className="edit-fields">
        <input name="title" value={draft.title} onChange={handleChange} />
        <input name="artist" value={draft.artist} onChange={handleChange} />
        <input name="year" type="number" value={draft.year} onChange={handleChange} />
      </div>

      <div className="album-actions">
        <button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" className="secondary-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </li>
  );
}
