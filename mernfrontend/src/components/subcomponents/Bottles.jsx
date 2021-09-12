import React, {useState} from "react";
import AuthService from "../../services/AuthService";
import { Modal } from "../modal/NewBottle";

export const Bottle = ({props, reload, deleteBottle}) => {

    const [open, setOpen] = useState(false);

    return(
        <div className="bottle">
            <div className={props.name}  onClick={() => setOpen(true)}>
                <p>Name: {props.name}</p>
                <p>Size: {props.size}</p>
                <p>Price: {props.price}</p>
                <p>Destillery: {props.destillery}</p>
                <p>Rating: {props.rating}</p>
                <p>Region: {props.region}</p>
            </div>
            <button onClick={() => setOpen(true)}>Edit</button>
            <Modal props={props} open={open} onClose={() => setOpen(false)} reload={reload} title="Edit Bottle" />
            <button onClick={() => deleteBottle(props._id)} >Delete</button>
        </div>
    )
}