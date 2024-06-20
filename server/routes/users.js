const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');

router.get('/', userController.homepage);

router.get('/add', userController.addUser);
router.post('/add', userController.postUser);

router.get('/view/:id', userController.view);  //to pass id and grab it from url use ":id"

router.get('/edit/:id', userController.edit); 
router.put('/edit/:id', userController.editPost); 
router.delete('/edit/:id', userController.deleteUser); 




module.exports = router;