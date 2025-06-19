import { useState, useEffect } from 'react';
import { useAuth } from "./Authcontext/AuthContext";
import LoginPage from "./LoginPage";
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import TaskGrid from './components/TaskGrid';
import AddTaskModal from './components/AddTaskModal';
import { generateId, filterTasks, getTaskCounts, sortTasks } from './utils/taskUtils';
import { sampleTasks } from './data/sampleTasks';

function App() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('taskflow-tasks');
    return savedTasks ? JSON.parse(savedTasks) : sampleTasks;
  });

  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: generateId(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setIsAddModalOpen(false);
  };

  const toggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const editTask = (taskId, updatedData) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedData } : task
      )
    );
  };

  const filteredTasks = filterTasks(tasks, filter);
  const sortedTasks = sortTasks(filteredTasks);
  const taskCounts = getTaskCounts(tasks);

  return (

    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        filter={filter}
        onFilterChange={setFilter}
        taskCounts={taskCounts}
        tasks={tasks}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar />
        <div className="bg-white border-b border-gray-200 px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 ">TaskFlow!</h1>
            <p className="text-gray-600 mb-8">Organize yours tasks simple and efficient</p>
            
            {/* Large Centered Add Task Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="w-full justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl mx-auto transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Task
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Your Tasks ({filteredTasks.length})
          </h2>
        </div>
        
        <div className="flex-1 overflow-auto p-8">
          <TaskGrid
            tasks={sortedTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <AddTaskModal
          onAdd={addTask}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;