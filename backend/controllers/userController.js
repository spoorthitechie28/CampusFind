const User = require('../models/User');

// This function will be called by a Clerk webhook when a user is created or updated.
exports.syncUser = async (req, res) => {
  // We get the user data from the request body sent by Clerk
  const { id: clerkUserId, first_name, last_name, email_addresses } = req.body.data;

  if (!clerkUserId || !email_addresses || email_addresses.length === 0) {
    return res.status(400).json({ message: 'Missing required user data from webhook.' });
  }

  const primaryEmail = email_addresses.find(email => email.verification.status === 'verified')?.email_address;

  if (!primaryEmail) {
    return res.status(400).json({ message: 'No verified email address found for the user.' });
  }

  try {
    // Find a user in our DB by their Clerk ID, and if they don't exist, create them.
    // This is called an "upsert" operation.
    const user = await User.findOneAndUpdate(
      { clerkUserId: clerkUserId }, // The condition to find the user
      {
        // The data to set if the user is found or to create if they are not
        $set: {
          clerkUserId: clerkUserId,
          name: `${first_name || ''} ${last_name || ''}`.trim(),
          email: primaryEmail,
        },
      },
      { new: true, upsert: true } // Options: return the new doc, and create if it doesn't exist
    );

    res.status(200).json({ message: 'User synced successfully', user });
  } catch (error) {
    console.error('Error syncing user:', error);
    res.status(500).json({ message: 'Error syncing user data.' });
  }
};

