import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Reminders() {
  const [children, setChildren] = useState([]);
  const [search, setSearch] = useState("");
  const [hideName, setHideName] = useState(true);

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
          ></textarea>
        </div>
        <div className="flex items-center justify-end gap-3 mx-auto mt-4">
          <button className="px-10 text-white" >
            Send
          </button>
          <button
            className="px-10 bg-C869EAC"
            onClick={() => setUpdateButton(false)}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
}
