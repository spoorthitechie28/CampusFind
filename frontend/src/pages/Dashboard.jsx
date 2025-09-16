import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'; // Import Link to create clickable buttons

function Dashboard() {
  const { user } = useUser();
  const items = useQuery(api.items.getItems);

  const lostItems = items?.filter((item) => item.type === 'lost');
  const foundItems = items?.filter((item) => item.type === 'found');

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (items === undefined) {
    return <div>Loading items...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.firstName || 'User'}! Here are the latest reported items.</p>
      </div>

      <div className="dashboard-section">
        <h2>Lost Items</h2>
        <div className="items-grid">
          {lostItems && lostItems.length > 0 ? (
            lostItems.map((item) => (
              <div key={item._id} className="item-card">
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
                  <span className="item-date">Lost on: {formatDate(item._creationTime)}</span>
                </div>
                {/* --- THIS IS THE NEW PART --- */}
                <div className="item-card-footer">
                  <Link to={`/item/${item._id}`} className="contact-button">
                    View Details & Contact Owner
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No lost items have been reported yet.</p>
          )}
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Found Items</h2>
        <div className="items-grid">
          {foundItems && foundItems.length > 0 ? (
            foundItems.map((item) => (
              <div key={item._id} className="item-card">
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
                  <span className="item-date">Found on: {formatDate(item._creationTime)}</span>
                </div>
                {/* --- THIS IS THE NEW PART --- */}
                <div className="item-card-footer">
                  <Link to={`/item/${item._id}`} className="contact-button">
                    View Details & Contact Owner
                  </Link>
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