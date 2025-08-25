import { supabase } from './supabaseClient.js';
import DataUpload from './dataUpload.js';

export default function Dashboard({ session }) {
  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form-widget">
      <h1>Tableau de bord</h1>
      <p>Bienvenue sur votre tableau de bord. Vous êtes connecté.</p>
      <p>Votre email : {session.user.email}</p>
      
      <DataUpload />

      <button className="button block" onClick={handleSignOut}>
        Se déconnecter
      </button>
    </div>
  );
}