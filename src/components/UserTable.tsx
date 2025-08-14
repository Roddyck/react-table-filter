import { useCallback, useEffect, useRef, useState } from "react";
import type { User } from "../types/types";

type UserTableProps = {
  users: User[];
};

function UserTable({ users }: UserTableProps) {
  const [hoveredImage, setHoveredImage] = useState<{
    url: string;
    x: number;
    y: number;
  } | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const filterTimeoutRef = useRef<number | null>(null);
  const filterDelay = 500;

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const filterUsersByName = useCallback(
    (name: string) => {
      if (!name) {
        setFilteredUsers(users);
        return;
      }

      const lowerCaseName = name.toLowerCase();
      const filtered = users.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(lowerCaseName)
      );

      setFilteredUsers(filtered);
    },
    [users]
  );

  const debouncedFilter = useCallback(
    (value: string) => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
      filterTimeoutRef.current = setTimeout(() => {
        filterUsersByName(value);
      }, filterDelay);
    },
    [filterUsersByName]
  );

  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFilter(e.target.value);
  };

  const handleImageHover = (
    e: React.MouseEvent<HTMLImageElement>,
    url: string
  ) => {
    setHoveredImage({
      url,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const formatDate = (isoString: string) => {
    let date = new Date(isoString);

    return date.toLocaleDateString("ru-RU");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="mb-6 w-full max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by name..."
              onChange={handleNameFilterChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
            />
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
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {`${user.name.first} ${user.name.last}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={user.picture.thumbnail}
                      alt={`${user.name.first} ${user.name.last}`}
                      onMouseEnter={(e) =>
                        handleImageHover(e, user.picture.large)
                      }
                      onMouseLeave={handleImageLeave}
                      onMouseMove={(e) =>
                        setHoveredImage((prev) =>
                          prev ? { ...prev, x: e.clientX, y: e.clientY } : null
                        )
                      }
                    />
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

      {hoveredImage && (
        <div
          className="fixed z-50 p-1 bg-gray-800 rounded-lg shadow-xl border border-gray-600"
          style={{
            left: `${hoveredImage.x + 10}px`,
            top: `${hoveredImage.y + 10}px`,
          }}
        >
          <img
            src={hoveredImage.url}
            alt="Enlarged user"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export default UserTable;
