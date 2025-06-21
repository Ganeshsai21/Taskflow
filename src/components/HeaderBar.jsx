import { useAuth } from '../Authcontext/AuthContext';

function HeaderBar({ setIsMobileFiltersOpen }) {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex justify-end p-4 bg-white border-b border-gray-200 relative">
      {currentUser && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium"
        >
          Logout
        </button>
      )}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="md:hidden absolute top-4 left-4 text-white bg-blue-600 p-2 rounded-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}

export default HeaderBar;
