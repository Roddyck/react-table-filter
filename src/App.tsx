import { useEffect, useState } from "react";
import UserTable from "./components/UserTable";
import Loading from "./components/Loading";
import type { User } from "./types/types";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://randomuser.me/api/?results=15");
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          alert("Error fetching users");
          return;
        }
        setUsers(data.results);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return <>{loading ? <Loading /> : <UserTable users={users} />}</>;
}

export default App;
