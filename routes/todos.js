const {Router} = require('express');
const Todo = require('../services/todos');
const asyncHandler = require('express-async-handler');
const requireLoggedIn = require('../middlewares/requireLoggedIn')
const router = new Router();

router.use(requireLoggedIn);

router.get('/', asyncHandler(async function(req,res){
    const todolist = await Todo.findAllNotDone(req.currentUser.id);
    res.render('todos',{todolist});
}));

router.get('/:id/done', asyncHandler(async function(req,res){
    const { id }  = req.params;
    const todo = await Todo.findById(id);
    if(todo && todo.userId === req.currentUser.id){
        await todo.markAsDone();
    }
    res.redirect('/todos');
}));

router.post('/', asyncHandler(async function(req, res){

    const addnew = req.body.addtodo;
    const currentId = await req.currentUser.id; 
    await Todo.add(addnew,currentId);
    res.redirect('/todos');
}));

module.exports = router;