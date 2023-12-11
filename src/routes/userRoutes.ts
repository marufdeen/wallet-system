import { Router } from 'express';
import userController from '../controllers/userController'
import auth from  '../middlewares/auth'; 
 const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile',auth.verifyToken , userController.myProfile)
 
export default router;