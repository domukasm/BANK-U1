import { useContext, useState } from 'react';
import { Global } from './Global';

function Login() {
  const [userName, setUserName] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { setLogged, setAuthName, setRoute } = useContext(Global);

  // LOGIN FUNCTION
  const login = () => {
    fetch('http://localhost:3003/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login success') {
          setLogged(true);
          setRoute('accounts');
          setName('');
          setPassword('');
          setError(null);
          setAuthName(data.name);
          setUserName(data.name);
        } else {
          setError(true);
          setUserName(null);
        }
      });
  };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-5">
                    <div className="card mt-4">
                        <div className="card-header">
                            {
                                error ? <span style={{ color: 'crimson' }}>Login Error</span> : <span>Login</span>
                            }
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">
                                <span>Sveiki, svečias</span>
                            </h5>
                            <div className="mb-3">
                                <label className="form-label">Vardas</label>
                                <input type="text" className="form-control" id='username' value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Slaptažodis</label>
                                <input type="password" className="form-control" id='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <button type='button' className="btn btn-primary m-1" onClick={login}>Prisijungti</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;