import  { Router } from 'express'
import  login  from '../controllers/auth/login'
import signup from '../controllers/auth/create-account'


const router: Router = Router()

// router.post('/auth/login', login)
router.post('/auth/signup', signup)
router.post('/auth/login', login)

export default router;


