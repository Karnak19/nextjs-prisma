import axios from "axios";
import { useState } from "react";

export default function Users({ users }) {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/users", {
      name,
    });
    setName("");
  };

  return (
    <div>
      <h1>Hello world !</h1>
      {users.map((user) => {
        return <h2 key={user.id}>{user.name || user.id}</h2>;
      })}
      <form onSubmit={handleSubmit}>
        <input
          type="string"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Create user {name}</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { data } = await axios.get("http://localhost:3000/api/users");
  return {
    props: {
      users: data,
    },
  };
}
