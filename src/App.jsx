import { useState, useEffect } from 'react';
import { useAuth } from "./Authcontext/AuthContext";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import HeaderBar from './components/HeaderBar';
import Sidebar from './components/Sidebar';
import TaskGrid from './components/TaskGrid';
import AddTaskModal from './components/AddTaskModal';
import { filterTasks, getTaskCounts, sortTasks } from './utils/taskUtils';
import { db } from './firebase/firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query
} from 'firebase/firestore';

function App() {
  const { currentUser } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      try {
        const q = query(collection(db, "users", currentUser.uid, "tasks"));
        const snapshot = await getDocs(q);
        const userTasks = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [currentUser]);

  if (!currentUser) {
    return showSignUp ? (
      <SignUpPage onSwitchToLogin={() => setShowSignUp(false)} />
    ) : (
      <LoginPage onSwitchToSignUp={() => setShowSignUp(true)} />
    );
  }

  const handleAddTask = async (taskData) => {
    const newTask = {
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, "users", currentUser.uid, "tasks"), newTask);
      setTasks(prev => [{ ...newTask, id: docRef.id }, ...prev]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleTask = async (taskId) => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find(t => t.id === taskId);
    try {
      await updateDoc(doc(db, "users", currentUser.uid, "tasks", taskId), {
        completed: updatedTask.completed
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "tasks", taskId));
      setTasks(prev => prev.filter(t => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = async (taskId, updatedData) => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, ...updatedData } : t
    );
    setTasks(updatedTasks);

    try {
      await updateDoc(doc(db, "users", currentUser.uid, "tasks", taskId), updatedData);
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const filteredTasks = filterTasks(tasks, filter);
  const sortedTasks = sortTasks(filteredTasks);
  const taskCounts = getTaskCounts(tasks);

  return (
    <div className="h-screen bg-gray-50">
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <HeaderBar setIsMobileFiltersOpen={setIsMobileFiltersOpen} />
        <div className="bg-white px-6 py-6 border-b border-gray-200 text-center">
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 inline-block text-transparent bg-clip-text mb-2">
            TaskFlow!
          </h1>
          <p className="text-gray-600 mb-6">Organize your tasks simple and efficient</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center mb-4">
    <div>
      <div className="text-blue-600 text-lg font-bold">{tasks.length}</div>
      <div className="text-sm text-gray-600">Total Tasks</div>
    </div>
    <div>
      <div className="text-green-600 text-lg font-bold">
        {tasks.filter(t => t.completed).length}
      </div>
      <div className="text-sm text-gray-600">Completed</div>
    </div>
    <div>
      <div className="text-yellow-600 text-lg font-bold">
        {tasks.filter(t => !t.completed).length}
      </div>
      <div className="text-sm text-gray-600">Active</div>
    </div>
    <div>
      <div className="text-red-600 text-lg font-bold">
        {tasks.filter(t => t.priority === 'high' && !t.completed).length}
      </div>
      <div className="text-sm text-gray-600">High Priority</div>
    </div>
  </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
          </button>
        </div>
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 text-center">
            Your Tasks ({filteredTasks.length})
          </h2>
        </div>
        <div className="h-[calc(100vh-280px)] overflow-y-auto px-4 py-4">
          <TaskGrid
            tasks={sortedTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFiltersOpen && (
          <Sidebar
            filter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
            tasks={tasks}
            isMobile={true}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        <Sidebar
          filter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
          tasks={tasks}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderBar />
          <div className="bg-white border-b border-gray-200 px-8 py-8">
            <div className="text-center">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-900 inline-block text-transparent bg-clip-text mb-2">
                TaskFlow!
              </h1>
              <p className="text-gray-600 mb-8">Organize your tasks simple and efficient</p>
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
          <div className="bg-white border-b border-gray-200 px-8 py-4">
            <h2 className="text-xl font-semibold text-gray-900 text-center">
              Your Tasks ({filteredTasks.length})
            </h2>
          </div>
          <div className="flex-1 overflow-auto p-8">
            <TaskGrid
              tasks={sortedTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
