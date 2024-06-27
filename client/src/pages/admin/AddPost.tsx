import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addPost } from '../../stores/reducers/postReducer';
import { AppDispatch } from '../../stores/store';

interface FormData {
  title: string;
  thumbnail: string;
  category: string;
  updateAt: string;
  status: boolean;
}

const AddPost: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    thumbnail: '',
    category: '',
    updateAt: '',
    status: true,
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'status' ? value === 'published' : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addPost(formData)).then(() => {
      navigate('/admin');
    });
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin">Danh sách bài viết</Link>
        <Link to="/add">Thêm mới bài viết</Link>
      </div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <div>
          <label>Updated At:</label>
          <input type="date" name="updateAt" value={formData.updateAt} onChange={handleChange} />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status ? 'published' : 'unpublished'} onChange={handleChange}>
            <option value="published">Đã xuất bản</option>
            <option value="unpublished">Chưa xuất bản</option>
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default AddPost;
