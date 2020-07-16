import { useEffect, useState } from "preact/hooks";

const Sidebar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users);
    }, 1000);
  }, []);

  return (
    <div>
      <h2>sidebar csr</h2>
      <div class="list">
        {users.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
