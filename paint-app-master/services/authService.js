const login = async (email, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await response.json();
    if (data.access) {
      localStorage.setItem('token', data.access);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

const signup = async (username, password) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/paint_inventory/signup/', {  // Make sure to include the trailing slash in the URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),  // Use the username and password variables directly
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.access);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

const logout = () => {
  localStorage.removeItem('token');
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const authService = { login, logout, isAuthenticated, signup };