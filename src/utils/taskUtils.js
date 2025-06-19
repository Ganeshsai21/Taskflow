export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

export const filterTasks = (tasks, filter) => {
  let filteredTasks = [...tasks];

  // Filter by status
  if (filter.status !== 'all') {
    filteredTasks = filteredTasks.filter(task => {
      if (filter.status === 'completed') return task.completed;
      if (filter.status === 'pending') return !task.completed;
      return true;
    });
  }

  // Filter by priority
  if (filter.priority !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.priority === filter.priority);
  }

  return filteredTasks;
};

export const getTaskCounts = (tasks) => {
  return {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length,
  };
};

export const sortTasks = (tasks, sortBy = 'createdAt') => {
  return [...tasks].sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });
};