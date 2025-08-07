import { useState } from 'react';
import axios from 'axios';
import './index.css'; // Tailwind CSS must be imported here

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl.startsWith('http')) {
      setError('Please enter a valid URL starting with http or https');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/url/shorten`, {
        originalUrl,
      });
      setShortUrl(res.data.shortUrl);
      setError('');
    } catch (err) {
      setError('Failed to shorten URL');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-3xl shadow-2xl animate-slide-in">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 animate-fade-in">
          🔗 Short URL Generator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <input
            type="text"
            placeholder="Paste your long URL here..."
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 animate-scale-in"
          >
            Generate Short URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-green-50 border border-green-300 p-4 rounded-xl text-center animate-fade-in">
            <p className="text-green-700 font-medium mb-2">Here is your short link:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-semibold underline break-words"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-center font-medium animate-fade-in">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
