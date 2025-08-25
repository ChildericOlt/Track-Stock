import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './auth';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  // state to hold user session information
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetches the current session on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribes to authentication state changes
    // This listener updates the session state automatically
    // when a user logs in, logs out, or the session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs only once

  // Render Auth component if there's no session, otherwise render Dashboard
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Dashboard key={session.user.id} session={session} />}
    </div>
  );
}

export default App;