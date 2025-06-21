const Sidebar = ({ filter, onFilterChange, taskCounts, tasks, isMobile = false, onCloseMobile }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, color: 'text-blue-600' },
    { label: 'Complete', value: completedTasks, color: 'text-green-600' },
    { label: 'Active', value: activeTasks, color: 'text-yellow-600' },
    { label: 'High Priority', value: highPriorityTasks, color: 'text-red-600' }
  ];

  const statusFilters = [
    { key: 'all', label: 'All Tasks', icon: '📋' },
    { key: 'pending', label: 'Active', icon: '⭕' },
    { key: 'completed', label: 'Completed', icon: '✅' }
  ];

  const priorityFilters = [
    { key: 'all', label: 'All Priorities', icon: '🔄' },
    { key: 'high', label: 'High', icon: '🔺' },
    { key: 'medium', label: 'Medium', icon: '🔸' },
    { key: 'low', label: 'Low', icon: '🔹' }
  ];

  return (
    <div
      className={`${
        isMobile
          ? 'fixed inset-0 bg-white z-50 p-6 overflow-y-auto shadow-lg'
          : 'w-full md:w-80 bg-white border-r border-gray-200 flex flex-col'
      }`}
    >
      {isMobile && (
        <div className="flex justify-end">
          <button
            onClick={onCloseMobile}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header Stats */}
      {!isMobile && (
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-3">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Status Filters
          </h3>
          <div className="space-y-1">
            {statusFilters.map(statusFilter => (
              <button
                key={statusFilter.key}
                onClick={() => onFilterChange({ ...filter, status: statusFilter.key })}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  filter.status === statusFilter.key
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{statusFilter.icon}</span>
                <span className="flex-1 text-left">{statusFilter.label}</span>
                {filter.status === statusFilter.key && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Priority Filters</h4>
          <div className="space-y-1">
            {priorityFilters.map(priorityFilter => (
              <button
                key={priorityFilter.key}
                onClick={() => onFilterChange({ ...filter, priority: priorityFilter.key })}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                  filter.priority === priorityFilter.key
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{priorityFilter.icon}</span>
                <span className="flex-1 text-left">{priorityFilter.label}</span>
                {filter.priority === priorityFilter.key && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Category Filters</h4>
          <div className="space-y-1">
            <button
              onClick={() => onFilterChange({ ...filter, category: 'all' })}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm transition-colors ${
                filter.category === 'all'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">📁</span>
              <span className="flex-1 text-left">All Categories</span>
              {filter.category === 'all' && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
