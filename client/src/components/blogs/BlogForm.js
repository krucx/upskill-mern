import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addBlog } from "../../actions/blog";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "Other",
    tags: "",
    fees:0,
  });

  const [photoData, setPhotoData] = useState("");

  const { title, body, category, tags, fees } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoData(e.target.files[0]);
  };

  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();

    addBlog(formData, photoData);
    setFormData({
      title: "",
      body: "",
      category: "",
      tags: "",
      fees:0,
    });
    setPhotoData("");
    history.push("/blogs");
  };

  return (
    <div className="blog-form mt-2">
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community
      </p>
      <div className="bg-primary text-light p-2 p">
        <h3>Create New Post</h3>
      </div>
      <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fees">Fees</label>
            <input
              type="number"
              min={0}
              className="form-control"
              id="fees"
              name="fees"
              required
              value={fees}
              onChange={(e) => onChange(e)}
            />
          </div>

          <label htmlFor="body">Description</label>
          <textarea
            className="form-control"
            id="body"
            rows={6}
            required
            name="body"
            value={body}
            onChange={(e) => onChange(e)}
          />
          <div className="form-group mt-2">
            <label htmlFor="select">Select Category</label>
            <select
              className="form-control"
              name="category"
              id="select"
              required
              value={category}
              onChange={(e) => onChange(e)}
            >
              <option selected value="Engineering">
                Engineeering
              </option>
              <option value="Medical">Medical</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts</option>
              <option value="Acedemic">Acedemic</option>
              <option value="Non-Acedemic">Non-Acedemic</option>
              <option value="Other">Other</option>
            </select>
          </div>
          

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Upload Image</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="photo"
                name="photoData"
                onChange={(e) => handlePhotoChange(e)}
                required
              />
              <label className="custom-file-label" htmlFor="photo">
                Choose file
              </label>
            </div>
          </div>
        </div>

        <button className="btn btn-dark my-1" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default connect(null, {})(BlogForm);
