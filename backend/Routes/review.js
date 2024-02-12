import express from 'express';
import { getAllReviews,createReview } from '../Controllers/reviewController.js';
import {authenticate} from '../auth/verifyToken.js';

const router = express.Router({mergeParams : true});

router
    .route('/')
    .get(getAllReviews)
    .post(authenticate,createReview);

export default router;