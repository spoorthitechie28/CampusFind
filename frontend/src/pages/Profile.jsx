import React from 'react';
import { useUser } from "@clerk/clerk-react";

function Profile() {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.primaryEmailAddress.emailAddress}</p>
      
      <hr />

      <h2>My Reported Items</h2>
      <p>This is where a list of items you have reported will appear.</p>
    </div>
  );
}

export default Profile;
