import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

const Csr = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const users = await response.json();
      setUsers(users);
    }, 3000);
  }, []);

  return (
    <div>
      <h2>this is client side fetched and rendered</h2>
      <div class="list">
        {users.map((user) => (
          <p>{user.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Csr;
