import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './List.css';

const List = ({ items }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5em', marginBottom: '1em', width: '100%' }}
      />

      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="recipe-card"
          onClick={() => setSelected(item)}
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p><em>by {item.author}</em></p>
        </div>
      ))}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <h4>Ingredients:</h4>
            <ul>{selected.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
            <h4>Method:</h4>
            <ol>{selected.method?.map((m, idx) => <li key={idx}>{m}</li>)}</ol>
            <button onClick={() => navigate(`/recipe/${selected.id}`)}>
              View Full Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
