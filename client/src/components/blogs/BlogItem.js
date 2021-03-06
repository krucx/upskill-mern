import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteBlog } from "../../actions/blog";
import PropTypes from "prop-types";

function getBloggImageUrl(imageBuffer) {
  try {
    return `data:image/jpg;base64,${btoa(
      new Uint8Array(imageBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    )}`;
  } catch (error) {
    console.log(error);
  }
}

const BlogItem = ({
  auth,
  addLike,
  removeLike,
  deleteBlog,
  blog: {
    _id,
    title,
    body,
    name,
    avatar,
    user,
    photo,
    category,
    tags,
    likes,
    fees,
    comments,
    date,
  },
  showActions, isAlone = false
}) => {

  const newName = isAlone? (name): (name?.substring(0, 6) + (name?.length > 6? ('...'):""));
  return (
    <div className="row p-1 my-1 bg-light">
      <div className="col-sm-1">
        <Link to={`/profile/user/${user}`}>
          <img className="rounded-circle shadow m-2" src={avatar} alt="" width={'100%'} />
          <h6 className="text-center m-2 text-primary">{newName}</h6>
        </Link>
      </div>

      <div className="col-sm-9 m-2">
        <Link to={`/blogs/${_id}`} className="text-dark font-weight-bold">
          {title}
        </Link>
        <span className="badge badge-success ml-4">{category}</span>
        { isAlone && 
        (<><hr className="divider divider-fade divider-dark my-3" />
        <img
          src={getBloggImageUrl(photo?.data)}
          className="img-fluid"
          alt="Blog"
        />
        <hr className="divider divider-fade divider-dark my-3" /></>)
        }

        <p className="my-1">{body}</p>
        <p>
          <span className="font-weight-bold">Posted on </span>
          <Moment format="DD/MM/YYYY">{date}</Moment>
          {tags?.map((tag) => (
            <span key={tag} className="badge badge-primary m-1">
              {tag}
            </span>
          ))}
        </p>
        <h4>FEES: {fees}</h4>
        {!auth.loading && showActions && (
          <Fragment>
            {/* <button
              onClick={(e) => addLike(_id)}
              className="btn btn-primary mr-1"
            >
              <i className="fas fa-thumbs-up " />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={(e) => removeLike(_id)}
              className="btn btn-secondary mr-2"
            >
              <i className="fas fa-thumbs-down " />
            </button> */}
            <Link to={`/blogs/${_id}`} className="btn btn-primary mr-1">
              View Comments
              {comments.length > 0 && (
                <span className="badge badge-light m-1">{comments.length}</span>
              )}
            </Link>

            {!auth.loading && user === auth.user._id && (
              <button
                onClick={(e) => deleteBlog(_id)}
                type="button"
                className="btn btn-danger mr-2"
              >
                <i className="fas fa-trash" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

BlogItem.defaultProps = {
  showActions: true,
};

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deleteBlog,
})(BlogItem);
