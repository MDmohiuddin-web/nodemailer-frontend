import { Button, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import UseAxiosPublic from "../../Hook/UseAxiosPublic";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Student from "../Components/Student";

const LIsts = () => {
  const axiosPublic = UseAxiosPublic();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [axiosPublic]);

  const handleDelete = async (userId) => {
    try {
      const response = await axiosPublic.delete(`/users/${userId}`);
      console.log("User deleted:", response.data);
      toast.success("User deleted successfully!");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.error(
          "An error occurred while deleting the user: " +
            error.response.data.message
        );
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from the server. Please try again later.");
      } else {
        console.error("General error:", error.message);
        toast.error("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="overflow-x-auto md:w-4/5 m-auto min-h-[400px] capitalize">
      <div className="gap-3  flex w-1/2 ">
        
        <Link to="/AddUser">
          <Button
            type="primary "
            className="  bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            add New user
          </Button>
        </Link>
        <Link to="/addStudent">
          <Button
            type="primary "
            className="  bg-blue-500 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            add New student
          </Button>
        </Link>
      </div>

      <Tabs className="py-5">
        <TabList className="flex gap-5">
        <Tab className="btn btn-sm bg-blue-500 text-white hover:text-black">
            user list
          </Tab>
          <Tab className="btn btn-sm bg-blue-500 text-white hover:text-black">
            student list
          </Tab>
        </TabList>

        <TabPanel>
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{user.name}</div>
                  </td>
                  <td>{user.email}</td>

                  <th>
                    <Popconfirm
                      title="Delete the user"
                      description="Are you sure to delete this user?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => handleDelete(user._id)}
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </TabPanel>
        <TabPanel>
          <Student></Student>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default LIsts;
