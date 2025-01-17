import React, { useState } from "react";
import step from "../assets/amico.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const redirect = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const url = "https://goal-server-tayo.onrender.com/api/v1/goals";
  const[clicked,setClicked]= useState(false)
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setClicked(true)
    if (!title || !description){
      toast.error("Please fill all fields");
      setClicked(false)
      return;
    }
    try {
      const res = await fetch(url, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({title,description})
      })
      const data= await res.json()
      if(data.success){
        toast.success("Goal created successfully")
        redirect("/all")
      }
      else{
        toast.error("Error creating a goal, Try Again")
        setClicked(false)
        setTitle("")
        setDescription("")
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container d-flex justify-content-between align-items-center mt-3 pb-3 gap-lg-2">
      <div className="main-form py-5 px-1 ps-lg-2 ps-xl-3 pe-xl-3 rounded-2">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="create-form">
          <div className="mt-2">
            <input
              type="text"
              placeholder="Goal Title"
              className="bg-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Goal Description"
              className="bg-transparent"
            ></textarea>
          </div>
          <div className="mt-2">
            <button className="blue-bg p-2">{clicked ? "Loading..." : "Create Goal"}</button>
          </div>
        </form>
      </div>
      <div className="d-none d-lg-block main-img">
        <img src={step} alt="image of a step" />
      </div>
    </div>
  );
};

export default Create;
