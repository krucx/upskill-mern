import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getBlogSearch } from "../../actions/blog";
import Navbarr from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Form, FormControl } from "react-bootstrap";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  getBlogSearch,
  history,
}) => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState({
    title: "",
    
  });
  history = useHistory();

  const submitSearch = (e) => {
    e.preventDefault();
    getBlogSearch(search, select);
    history.push("/blogs_search/"+search);
    setSearch("");
  };

  const authLinks = (
    <React.Fragment>
      <Nav className="ml-auto">
        <Form inline onSubmit={(e) => submitSearch(e)}>
          <FormControl
            type="text"
            placeholder="Search By"
            className="mr-sm-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Control
            as="select"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
            name="select"
          >
            <option value="title">Title</option>
            
          </Form.Control>
        </Form>

        <Nav.Link as={Link} to="/create-post">
          <i className="fas fa-plus-circle"></i> Create New Post
        </Nav.Link>

        <Nav.Link as={Link} to="/blogs">
          <i className="fas fa-book"></i> Posts
        </Nav.Link>

        <Nav.Link as={Link} to="/">
          <i className="fas fa-user"></i> Profile
        </Nav.Link>
        <Nav.Link as={Link} onClick={logout} to="/">
          <i className="fas fa-sign-out-alt"></i> Logout
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );

  const guestLinks = (
    <Nav className="ml-auto">
      <Nav.Link as={Link} to="/blogs">
        <i className="fas fa-book"></i> Posts
      </Nav.Link>
      <Link to="/login" className="btn btn-sm btn-primary m-2">
        Sign In
      </Link>
      <Link to="/register" className="btn btn-sm btn-primary m-2">
        Sign Up
      </Link>
    </Nav>
  );

  return (
    <Navbarr bg="light" expand="lg">
      <div className="container">
        <Navbarr.Brand as={Link} to="/">
          Upskill
        </Navbarr.Brand>
        <Navbarr.Toggle aria-controls="basic-navbar-nav" />
        <Navbarr.Collapse id="basic-navbar-nav">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </Navbarr.Collapse>
      </div>
    </Navbarr>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getBlogSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, getBlogSearch })(Navbar);
