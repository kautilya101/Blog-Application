import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';

export default function SignUp() {
  const url = import.meta.env.VITE_BASE_URL;
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async(e: FormEvent<HTMLFormElement>) => {  
    e.preventDefault();
    setLoading(true);
    const data = {username:username, email: email, password: password};
    try{
      const response = await fetch(url+'/api/user/signUp',{
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if(response.ok) {
        navigate('/login')
      }
    }
    catch(e){
      console.error('Error while logging in -',e);
    }
    finally{ 
      setLoading(false);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex flex-1 p-4 justify-center items-center w-full bg-[#F0EDE5]">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={(e) => handleSignIn(e)}>
            <h5 className="text-xl font-medium text-[#3A3A3A] text-center">
              Register to Wryt
            </h5>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-[#3A3A3A] "
              >
                Your username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  
                className="bg-gray-50 border border-gray-300 text-[#3A3A3A] text-sm rounded-lg block w-full p-2.5"
                placeholder="name123"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[#3A3A3A] "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-[#3A3A3A] text-sm rounded-lg block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-[#3A3A3A] dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="••••••••"
                autoComplete='current-password'
                className="bg-gray-50 border border-gray-300 text-[#3A3A3A] text-sm rounded-lg block w-full p-2.5 "
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-[#3A3A3A] bg-[#CB997E] hover:bg-[#ffba95] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {!loading && 'Register your Account'}
              {loading && 'Registering...'}
            </button>
            <div className="text-sm font-medium text-gray-500 text-center">
              Are you an existing user?{" "}
              <Link to={'/login'} className="text-[#CB997E] hover:underline">
                Try Login
              </Link>
            </div>
          </form>
        </div>
      </main>
      <footer className="flex justify-center items-center p-4 text-sm text-[#3A3A3A]">
        All copyrights are reserved. 2024
      </footer>
    </div>
  )
}
