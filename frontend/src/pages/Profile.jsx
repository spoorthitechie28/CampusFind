import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { useQuery, useMutation } from 'convex/react'; // Import useMutation
import { api } from '../../convex/_generated/api';
import { Link } from 'react-router-dom';

function Profile() {
  const { user } = useUser();
  const myItems = useQuery(api.items.getMyItems);
  const updateItemStatus = useMutation(api.items.updateItemStatus);
  const deleteItem = useMutation(api.items.deleteItem);

  const handleUpdateStatus = (itemId, newStatus) => {
    updateItemStatus({ itemId, status: newStatus });
  };

  const handleDelete = (itemId) => {
    if (window.confirm("Are you sure you want to permanently delete this item?")) {
      deleteItem({ itemId });
    }
  };

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
    <div className="profile-container">
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {user.fullName || 'Not provided'}</p>
      <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
      
      <hr />

      <h2>My Reported Items</h2>
      
      {myItems === undefined ? (
        <p>Loading your items...</p>
      ) : myItems.length > 0 ? (
        <div className="items-grid">
          {myItems.map((item) => (
            <div key={item._id} className="item-card">
              {item.imageUrl && <img src={item.imageUrl} alt={item.itemName} className="item-image" />}
              <div className="item-card-content">
                <h3>{item.itemName}</h3>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <span className="item-date">
                  Reported on: {formatDate(item._creationTime)}
                </span>
                {/* Link to view messages for this item */}
                <Link to={`/item/${item._id}`} className="view-messages-link">
                  View Messages
                </Link>
              </div>
              <div className="item-card-actions">
                {item.status === 'Available' ? (
                  <button onClick={() => handleUpdateStatus(item._id, 'Claimed')} className="action-button claim-button">
                    Mark as Claimed
                  </button>
                ) : (
                  <button onClick={() => handleUpdateStatus(item._id, 'Available')} className="action-button available-button">
                    Mark as Available
                  </button>
                )}
                <button onClick={() => handleDelete(item._id)} className="action-button delete-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not reported any items yet.</p>
      )}
    </div>
  );
}

export default Profile;