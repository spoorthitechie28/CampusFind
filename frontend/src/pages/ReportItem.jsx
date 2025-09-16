import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';

function ReportItem() {
  const generateUploadUrl = useMutation(api.items.generateUploadUrl);
  const createItem = useMutation(api.items.createItem);
  const navigate = useNavigate();

  const [type, setType] = useState('lost');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !category || !location) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);

    try {
      let storageId = null;
      if (selectedFile) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: 'POST',
          headers: { 'Content-Type': selectedFile.type },
          body: selectedFile,
        });
        const { storageId: uploadedStorageId } = await result.json();
        storageId = uploadedStorageId;
      }

      await createItem({
        type,
        itemName,
        category,
        description,
        location,
        storageId: storageId || undefined,
      });

      alert('Item reported successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to report item:', error);
      alert('Failed to report item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-side">
        <div className="auth-image-text">
          <h2>Help Us Reunite Items With Their Owners</h2>
          <p>Your detailed report can make all the difference. Please provide as much information as possible to help our community.</p>
        </div>
      </div>
      <div className="auth-form-side">
        <div className="form-container-box">
          <h1>Report an Item</h1>
          <form onSubmit={handleSubmit} className="report-form">
            {/* Item type */}
            <div className="form-group">
              <label htmlFor="type">This item is...</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
            </div>
            {/* Item Name */}
            <div className="form-group">
              <label htmlFor="itemName">Item Name</label>
              <input id="itemName" type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
            </div>
            {/* Category */}
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input id="category" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Last Known Location</label>
              <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            {/* Description */}
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            {/* Image Upload */}
            <div className="form-group">
              <label htmlFor="image">Upload Image (Optional)</label>
              <input id="image" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
            </div>
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportItem;