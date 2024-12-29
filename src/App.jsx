import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect(() => {
  //   async function fetchTasks() {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
  //     const data = await response.json();
  //     console.log(data);

  //     setTasks(data);
  //   }
  //   fetchTasks();
  // }, []);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, isCompleted: !task.isCompleted };
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTasks = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false
    }
    setTasks([...tasks, newTasks]);
  }

  return (
    <div className={`${tasks != 0 ? "w-full h-full" : "w-screen h-screen"} bg-slate-500 flex justify-center p-6`}>
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  )
}

export default App;