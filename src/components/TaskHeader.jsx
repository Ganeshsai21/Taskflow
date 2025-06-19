const TaskHeader = ({ onAddTask, filteredTasksCount }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Your Tasks ({filteredTasksCount})
          </h2>
        </div>
        
        <button
          onClick={onAddTask}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-lg font-medium transition-all duration-200 flex items-center gap-5 shadow-sm hover:shadow-md w-6"
        >

          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Task!!
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;