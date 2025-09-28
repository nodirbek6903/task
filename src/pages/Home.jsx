import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = ({ setToken }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = () => {
    setToken(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-6 text-lg"
      >
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500 py-6"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
          {`Userlar ro'yxati`}
        </h1>
        <button
          onClick={handleLogOut}
          className="flex cursor-pointer items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 shadow-md w-full sm:w-auto"
        >
          <IoLogOutOutline className="text-lg" />
          Chiqish
        </button>
      </motion.div>
      <motion.div
        className="hidden lg:block overflow-x-auto rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gradient-to-r from-green-500 to-green-700 text-white">
            <tr>
              <th className="px-4 py-3 border">ID</th>
              <th className="px-4 py-3 border">Ism</th>
              <th className="px-4 py-3 border">Username</th>
              <th className="px-4 py-3 border">Email</th>
              <th className="px-4 py-3 border">Telefon</th>
              <th className="px-4 py-3 border">Website</th>
              <th className="px-4 py-3 border">Manzil</th>
              <th className="px-4 py-3 border">Geo</th>
              <th className="px-4 py-3 border">Kompaniya</th>
              <th className="px-4 py-3 border">Catch Phrase</th>
              <th className="px-4 py-3 border">Business</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`text-sm transition duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50`}
              >
                <td className="px-4 py-3 border text-center font-medium text-gray-700">
                  {user.id}
                </td>
                <td className="px-4 py-3 border">{user.name}</td>
                <td className="px-4 py-3 border">{user.username}</td>
                <td className="px-4 py-3 border">{user.email}</td>
                <td className="px-4 py-3 border">{user.phone}</td>
                <td className="px-4 py-3 border">
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user.website}
                  </a>
                </td>
                <td className="px-4 py-3 border">
                  <div className="text-gray-600 space-y-1">
                    <p><strong>Street:</strong> {user.address.street}</p>
                    <p><strong>Suite:</strong> {user.address.suite}</p>
                    <p><strong>City:</strong> {user.address.city}</p>
                    <p><strong>Zip:</strong> {user.address.zipcode}</p>
                  </div>
                </td>
                <td className="px-4 py-3 border">
                  <div className="text-gray-600 space-y-1">
                    <p><strong>Lat:</strong> {user.address.geo.lat}</p>
                    <p><strong>Lng:</strong> {user.address.geo.lng}</p>
                  </div>
                </td>
                <td className="px-4 py-3 border font-semibold text-gray-800">
                  {user.company.name}
                </td>
                <td className="px-4 py-3 border italic text-gray-600">
                  {user.company.catchPhrase}
                </td>
                <td className="px-4 py-3 border text-gray-600">
                  {user.company.bs}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border border-gray-200 rounded-lg bg-white shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {user.name} <span className="text-gray-500 text-sm">({user.username})</span>
            </h2>
            <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
            <p className="text-sm text-gray-600"><strong>Telefon:</strong> {user.phone}</p>
            <p className="text-sm text-gray-600">
              <strong>Website:</strong>{" "}
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            </p>
            <div className="mt-3">
              <h3 className="font-semibold text-gray-800">Manzil</h3>
              <p className="text-sm text-gray-600">{user.address.street}, {user.address.city}</p>
            </div>
            <div className="mt-3">
              <h3 className="font-semibold text-gray-800">Kompaniya</h3>
              <p className="text-sm text-gray-600">{user.company.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
