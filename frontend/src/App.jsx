import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./components/TaskCard";
import InputCard from "./components/InputCard";

function App() {
  const [formToggle, setFormToggle] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData(); // Panggil fungsi permintaan data
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/task");
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleToggle = () => {
    setFormToggle(!formToggle);
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
            <div className="flex justify-center mb-7">
              <button
                className="bg-white border-2 border-black hover:bg-black hover:text-white hover:border-white px-4 py-2 rounded-md transition duration-300"
                onClick={handleToggle}
              >
                + Add Task
              </button>
            </div>
          </>
        ) : (
          <InputCard onToggle={handleToggle} onSubmit={fetchData} />
        )}
        <div className="flex justify-center">
          <div className="flex-col my-6 ">
            {data.map((item, index) => (
              <TaskCard
                key={index}
                id={index}
                value={item}
                onSubmit={fetchData}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
