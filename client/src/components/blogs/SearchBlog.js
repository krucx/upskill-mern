import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import BlogItem from "./BlogItem";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import TYPES from "../../actions/types";

const SearchBlog = ({

}) => {
const [blogs, setBlogs] = useState([]);
const {keyword} = useParams();
const dispatch = useDispatch();

const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


useEffect(async ()=>{
  try{
    const res = await fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({keyword})
    })

    const data = await res.json()
    console.log(data)

    setBlogs(data)
    // console.log("DATA: ", data)
    // dispatch({
    //   type: TYPES.GET_SEARCH,
    //   payload: data,
    // });
  }
  catch(err) {
    // dispatch({
    //   type: TYPES.BLOG_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
    console.log("ERROR: ", err)
  }
},[keyword])
  return <Fragment><h1>Search page</h1>
  {
      blogs.length && (<div>
        {blogs.map((blog) => (
          <BlogItem key={blog._id} blog={blog} />
        ))}
      </div>)
  }
  </Fragment>
};

SearchBlog.propTypes = {
  getBlogs: PropTypes.func.isRequired,
  getBlogSearch: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blog  
});

export default connect(mapStateToProps)(SearchBlog);

