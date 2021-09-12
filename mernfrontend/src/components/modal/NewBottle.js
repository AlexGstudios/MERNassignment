import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import AuthService from "../../services/AuthService";

export const Modal = ({props, open, onClose, title, reload, standardInfo}) => {

    const _standardInfo = {
        name: "Name",
        size: "Size",
        price: "Price",
        destillery: "Destillery",
        rating: "Rating",
        region: "Region"
    }

    const [info, setInfo] = useState(_standardInfo);

    useEffect(() => {
        if(title === "Edit Bottle"){
            setInfo(props);
        }
        if(title === "New Bottle"){
            setInfo(_standardInfo)
        }
    }, [])

    const changeInfo = (e) => {
        setInfo({...info, [e.target.name]: e.target.value});
    }

    const saveEdit = async (e) => {
        e.preventDefault();
        if(title === "New Bottle"){
            const data = await AuthService("newbottle", "post", info);
            setInfo(_standardInfo)
        }
        if(title === "Edit Bottle"){
            const data = await AuthService(`bottles?id=${props._id}`, "put", info);
        }
    }

    if(!open){
        return null;
    }

    return ReactDOM.createPortal(
        <div>
            <div className="overlay" onClick={onClose}></div>
            <div className="Modal">
                <h2>{title}</h2>
                <button className="newbottleback" onClick={onClose}>Back</button>
                <div>
                    <form onSubmit={saveEdit}>
                        <input type="name" name="name" onChange={changeInfo} placeholder={info.name} />
                        <input type="size" name="size" onChange={changeInfo} placeholder={info.size} />
                        <input type="price" name="price" onChange={changeInfo} placeholder={info.price} />
                        <input type="destillery" name="destillery" onChange={changeInfo} placeholder={info.destillery} />
                        <input type="rating" name="rating" onChange={changeInfo} placeholder={info.rating} />
                        <input type="region" name="region" onChange={changeInfo} placeholder={info.region} />
                        <button type="submit" onClick={reload} >Submit</button>
                    </form>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}