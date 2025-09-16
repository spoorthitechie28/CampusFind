import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';

// A component for a single conversation thread
function ConversationThread({ messages, ownerId, contactId, itemId }) {
  const { user } = useUser();
  const sendMessage = useMutation(api.items.sendMessage);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // If the current user is the owner, they are replying to the contact person.
    // Otherwise, they are the contact person replying to the owner.
    const recipient = user.id === ownerId ? contactId : ownerId;

    try {
      await sendMessage({
        text: replyText,
        itemId: itemId,
        toUserId: recipient,
      });
      setReplyText("");
    } catch (error) {
      alert("Error sending reply: " + error.message);
    }
  };

  return (
    <div className="conversation-thread">
      <div className="message-list">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`message ${msg.fromUserId === user.id ? 'my-message' : 'other-message'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleReply} className="message-form">
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply..."
          rows="3"
          required
        />
        <button type="submit" className="submit-button">Reply</button>
      </form>
    </div>
  );
}

function ItemDetails() {
  const { itemId } = useParams();
  const { user } = useUser();
  
  const item = useQuery(api.items.getItem, { itemId });
  const allMessages = useQuery(api.items.getMessagesForItem, { itemId });
  
  if (!item || !user) return <div>Loading...</div>;

  const isOwner = user.id === item.clerkUserId;

  // Group messages into conversations if you are the owner
  const conversations = {};
  if (isOwner && allMessages) {
    allMessages.forEach(msg => {
      const contactId = msg.fromUserId === user.id ? msg.toUserId : msg.fromUserId;
      if (!conversations[contactId]) {
        conversations[contactId] = [];
      }
      conversations[contactId].push(msg);
    });
  }

  return (
    <div className="item-details-container">
      <div className="item-card item-details-card">
        {/* Item details remain the same */}
        {item.imageUrl && <img src={item.imageUrl} alt={item.itemName} className="item-image" />}
        <div className="item-card-content">
          <h3>{item.itemName}</h3>
          <p><strong>Description:</strong> {item.description}</p>
        </div>
      </div>

      <div className="messaging-container">
        <h2>Messages</h2>
        {isOwner ? (
          // OWNER'S VIEW
          Object.keys(conversations).length > 0 ? (
            Object.entries(conversations).map(([contactId, messages]) => (
              <div key={contactId}>
                <h4>Conversation with User ({contactId.substring(5, 11)})</h4>
                <ConversationThread
                  messages={messages}
                  ownerId={user.id}
                  contactId={contactId}
                  itemId={item._id}
                />
              </div>
            ))
          ) : (
            <p>No messages about this item yet.</p>
          )
        ) : (
          // NON-OWNER'S VIEW
          <ConversationThread
            messages={allMessages || []}
            ownerId={item.clerkUserId}
            contactId={user.id}
            itemId={item._id}
          />
        )}
      </div>
    </div>
  );
}

export default ItemDetails;