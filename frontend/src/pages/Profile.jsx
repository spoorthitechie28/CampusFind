import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

function Profile() {
  const { user } = useUser();
  const myItems = useQuery(api.items.getMyItems); // Use the new query to get items

  // Helper function to format the date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {user.fullName || 'Not provided'}</p>
      <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
      
      <hr />

      <h2>My Reported Items</h2>
      
      {/* Check if items are still loading */}
      {myItems === undefined ? (
        <p>Loading your items...</p>
      ) : myItems.length > 0 ? (
        // If items exist, display them in a grid
        <div className="items-grid">
          {myItems.map((item) => (
            <div key={item._id} className="item-card">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.itemName} className="item-image" />
              ) : (
                <div className="item-image-placeholder">No Image</div>
              )}
              <div className="item-card-content">
                <h3>{item.itemName}</h3>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <span className="item-date">
                  Reported on: {formatDate(item._creationTime)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // If no items are found
        <p>You have not reported any items yet.</p>
      )}
    </div>
  );
}

export default Profile;