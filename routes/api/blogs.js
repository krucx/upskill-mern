const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Blog = require("../../models/Blog");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const multer = require("multer");
const sharp = require("sharp");

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return new Error("please upload an image");
    }
    cb(undefined, true);
  },
});

// @route   POST api/blogs
// @desc    Create Blog
// @access  private
router.post(
  "/",

  [
    auth,
    upload.single("photo"),
    // [
    //   check("title", "Title is required")
    //     .not()
    //     .isEmpty()
    //     .isLength({ min: 3, max: 150 }),
    //   check("body", "Body is required")
    //     .not()
    //     .isEmpty()
    //     .isLength({ min: 50, max: 1000 }),
    //   check("category", "Category is Required").not().isEmpty(),
    //   check("tags", "Tags is Required").not().isEmpty(),
    //   check("photo", "Photo is Required").not().isEmpty(),
    // ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const buffer = await sharp(req.file.buffer)
        .resize({ width: 1000, height: 500 })
        .png()
        .toBuffer();
      const b = JSON.parse(req.body.blog);
      // req.body.photo = buffer;
      const newBlog = new Blog({
        title: b.title,
        body: b.body,
        photo: req.file.buffer,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        category: b.category,
        tags: b.tags.split(",").map((tag) => tag.trim()),
        fees: b.fees,
      });

      const blog = await newBlog.save();
      res.json(blog);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/blogs
// @desc    Get all blogs
// @access  public

router.get("/", async (req, res) => {
  try {
    const start = +req.query.start;
    const size = +req.query.size;
    const blogs = await Blog.find().skip(start).limit(size).sort({ date: -1 });

    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/blogs/:id
// @desc    Get blog by id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind !== "ObjectId") {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/blogs/:id
// @desc    Delete a blog
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Check blog
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    // Check user
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not authorized" });
    }
    await blog.remove();
    res.json({ msg: "Blog removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind !== "ObjectId") {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/blogs/like/:id
// @desc    Like a blog
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Check if the blog is liked by a user
    if (
      blog.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Blog already liked" });
    }
    blog.likes.unshift({ user: req.user.id });

    await blog.save();
    res.json(blog.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/blogs/unlike/:id
// @desc    Unlike a blog
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    // Check if the blog is not liked by a user
    if (
      blog.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Blog is not liked yet" });
    }

    const removeIndex = blog.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    blog.likes.splice(removeIndex, 1);
    await blog.save();
    res.json(blog.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/blogs/comment/:id
// @desc    Comment on a blog
// @access  private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const blog = await Blog.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      blog.comments.unshift(newComment);

      await blog.save();
      res.json(blog.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/blogs/comment/:id/:comment_id
// @desc    Delete comment
// @access  private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Get blog
    const blog = await Blog.findById(req.params.id);

    // Get comment
    const comment = blog.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Check exists comment
    if (!comment) {
      return res.status(404).json({ msg: "Comment is not exist " });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User is not Authorized " });
    }

    const removeIndex = blog.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    blog.comments.splice(removeIndex, 1);

    await blog.save();
    res.json(blog.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
