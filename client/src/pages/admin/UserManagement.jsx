import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import Modal from "../../components/Modal";
import Success from "../../components/toast/Success";
import Error from "../../components/toast/Error";

function UserManagement() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [getUsers, setGetUsers] = useState([]);

  const fetchUserList = async () => {
    const res = await fetch("/api/protected/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();
    if (res.ok) {
      setGetUsers(json);
    } else {
      setError(json.error || 'Failed to fetch roles');
    }
  };

  useEffect(() => {
    if (user) {
        fetchUserList();
    }
  }, [user]);

  const getJoiningDate = (date) => {
    const joined = new Date(date.toString());
    const joiningDate = joined.getFullYear() +
    "-" +
    joined.toLocaleString("en-US", { month: "2-digit" }) +
    "-" +
    joined.toLocaleString("en-US", { day: "2-digit" });

    return joiningDate;
  }
  
  const editOnClick = () => {}
  const deleteOnClick = () => {}

  return (
    <div className="p-4">
      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}

      <div className="flex items-center justify-between mb-3">
        <h1 className="list-heading">Users List</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setModalOpen(true)}
        >
          Add New User
        </button>
      </div>

      {getUsers.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">User</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Permissions</th>
                <th scope="col" className="px-6 py-3">Joining Date</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getUsers.map((data, i) => (
                <tr key={i} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {data.name}
                  </th>
                  <td className="px-6 py-4">{data.role}</td>
                  {/* <td className="px-6 py-4">{data.permissions.join(', ')}</td> */}
                  <td className="px-6 py-4">{getJoiningDate(data.createdAt)}</td>
                  <td className="flex items-center px-6 py-4">
                    <button onClick={() => editOnClick(data._id)} className="font-medium text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => deleteOnClick(data._id)} className="font-medium text-red-500 hover:underline ms-3">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
