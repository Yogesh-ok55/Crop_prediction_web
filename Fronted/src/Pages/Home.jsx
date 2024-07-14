import { useState } from "react";
import axios from "axios";
import "./Home.css";
import crops from "../components/Crops";

export default function Home() {
  const [form, setForm] = useState(false);
  const [crop,setCrop] = useState();
  const [nitrogen, setNitrogen] = useState("");
  const [phosphate, setPhosphate] = useState("");
  const [potassium, setPotassium] = useState("");
  const [temp, setTemp] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");

  
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict', {
        params: {
          nitrogen,
          phosphate, // update the name to match backend
          potassium,
          temp,
          humidity,
          ph,
          rainfall, // update the name to match backend
        },
      });
      console.log('Response:', response.data);
      setCrop(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="home-bc">

      <nav className="flex justify-between align-center px-5 pt-5">
          <h1 className="text-white text-2xl font-medium">
            Helping Farmers To Grow Right Crop
          </h1>
          <h3 className="text-white font-normal">
            Contact: yogeshh.ok@gmail.com/7014931904
          </h3>
      </nav>

      {form ? ( 
        crop ? <div className=""><h1 className="max-w-md mx-auto p-4 bg-white rounded  pt-5 mt-10">The best crop for cultivation is {crop}</h1>
        {crops.map(obj=>(
          obj.name==crop && <img className="max-w-md mx-auto p-4" key={obj.id} src={obj.photo} />
        ))}
        </div> : 
        (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md pt-10 mt-10">
          <h2 className="text-2xl font-bold mb-4">Crop Recommendation Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="nitrogen"
                >
                  Nitrogen (N) levels kg/ha
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="nitrogen"
                  type="number"
                  value={nitrogen}
                  onChange={(event) => setNitrogen(event.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phosphate"
                >
                  Phosphate (P) levels kg/ha
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="phosphate"
                  type="number"
                  value={phosphate}
                  onChange={(event) => setPhosphate(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="potassium"
                >
                  Potassium (K) levels kg/ha
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="potassium"
                  type="number"
                  value={potassium}
                  onChange={(event) => setPotassium(event.target.value)}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="rainfall"
                >
                  Average rainfall per mm
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="rainfall"
                  type="number"
                  value={rainfall}
                  onChange={(event) => setRainfall(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Ph"
                >
                  Ph Value
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="Ph"
                  type="number"
                  value={ph}
                  onChange={(event) => setPh(event.target.value)}
                  required
                />
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="temp"
                >
                  Temperature in °C
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="temp"
                  type="number"
                  value={temp}
                  onChange={(event) => setTemp(event.target.value)}
                  required
                />
                </div>
                
                <div className="w-full md:w-1/2 px-3 mt-5">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="humidity"
                >
                  humidity in %
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="humidity"
                  type="number"
                  value={humidity}
                  onChange={(event) => setHumidity(event.target.value)}
                  required
                />
              
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
              type="submit"
            >
              Get Crop Recommendation
            </button>
          </form>
        </div>
        )
      ) : (
        <div className="flex flex-col gap-10 pt-10 px-10">
          <h2 className="text-white text-3xl font-bold">
            Welcome to CropGenie
          </h2>
          <p className="text-white">
            Are you a farmer looking to maximize your yields and minimize
            your inputs? Do you want to know which crops will thrive in your
            specific soil and climate conditions? Look no further than
            CropGenie, the AI-powered crop recommendation tool.
          </p>

          <div>
          <h2 className="text-white font-bold">How it works</h2>

          <h4 className="text-white">
            Simply enter the following information about your soil and climate:
          </h4>
          </div>
          <p className="text-white">
            Nitrogen (N) levels in kg/ha(kilograms per hectare)<br />
            Phosphate (P) levels in kg/ha(kilograms per hectare) <br />
            Potassium (K) levels in kg/ha(kilograms per hectare) <br />
            Average rainfall per mm <br />
            ph value from (0 to 14) <br />
            humidity in % <br />
            Temperature in °C (degrees Celsius) 
          </p>

          <form onSubmit={(event) => event.preventDefault()}>
            <button
              onClick={() => setForm(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </button>
          </form>
        </div>
      )}
    </div>
  );
}