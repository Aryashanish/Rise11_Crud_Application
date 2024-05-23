import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Edit from "../Add/Edit"; // Import the Edit component

function Event() {
  const [allData, setAllData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const navigate = useNavigate();

  async function loadingAll() {
    try {
      const response = await axios.get("http://localhost:8000/");
      setAllData(response.data.msg);
      // console.log("employee data", response.data.msg); // Log the data directly after setting state
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteData(id) {
    try {
      const response = await axios.delete(`http://localhost:8000/employee/delete/${id}`);
      if (response.status === 200) {
        loadingAll(); // Reload data after deletion
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      const response = await axios.put(`http://localhost:8000/employee/update/${updatedEmployee._id}`, updatedEmployee);
      if (response.status == 200) {
        setAllData((prevData) =>
          prevData.map((emp) => (emp._id == updatedEmployee._id ? updatedEmployee : emp))
        );
        setIsEditing(false);
        navigate("/event");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadingAll();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <div className="overflow-x-auto">
        {isEditing ? (
          <Edit employee={currentEmployee} onUpdate={handleUpdate} onCancel={() => setIsEditing(false)} />
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="w-1/4 py-3 px-4 text-left">Name</th>
                <th className="w-1/4 py-3 px-4 text-left">Email</th>
                <th className="w-1/4 py-3 px-4 text-left">Phone</th>
                <th className="w-1/4 py-3 px-4 text-left">Position</th>
                <th className="w-1/4 py-3 px-4 text-left">Qualification</th>
                <th className="w-1/4 py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {allData?.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100 border-b" : "bg-white border-b"}>
                  <td className="py-3 px-4">{data.name}</td>
                  <td className="py-3 px-4">{data.email}</td>
                  <td className="py-3 px-4">{data.phone}</td>
                  <td className="py-3 px-4">{data.position}</td>
                  <td className="py-3 px-4">{data.qualification}</td>
                  <td className="py-3 px-4 flex">
                    <button className="py-2 px-4 bg-blue-300 rounded-md mx-2" onClick={() => handleEditClick(data)}>
                      Edit
                    </button>
                    <button className="py-2 px-4 bg-red-300 rounded-md" onClick={() => deleteData(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Event;
