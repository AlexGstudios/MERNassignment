import React, { useEffect, useState, useContext } from 'react';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthProvider';
import {Bottle} from '../subcomponents/Bottles';
import { Modal } from '../modal/NewBottle';

export const Whisky = () => {


    const { authenticated} = useContext(AuthContext);
    const [userBottles, setUserBottles] = useState([]);
    const [isTrue, setIsTrue] = useState(false);
    const [reLoad, setReLoad] = useState(true);

    const getBottle = async () => {
        const data = await AuthService("getbottles");
        console.log("här")
        if(data.isAuthenticated){
            setUserBottles(data.message.msgBody);
            setReLoad(false)
        }
    }

    const deleteBottle = async (_id) => {
        if(_id === undefined){
            return;
        }else{
            const data = await AuthService(`bottles?id=${_id}`, "delete");
            if(data.isAuthenticated){
                setReLoad(true);
            }
        }
    }

    useEffect(() => {
        if(reLoad){
            getBottle();
        }
    }, [reLoad]);

    return(
        <div className="whisky" >
            <button className="newbottle" onClick={() => {setIsTrue(true)}} >New Bottle</button>
            <Modal open={isTrue} onClose={() => setIsTrue(false)} reload={setReLoad} title="New Bottle" />
            { authenticated ? Object.entries(userBottles).map(([key, value], i) => {
                return(
                    <Bottle key={i} props={value} reload={setReLoad} deleteBottle={deleteBottle} ></Bottle>
                )
            })
        :
        <div>loading...</div>
        }
        </div>
    )
}