import React, {useState} from "react";
import AuthService from "../../services/AuthService";

export const Bottle = ({props}) => {

    const [newData, setNewData] = useState();

    const editBottle = async (e) => {
        e.preventDefault();
        const data = await AuthService(`bottles?id=${props._id}`, "put", newData);
    }

    const deleteBottle = async () => {
        const data = await AuthService(`bottles?id=${props._id}`, "delete")
    }

    const changeData = (e) => {
        setNewData({...props, [e.target.name]: e.target.value});
    }

    return(
        <div className="bottle">
            <form onClick={editBottle}>
                <p>Name:</p>
                <input type="text" name="name" onChange={changeData} placeholder={props.name}></input>
                <p>Size:</p>
                <input type="text" name="size" onChange={changeData} placeholder={props.size}></input>
                <p>Price:</p>
                <input type="text" name="price" onChange={changeData} placeholder={props.price}></input>
                <p>Destillery:</p>
                <input type="text" name="destillery" onChange={changeData} placeholder={props.destillery}></input>
                <p>Rating:</p>
                <input type="text" name="rating" onChange={changeData} placeholder={props.rating}></input>
                <p>Region:</p>
                <input type="text" name="region" onChange={changeData} placeholder={props.region}></input>
                <button type="submit">Edit</button>
            </form>
            <button onClick={() => deleteBottle()}>Delete</button>
        </div>
    )
}