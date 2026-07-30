import User from "../Models/user.js";
import Todo from "../Models/todo.js";

// Create a new todos
export const createTodo = async (req, res) => {
  try {
    const { title, priority, date } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    const todo = await Todo.create({
      title,
      priority: priority,
      date,
      user: req.user._id,
    });
    return res
      .status(201)
      .json({ success: true, message: "Todo created successfully", todo });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Get all todos with date filtering
export const getTodos = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const startDate = new Date(date);

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);

    const todos = await Todo.find({
      user: req.user._id,
      date: { $lte: endDate },
    }).sort({ date: 1 });

    const visibleTodos = todos
  .map((todo) => {
    const todoObj = todo.toObject();

    if (!todo.completed) {
      return {
        ...todoObj,
        completed: false,
      };
    }

    const completedDate = new Date(todo.completedAt);
    completedDate.setHours(0, 0, 0, 0);

    if (completedDate.getTime() > startDate.getTime()) {
      return {
        ...todoObj,
        completed: false,
      };
    }

    if (completedDate.getTime() === startDate.getTime()) {
      return {
        ...todoObj,
        completed: true,
      };
    }
    return null;
  })
  .filter(Boolean);

    return res.status(200).json({
      success: true,
      count: visibleTodos.length,
      todos: visibleTodos,
    });
  } catch (error) {
    console.error("Error fetching todos:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update  todos
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, priority, completed } = req.body;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    if (title) todo.title = title.trim();
    if (priority) todo.priority = priority;

    if (completed !== undefined) {
      if (completed) {
        // Today's date (ignore time)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Task's scheduled date (ignore time)
        const taskDate = new Date(todo.date);
        taskDate.setHours(0, 0, 0, 0);

        // Don't allow completing future tasks
        if (today < taskDate) {
          return res.status(400).json({
            success: false,
            message: "You can't complete a future task.",
          });
        }

        todo.completed = true;
        todo.completedAt = new Date();
      } else {
        todo.completed = false;
        todo.completedAt = null;
      }
    }

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete  todos
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted succesfully",
    });
  } catch (error) {
    console.error("Error deleting todo", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
