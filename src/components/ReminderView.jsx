import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RemindersView() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [hideName, setHideName] = useState(true);
  const [message, setMessage] = useState(" ");

  const navigate = useNavigate();

  const sendMessage = async () => {
    let name, id;
  
    try {
      const response = await axios.get(
        `http://localhost:8800/getChildId/${search}`
      );
      name = response.data[0]?.name;
      id = response.data[0]?.child_id;
      console.log(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  
    if (!name || message.trim() === "") {
      window.alert("Please enter a valid input");
      return; // Add return to exit the function if validation fails
    }
  
    try {
      const response = await axios.post("http://localhost:8800/message", {
        message,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  
    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  
    let willReload = false;
    try {
      const response = await axios.put("http://localhost:8800/insertReminder", {
        message,
        currentDate,
        id,
      });
      willReload = response.data.reloadPage;
    } catch (error) {
      console.log(error);
    }
  
    if (willReload) {
      window.location.reload();
      setTimeout(() => {
        navigate("/reminders");
      }, 3000); 
    } else {
      window.alert("There is something wrong with sending the message!");
    }
  };
  

  useEffect(() => {
    const fetchAllChild = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/getAllUnderimmunizaton"
        );
        setChildren(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllChild();
  }, []);

  return (
    <div className="">
      <h3 className="px-6 py-2 font-semibold bg-white rounded-lg w-fit">
        Child Immunization Records
      </h3>
      <section className="p-4 mt-3 bg-white rounded-md ">
        <h4>Send Message</h4>
        <hr />
        <div className="h-20 my-5 overflow-hidden">
          <h4>To:</h4>
          <input
            type="text"
            className="w-full px-3 py-1 border-2 rounded-md"
            value={search}
            onChange={(e) => {
              setHideName(true);
              setSearch(e.target.value);
            }}
          />
          {children
            .filter((child) => {
              return search.toLowerCase() === ""
                ? child
                : child.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((child) => {
              return (
                <h4
                  onClick={() => {
                    setSearch(child.name);
                    setHideName(false);
                  }}
                  className="cursor-pointer"
                >
                  {hideName ? child.name : null}
                </h4>
              );
            })}
        </div>
        <div>
          <h4>Message:</h4>
          <textarea
            rows="10"
            required
            className="w-full p-3 border-2 rounded-md"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex items-center justify-end gap-3 mx-auto mt-4">
          <button className="px-10 text-white" onClick={sendMessage}>
            Send
          </button>
          <button
            className="px-10 bg-C869EAC"
            onClick={() =>  navigate("/reminders")}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
