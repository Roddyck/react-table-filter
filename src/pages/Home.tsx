import { useEffect, useState } from "react";

type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password?: string;
    salt?: string;
    md5?: string;
    sha1?: string;
    sha256?: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredImage, setHoveredImage] = useState<{
    url: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("https://randomuser.me/api/?results=15");
      const data = await response.json();
      console.log(data.results);
      setUsers(data.results);
      setLoading(false);
    };

    fetchUsers();
  }, []);

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
    <div>
      {loading ? (
        <p>"Loading..."</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{`${user.name.first} ${user.name.last}`}</td>
                <td>
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
                <td>{user.location.city + ", " + user.location.state}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{formatDate(user.registered.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>

      )}

      {hoveredImage && (
        <div 
          style={{
            position: "fixed",
            left: `${hoveredImage.x + 10}px`,
            top: `${hoveredImage.y + 10}px`,
            zIndex: 1000,
          }}
        >
          <img src={hoveredImage.url} alt="Enlarged user" />
        </div>
     )}
    </div>
  );
}

export default Home;
