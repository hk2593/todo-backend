const Todos=require('../models/Todos');

const getTodos=async(req,res)=>{
    try{
        const userId=req._id;
        const userTodos=await Todos.find({userId});
        res.status(200).json(userTodos);
    }
    catch(error){
        res.status(400).json({error:error.message});
    }

}
const createTodos=async(req,res)=>{
    try{
        const {title,description,date}=req.body;
        const newTodo=await Todos.create({
            title,description,date,userId:req._id
        });
        return res.status(200).json({newTodo});

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
const changeStatus=async(req,res)=>{
    try{
        const {s,todoId}=req.body;
        
        const todo=await Todos.findOne({_id:todoId});
        todo.status=s;
        await todo.save();

        return res.status(200).json(todo);

    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}


const updateTodo=async(req,res)=>{
    try{
        const {todoId,title,description}=req.body;
        const todo=await Todos.findOne({_id:todoId});
        todo.title = title;
        todo.description = description;

        
        await todo.save();

        
        res.status(200).json({ message: 'Todo updated successfully', updatedTodo: todo });



    }catch(error){
        res.status(400).json({error:error.message});
    }
}
module.exports={getTodos,createTodos,changeStatus,updateTodo};