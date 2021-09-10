import React, {useState} from "react";
import ReactDOM from "react-dom";
import AuthService from "../../services/AuthService";

export const Modal = ({open, onClose}) => {

    const [info, setInfo] = useState({
        name: "",
        size: "",
        price: "",
        destillery: "",
        rating: "",
        region: ""
    });

    const changeInfo = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    }

    const newBottle = async (e) => {
        e.preventDefault();
        const data = await AuthService("newbottle", "post", info);
    }

    if(!open){
        return null;
    }

    return ReactDOM.createPortal(
        <div>
            <div className="overlay" onClick={onClose}></div>
            <div className="Modal">
                <h2>New Bottle</h2>
                <button className="newbottleback" onClick={onClose}>Back</button>
                <div>
                    <form onSubmit={newBottle}>
                        <input type="name" name="name" onChange={changeInfo} placeholder="Name" />
                        <input type="size" name="size" onChange={changeInfo} placeholder="Size" />
                        <input type="price" name="price" onChange={changeInfo} placeholder="Price" />
                        <input type="destillery" name="destillery" onChange={changeInfo} placeholder="Destillery" />
                        <input type="rating" name="rating" onChange={changeInfo} placeholder="Rating" />
                        <input type="region" name="region" onChange={changeInfo} placeholder="Region" />
                        <button type="submit" >Submit</button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}