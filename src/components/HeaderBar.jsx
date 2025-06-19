import { useAuth } from '../Authcontext/AuthContext';

function HeaderBar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex justify-end p-4 bg-white border-b border-gray-200">
      {currentUser && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default HeaderBar;
