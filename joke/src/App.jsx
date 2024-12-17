import React, { useState, useEffect } from "react";

function JokeFetcher() {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jokeType, setJokeType] = useState("general");

  const jokeEndpoints = {
    general: "https://official-joke-api.appspot.com/jokes/general/random",
    programming: "https://official-joke-api.appspot.com/jokes/programming/random",
    knockKnock: "https://official-joke-api.appspot.com/jokes/knock-knock/random",
    dad: "https://official-joke-api.appspot.com/jokes/dad/random",
    all: "https://official-joke-api.appspot.com/jokes/random",
    multiple: "https://official-joke-api.appspot.com/jokes/random/5",
  };

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const endpoint = jokeType === "all" ? jokeEndpoints.all : jokeEndpoints[jokeType];
      const response = await fetch(endpoint);
      const data = await response.json();
      setJokes([data[0] || data]);
    } catch {
      setJokes([{ setup: "Error!", punchline: "Failed to load joke." }]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMultipleJokes = async () => {
    setLoading(true);
    try {
      const response = await fetch(jokeEndpoints.multiple);
      const data = await response.json();
      setJokes(data);
    } catch {
      setJokes([{ setup: "Error!", punchline: "Failed to load jokes." }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, [jokeType]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl mx-4 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">😂 Joke Cracker</h1>

        {/* Joke Type Selector */}
        <div className="flex justify-center mb-4">
          <label className="text-lg font-medium mr-4" htmlFor="jokeType">
            Select Joke Type:
          </label>
          <select
            id="jokeType"
            value={jokeType}
            onChange={(e) => setJokeType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="general">General</option>
            <option value="programming">Programming</option>
            <option value="knockKnock">Knock-Knock</option>
            <option value="dad">Dad Jokes</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600">Loading...</p>
        ) : (
          <div>
            {/* Display Multiple Jokes */}
            {jokes.map((joke, index) => (
              <div
                key={index}
                className="border-b last:border-none border-gray-200 py-4"
              >
                <p className="text-lg font-medium text-gray-800">{joke.setup}</p>
                <p className="text-xl text-blue-500 font-semibold mt-2">{joke.punchline}</p>
              </div>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={fetchJoke}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Get Another Joke
          </button>
          <button
            onClick={fetchMultipleJokes}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
          >
            Get 5 More Jokes
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <JokeFetcher />
    </div>
  );
}

export default App;
