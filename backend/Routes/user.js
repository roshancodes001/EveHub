import express from 'express';
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    getUserProfile,
    getMyAppointments
} from '../Controllers/userController.js';

import { authenticate  } from '../auth/verifyToken.js'; 

const router=express.Router()

router.get('/:id',authenticate,getSingleUser)
router.get('/',authenticate,getAllUser)
router.put('/:id',authenticate,updateUser)
router.delete('/:id',authenticate,deleteUser)
router.get('/profile/me', authenticate, getUserProfile);
router.get('/appointments/my-appointments', authenticate, getMyAppointments);


export default router;


