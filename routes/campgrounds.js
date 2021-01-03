const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const { validateCampground, isLoggedIn, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground))
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send("It worked");
    })
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;