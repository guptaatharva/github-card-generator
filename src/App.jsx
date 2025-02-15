import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [showErr, setShowErr] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [username, setUsername] = useState("");

  const createCard = useCallback(async () => {
    setShowErr(false);
    setShowCard(false);
    try {
      const response = await axios.get(
        "https://api.github.com/users/" + username
      );
      setData(response.data);
      setShowCard(true);
    } catch (e) {
      setShowErr(true);
      console.log(e);
    }
  }, [username]);

  return (
    <motion.div 
      className="flex flex-col gap-14 p-9 items-center w-full min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <div className="flex items-center justify-center gap-5 w-full">
        <input
          type="text"
          placeholder="Enter Github Username"
          className="p-3 sm:p-4 text-center font-bold text-lg sm:text-2xl font-mono w-[60%] rounded-3xl shadow-lg border-solid border-2 border-gray-600 transition-all focus:ring-2 focus:ring-cyan-300 bg-gray-800 text-white placeholder-gray-400"
          onChange={(e) => setUsername(e.target.value)}
        />
        <motion.button
          className="p-2 sm:p-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-lg sm:text-2xl rounded-3xl shadow-lg hover:scale-105 transition-all"
          onClick={createCard}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Generate
        </motion.button>
      </div>

      {showCard && (
        <motion.div 
          className="h-[700px] w-[85vw] sm:w-[65vw] md:w-[65vw] lg:w-[30vw] bg-gray-800 border border-gray-600 rounded-3xl shadow-2xl overflow-hidden transition-all"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative border-b h-[80%] border-gray-600">
            <div className="h-[40%] w-full overflow-hidden">
              <motion.img
                className="h-full w-full"
                src="https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            </div>

            <motion.div 
              className="h-40 w-40 bg-gray-900 border-4 border-cyan-700 shadow-xl rounded-full absolute left-[32.3%] top-[115px] transform -translate-x-1/2 -translate-y-[80%] flex justify-center items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img className="h-36 w-36 rounded-full overflow-hidden" src={data.avatar_url} alt="" />
            </motion.div>

          <div className="flex flex-col items-center text-center px-4 mt-[70px]">
            {data.name && (
              <motion.div 
                className="text-white font-bold font-mono text-2xl sm:text-3xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                {data.name}
              </motion.div>
            )}
            {data.login && (
              <motion.div 
                className="text-gray-400 font-mono mt-1 text-lg sm:text-xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                @{data.login}
              </motion.div>
            )}
              <div className="text-gray-500 mt-4 font-mono text-lg sm:text-xl px-4 pb-2 transition-all italic">
                {data.bio ? data.bio : "No bio available"}
              </div>
            {data.created_at && (
              <div className="text-gray-500 font-mono text-lg sm:text-xl mt-6 transition-all">
                🗓 Joined: {data.created_at?.split("T")[0]}
              </div>
            )}
          </div>
          </div>
          <div className="flex justify-around items-center py-6 border-t border-gray-600 text-center">
            <div>
              <div className="text-white font-bold text-2xl">{data.public_repos}</div>
              <div className="text-gray-400 text-sm">Public Repos</div>
            </div>
            <div>
              <div className="text-white font-bold text-2xl">{data.followers}</div>
              <div className="text-gray-400 text-sm">Followers</div>
            </div>
            <div>
              <div className="text-white font-bold text-2xl">{data.following}</div>
              <div className="text-gray-400 text-sm">Following</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default App;
