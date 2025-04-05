
import React, { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TasksListProps {
  title: string;
  subtitle: string;
  tasks: Task[];
  className?: string;
}

const TasksList: React.FC<TasksListProps> = ({ 
  title, 
  subtitle, 
  tasks: initialTasks,
  className 
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState("");
  
  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const addTask = () => {
    if (!newTask.trim()) return;
    
    const newTaskObj: Task = {
      id: Date.now(),
      title: newTask,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <div className={`bg-white p-5 rounded-lg shadow-sm ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <button className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-3 mt-4">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="flex items-start"
            onClick={() => toggleTask(task.id)}
          >
            <div className="flex-shrink-0 mt-0.5 cursor-pointer">
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-rhombus-purple" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300" />
              )}
            </div>
            <div className={`ml-3 text-sm ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Add new todo"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-rhombus-purple/20 focus:border-rhombus-purple"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <Button 
          className="rounded-l-none"
          onClick={addTask}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TasksList;
