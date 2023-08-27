import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";
import InputCard from "./components/InputCard";

function App() {
  const [formToggle, setFormToggle] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreItems = async () => {
    if (isLoading) return;

    setIsLoading(true);
    console.log("get");

    try {
      const response = await axios.get(
        `http://localhost:5000/api/task?page=${Math.floor(data.length / 5) + 1}`
      );
      const newItems = response.data.data;
      setData(mergeArrays(data, newItems, "id"));
    } catch (error) {
      console.error("Error loading more items:", error);
    }

    setIsLoading(false);
  };

  const mergeArrays = (arr1, arr2, key) => {
    let uniqueObjects = new Set([...arr1, ...arr2].map((item) => item[key]));
    return [...uniqueObjects].map((uniqueKey) => {
      return (
        arr1.find((item) => item[key] === uniqueKey) ||
        arr2.find((item) => item[key] === uniqueKey)
      );
    });
  };

  useEffect(() => {
    loadMoreItems();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("mentok");
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const handleToggle = () => {
    setFormToggle(!formToggle);
  };

  const handleSubmit = () => {
    setData(data.splice(0));
    loadMoreItems();
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center my-8 mx-8">
          <div className="flex-col my-12 ">
            <h1 className="text-5xl font-bold text-zinc-900 text-center">
              Task Management
              <br />
              App
            </h1>
          </div>
        </div>
        {!formToggle ? (
          <>
            <div className="flex justify-center mb-2">
              <button
                className="bg-white border-2 border-black hover:bg-black hover:text-white px-4 py-2 rounded-md transition duration-300"
                onClick={handleToggle}
              >
                + Add Task
              </button>
            </div>
          </>
        ) : (
          <InputCard onToggle={handleToggle} onSubmit={handleSubmit} />
        )}
        <div className="flex justify-center">
          <div className="flex-col my-6 ">
            {data.map((item, index) => (
              <TaskCard
                key={index}
                id={item.id}
                value={item}
                onSubmit={handleSubmit}
              />
            ))}
          </div>
        </div>
        {isLoading && <p className="flex justify-center">Loading...</p>}
      </div>
    </>
  );
}

export default App;
