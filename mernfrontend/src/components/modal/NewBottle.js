import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AuthService from "../../services/AuthService";

export const Modal = ({ props, open, onClose, title, reload }) => {
  const [info, setInfo] = useState();

  const changeInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const data =
      title === "New Bottle"
        ? await AuthService("newbottle", "post", info)
        : await AuthService(`bottles?id=${props._id}`, "put", info);
    if (data) {
      reload();
    }
  };

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <div>
      <div className="overlay" onClick={onClose}></div>
      <div className="Modal">
        <h2>{title}</h2>
        <button className="newbottleback" onClick={onClose}>
          Back
        </button>
        <div>
          <form onSubmit={saveEdit}>
            <input
              type="name"
              name="name"
              onChange={changeInfo}
              placeholder="Name"
              defaultValue={props ? props.name : ""}
            />
            <input
              type="size"
              name="size"
              onChange={changeInfo}
              placeholder="Size"
              defaultValue={props ? props.size : ""}
            />
            <input
              type="price"
              name="price"
              onChange={changeInfo}
              placeholder="Price"
              defaultValue={props ? props.prize : ""}
            />
            <input
              type="destillery"
              name="destillery"
              onChange={changeInfo}
              placeholder="Destillery"
              defaultValue={props ? props.destillery : ""}
            />
            <input
              type="rating"
              name="rating"
              onChange={changeInfo}
              placeholder="Rating"
              defaultValue={props ? props.rating : ""}
            />
            <input
              type="region"
              name="region"
              onChange={changeInfo}
              placeholder="Region"
              defaultValue={props ? props.region : ""}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
