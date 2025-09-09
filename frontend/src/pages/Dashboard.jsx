import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function Dashboard() {
  const items = useQuery(api.items.getItems);

  const lostItems = items?.filter((item) => item.type === 'lost');
  const foundItems = items?.filter((item) => item.type === 'found');

  // Helper function to format the date
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container">
      <div className="dashboard-section">
        <div className="dashboard-header">
          <h2>Lost Items</h2>
        </div>
        <div className="items-grid">
          {lostItems && lostItems.length > 0 ? (
            lostItems.map((item) => (
              <div key={item._id} className="item-card">
                {/* --- DISPLAY IMAGE HERE --- */}
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                ) : (
                  <div className="item-image-placeholder">No Image</div>
                )}
                <div className="item-card-content">
                  <h3>{item.itemName}</h3>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <span className="item-date">Lost on: {formatDate(item.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No lost items have been reported yet.</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <div className="dashboard-header">
          <h2>Found Items</h2>
        </div>
        <div className="items-grid">
          {foundItems && foundItems.length > 0 ? (
            foundItems.map((item) => (
              <div key={item._id} className="item-card">
                {/* --- DISPLAY IMAGE HERE --- */}
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.itemName} className="item-image" />
                ) : (
                  <div className="item-image-placeholder">No Image</div>
                )}
                <div className="item-card-content">
                  <h3>{item.itemName}</h3>
                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <span className="item-date">Found on: {formatDate(item.createdAt)}</span>
                </div>
              </div>
            ))
          ) : (
            <p>No found items have been reported yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

