import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ManageAccounts() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const createAdmin = async () => {
    if (!username || !password || !repassword) {
      window.alert("Please enter a valid input");
      return;
    }
    if (password !== repassword) {
      window.alert("Password did not matched");
      return;
    }
    try {
      const response = await axios.put("http://localhost:8800/createAdmin", {
        username,
        password,
        repassword,
      });
      console.log(response);
      if (response.data.reloadPage) {
        window.alert("An admin was created successfully")
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="px-6 py-2 font-semibold bg-white rounded-lg w-fit">
        Account Creation
      </h3>
      <section className="flex flex-col w-2/3 px-6 py-8 mx-auto font-semibold bg-white rounded-lg">
        <h6 className="font-normal text-center">Create Admin Account</h6>
        <label>Username: </label>
        <input
          type="text"
          className="px-3 py-2 font-normal border-2 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          className="px-3 py-2 font-normal border-2 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Re-Type Password: </label>
        <input
          type="password"
          className="px-3 py-2 font-normal border-2 rounded-lg"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
        />

        <div className="flex justify-center gap-2 mt-3">
          <button className="px-10 text-white" onClick={createAdmin}>
            Create
          </button>
        </div>
      </section>
    </div>
  );
}
