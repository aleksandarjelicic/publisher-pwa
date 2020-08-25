import React, { useEffect, useState } from "react";

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
      <div className="list">
        {users.map((user, index) => (
          <p key={"user" + index}>{user.name}</p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
