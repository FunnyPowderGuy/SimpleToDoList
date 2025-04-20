"use client";
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import './globals.css';

export default function List() {
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const [tasks, setTasks] = useState<{ id: string; text: string }[]>([]); 

  useEffect(() => {
    const saveData = localStorage.getItem("todoTasks");
    if(saveData) {
        const parsedData = JSON.parse(saveData);
        setTasks(parsedData);
      }
    }, []);

  useEffect (() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const inputBox = inputBoxRef.current;

    if (inputBox && inputBox.value.trim() === "") {
      alert("Musisz co kolwiek wpisać!");
    } else if (inputBox) {
      const taskId = `task-${Date.now()}`; 
      const newTask = { id: taskId, text: inputBox.value };
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      inputBox.value = "";
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }
  
  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  return (
    <main className="w-full min-h-screen gradient-background p-[10px] flex items-center justify-center">
      <div className="bg-white h-auto p-[2em] m-[100px auto 20px] rounded-2xl w-full max-w-[540px] flex flex-col items-center justify-start">
        <div className="text-black flex items-center mb-6">
          <h2 className="font-bold text-2xl">To-do List</h2>
          <Image src="/pencil.png" alt="pencil" height={40} width={40} className="ml-[10px]"/>
        </div>
        <div className="flex justify-between bg-[#f2f2f2] rounded-2xl p-2 w-full max-w-[30vw] px-3 mb-6">
          <input type="text" onKeyPress={handleKeyPress} ref={inputBoxRef} placeholder="Dodaj nowe zadanie..." id="inputBox" 
            className="bg-transparent rounded-2xl p-2 placeholder:text-gray-400 focus:outline-none flex-grow caret-black text-black w-full select-none"/>
          <button className="bg-[#a973c8] p-2 px-4 rounded-2xl hover:cursor-pointer ml-3 text-white hover:bg-[#704e86] transition-colors duration-200" onClick={addTask}>Add</button>
        </div>
        <ul className="w-full space-y-4" id="listContainer">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <input type="checkbox" id={task.id} className="hidden peer"/>
                <label
                  htmlFor={task.id}
                  className="text-[18px] text-black pl-10 select-none relative cursor-pointer before:content-[''] before:absolute before:h-[28px] before:w-[28px] before:rounded-2xl before:bg-[url(/unchecked.png)] before:bg-cover before:bg-center before:top-0 before:left-[8px] peer-checked:line-through peer-checked:text-gray-500 peer-checked:before:bg-[url(/check.png)] flex items-center min-h-[28px]">
                  {task.text}
                </label>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="py-1 px-3 rounded-2xl hover:cursor-pointer text-gray-500 hover:bg-gray-100 transition-colors duration-200 select-none self-center">
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
