import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let authResponse;
      if (isSignUp) {
        authResponse = await supabase.auth.signUp({ email, password });
      } else {
        authResponse = await supabase.auth.signInWithPassword({ email, password });
      }
      
      const { data, error } = authResponse;

      if (error) {
        throw error;
      }
      
      if (isSignUp) {
        setMessage('Vérifiez votre email pour confirmer votre inscription !');
      } else {
        setMessage('Connexion réussie ! Redirection...');
      }

    } catch (error) {
      setMessage(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">{isSignUp ? 'Inscription' : 'Connexion'}</h1>
        <p className="description">
          {isSignUp ? "Créez votre compte pour commencer." : "Connectez-vous à votre compte."}
        </p>
        <form onSubmit={handleAuth}>
          <div className="inputField">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputField">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputField">
            <button className="button block primary" type="submit" disabled={loading}>
              {loading ? 'Chargement...' : (isSignUp ? 'S\'inscrire' : 'Se connecter')}
            </button>
          </div>
        </form>
        <p className="description" style={{ marginTop: '1rem' }}>
          {isSignUp ? 'Vous avez déjà un compte ? ' : 'Pas encore de compte ? '}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            {isSignUp ? 'Connectez-vous' : 'Inscrivez-vous'}
          </span>
        </p>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}