const mongoose = require("mongoose");
const Task = require("../models/taskSchema");

module.exports.getTasks = async(req,res) => {
  try{
    const tasks = await Task.find({owner: req.user._id});
    res.status(201).json(tasks);
  }catch(error){
    res.status(400).json({message: "Fetching Data Failed"});
  }
}

module.exports.addTask = async (req,res, next) => {
  // let {title, description, dueDate, priority} = req.body;

  let newTask = new Task({...req.body, owner: req.user._id });
  await newTask.save();
 
  res.status(201).json({message: newTask});
}

module.exports.delTask = async(req,res,next) =>{
  let {id} = req.params;
  const task = await Task.findById(id);
  if(!task){
    return res.status(401).json({message:"task doesn't exists! "});
  }

  const delTask = await Task.deleteOne({_id : id});
  res.status(201).json({message:"task deleted successfully!"});
}

module.exports.editTask = async(req,res,next) =>{
  let {id} = req.params;
  const task = await Task.findById(id);
  if(!task){
    return res.status(401).json({message:"task doesn't exists! "});
  }

  let {title, description, dueDate, priority} = req.body;

  const editTask = await Task.updateOne({_id: id}, {$set: {title, description, dueDate, priority}});
  
  res.status(201).json({message:"task updated successfully!"});

}

module.exports.checkTask = async(req,res,next) => {
  let {id} = req.params;
  const task = await Task.findById(id);
  if(!task){
    return res.status(401).json({message:"task doesn't exists! "});
  }

  if(task.isCompleted === true){
    await Task.updateOne({_id: id}, {$set: {isCompleted: false}});
  }else{
    await Task.updateOne({_id: id}, {$set: {isCompleted: true}});
  }
  
  res.status(201).json({message:"Status updated successfully!"});

}

module.exports.searchTask = async(req,res) =>{
  try {
      const {search, priority, isCompleted} = req.query;
      const pipeline = [];

      pipeline.push({
        $match: {
          owner: new mongoose.Types.ObjectId(req.user._id)
        }
      });
 
    
      if(search) {
        pipeline.push({
          $match: {
            $or: [
              {title: {$regex: search, $options: "i"}},
              {description:{$regex: search, $options: "i"}}
            ]
          },
        });
      }

      
      if(priority){
        pipeline.push({
          $match: {priority: priority}
        });
      }

      if(isCompleted){
        pipeline.push({
          $match: {isCompleted: isCompleted === "true"}
        });
      }

      if (pipeline.length === 0) {
        pipeline.push({ $match: {} });
      }

      const tasks = await Task.aggregate(pipeline);

      res.status(200).json(tasks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Search failed" });
    }

  }; 

  
  
  

