import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const idleTimeout = 15 * 60 * 1000; // 15 minutes

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(logout, idleTimeout);
    };

    const logout = () => {
      localStorage.removeItem('token'); // Clear JWT from storage
      navigate('/login'); // Redirect to login page
    };

    // Reset timer on activity
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    // Start the timer on mount
    resetTimer();

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, [navigate]);

  return (
    <div className='container'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
