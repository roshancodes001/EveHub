import express from 'express';
import {updateOrganiser,deleteOrganiser,getAllOrganiser,getSingleOrganiser} from '../Controllers/organiserController.js';
import { authenticate } from '../auth/verifyToken.js';
import reviewRouter from './review.js';


const router=express.Router()

//nested route to review different organiers
router.use("/:organiserId/reviews",reviewRouter);


router.get('/:id',getSingleOrganiser)
router.get('/',getAllOrganiser)
router.put('/:id',authenticate,updateOrganiser)
router.delete('/:id',authenticate,deleteOrganiser)

export default router;


