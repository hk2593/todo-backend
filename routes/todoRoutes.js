const express=require('express');
const router=express.Router();
const {getTodos,createTodos,changeStatus,updateTodo}=require('../controllers/todos')
const verifyToken=require('../middlewares/middleware')

router.get('/getTodos',verifyToken,getTodos);
router.post('/createTodos',verifyToken,createTodos);
router.patch('/changeStatus',verifyToken,changeStatus);
router.patch('/updateTodo',verifyToken,updateTodo);

module.exports=router;