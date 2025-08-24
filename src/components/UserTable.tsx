import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import type { User } from "../types/types";

type UserTableProps = {
  users: User[];
};

function formatDate(isoString: string) {
  let date = new Date(isoString);

  return date.toLocaleDateString("ru-RU");
}

function UserTable({ users }: UserTableProps) {
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const filterDelay = 300;

  const performFilter = (name: string) => {
    const lowerCaseName = name.trim().toLowerCase();
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(lowerCaseName)
    );

    setFilteredUsers(filtered);
  };

  const debouncedFilter = useDebounce(performFilter, filterDelay);

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setFilteredUsers(users);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="mb-6 w-full max-w-md mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Filter by name..."
              value={searchTerm}
              onChange={handleNameFilterChange}
              className="px-4 w-full py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 border-gray-600 text-white placeholder-gray-400 border"
            />
            <button
              onClick={handleClearFilter}
              className="right-12 ml-4 px-3 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 hover:text-white transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-ld rounded-lg bg-gray-800">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Picture
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray uppercase tracking-wider">
                Registered date
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.login.uuid} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {`${user.name.first} ${user.name.last}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative group flex items-center">
                      <img
                        src={user.picture.thumbnail}
                        alt={`${user.name.first} ${user.name.last}`}
                      />
                      <img
                        src={user.picture.large}
                        alt={`${user.name.first} ${user.name.last}`}
                        className="opacity-0 group-hover:opacity-100 inset-x-0 top-0 left-15 absolute transition-opacity duration-300"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {`${user.location.city}, ${user.location.state}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-ms text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-ms text-gray-400">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-ms text-gray-400">
                    {formatDate(user.registered.date)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text.sm text-gray-400 italic"
                >
                  No users found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
