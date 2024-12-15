import React from "react";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../redux/features/auth/authApi";

export default function Users() {
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  console.log(users);

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      alert("User deleted!");
      refetch();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <div className="">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-6 py-3">
                Created
              </th>

              <th scope="col" class="px-6 py-3">
                <span>Delete</span>
              </th>
            </tr>
          </thead>

          {users &&
            users.map((user) => (
              <tbody key={user._id}>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td class="px-6 py-4">{user.email}</td>
                  <td class="px-6 py-4">{user.role}</td>
                  <td class="px-6 py-4">
                    {" "}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </td>
                  <td class="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user?._id)}
                      class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}
