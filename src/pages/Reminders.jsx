import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useSearchParams } from "react-router-dom";

export default function RemindersView() {
  const [search, setSearch] = useState("");
  const [reminders, setReminders] = useState([]);
  const [filteredReminders, setFilteredReminders] = useState([]);

  useEffect(() => {
    const fetchAllReminder = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/getAllReminders"
        );
        console.log(response.data);
        setReminders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllReminder();
  }, []);

  useEffect(() => {
    // Filter reminders based on the user input
    const filteredList = reminders.filter((reminder) =>
      reminder.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReminders(filteredList);
  }, [search, reminders]);

  const deleteReminder = async (reminderId) => {
    try {
      const response = await axios.delete(`http://localhost:8800/deleteReminder/${reminderId}`);
      console.log(response.data);  
      if (response.data.reloadPage) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <h3 className="px-6 py-2 font-semibold bg-white rounded-lg">
          Reminder
        </h3>
        <div className="flex items-center flex-1 gap-2 ml-4">
          <input
            type="text"
            className="w-9/12 h-8 pl-3 rounded-lg bg-CD9D9D9"
            placeholder="Search by name"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <NavLink to={"/remindersView"}>
            <button className="flex items-center justify-center gap-1 text-white bg-C0076BE">
              Send Reminder
            </button>
          </NavLink>
        </div>
      </div>
      <section className="rounded-md ">
        {filteredReminders.map((reminder) => (
          <div
            key={reminder.id}
            className="relative p-4 my-3 bg-white rounded-md"
          >
            <h3 className="font-semibold">
              Name: <span className="font-normal">{reminder.name}</span>
            </h3>
            <p className="font-semibold">
              Message:
              <span className="font-normal"> {reminder.message}</span>
            </p>
            <p className="text-sm text-right text-gray-400">
              Date {reminder.formattedDate}
            </p>
            <div
              className="absolute top-3 right-5"
              onClick={() => deleteReminder(reminder.reminderId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="14"
                viewBox="0 0 448 512"
              >
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
