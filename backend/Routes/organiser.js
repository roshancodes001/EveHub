import express from 'express';
import {updateOrganiser,deleteOrganiser,getAllOrganiser,getSingleOrganiser} from '../Controllers/organiserController.js';

const router=express.Router()

router.get('/:id',getSingleOrganiser)
router.get('/',getAllOrganiser)
router.put('/:id',updateOrganiser)
router.delete('/:id',deleteOrganiser)

export default router;


