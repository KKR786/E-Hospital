import { createContext, useReducer, useEffect, useState } from 'react';
import { isTokenExpired } from '../helper';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: action.payload }
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    users: null
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      if (isTokenExpired(user.token)) {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        window.location.href = '/login';
      } else {
        dispatch({ type: 'LOGIN', payload: user });
      }
    }

    setLoading(false);
  }, [])

  console.log('AuthContext state:', state)
  
  return loading ? (
    <div className='loading'>
      Loading....
    </div>
    ) : (
      <AuthContext.Provider value={{ ...state, dispatch }}>
        { children }
      </AuthContext.Provider>
  )

}