import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMultipleRecipeRatings, StarRating } from '../../services/ratingService';
import './List.css';

const List = ({ items }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState({});
  const navigate = useNavigate();

  // Fetch ratings for all recipes when items change
  useEffect(() => {
    if (items && items.length > 0) {
      const recipeIds = items.map(item => item.id);
      getMultipleRecipeRatings(recipeIds).then(ratingsData => {
        setRatings(ratingsData);
      });
    }
  }, [items]);

  // Filter items based on the search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: '0.5em', marginBottom: '1em', width: '100%' }}
      />

      {/* Recipe cards */}
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="recipe-card"
          onClick={() => setSelected(item)}
        >
          {/* Display recipe image if available */}
          {item.image && (
            <img
              src={item.image.url()}
              alt={item.name}
              className="recipe-image"
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1em' }}
              onError={(e) => {
                e.target.style.display = 'none';
                console.log('Failed to load image for recipe:', item.name);
              }}
            />
          )}
          {/* Show first image from images array if no single image */}
          {!item.image && item.images && item.images.length > 0 && (
            <img
              src={item.images[0].url()}
              alt={item.name}
              className="recipe-image"
              style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1em' }}
              onError={(e) => {
                e.target.style.display = 'none';
                console.log('Failed to load image for recipe:', item.name);
              }}
            />
          )}
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p><em>by {item.author}</em></p>
          
          {/* Display rating */}
          <div style={{ marginTop: '0.5em' }}>
            {ratings[item.id] ? (
              <StarRating 
                rating={ratings[item.id].averageRating} 
                totalReviews={ratings[item.id].totalReviews}
                showCount={true}
              />
            ) : (
              <div style={{ color: '#999', fontSize: '0.9em' }}>Loading rating...</div>
            )}
          </div>
        </div>
      ))}

      {/* Modal for selected recipe */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {/* Display recipe details */}
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            
            {/* Display rating in modal */}
            <div style={{ marginBottom: '1em' }}>
              {ratings[selected.id] ? (
                <StarRating 
                  rating={ratings[selected.id].averageRating} 
                  totalReviews={ratings[selected.id].totalReviews}
                  showCount={true}
                />
              ) : (
                <div style={{ color: '#999', fontSize: '0.9em' }}>Loading rating...</div>
              )}
            </div>
            
            <h4>Ingredients:</h4>
            <ul>{selected.ingredients?.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
            <h4>Method:</h4>
            <ol>{selected.method?.map((m, idx) => <li key={idx}>{m}</li>)}</ol>

            {/* Navigate to full recipe page */}
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
