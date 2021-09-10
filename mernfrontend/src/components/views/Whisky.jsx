import React, { useEffect, useState, useContext } from 'react';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../context/AuthProvider';
import {Bottle} from '../subcomponents/Bottles';
import { Modal } from '../modal/NewBottle';

export const Whisky = () => {

    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [userBottles, setUserBottles] = useState([]);
    const [isTrue, setIsTrue] = useState(false);

    const getBottle = async () => {
        const data = await AuthService("getbottles");
        setAuthenticated(data.isAuthenticated);
        setUserBottles(data.message.msgBody);
    }

    useEffect(() => {
        getBottle();
    }, [userBottles]);

    return(
        <div className="whisky">
            <button className="newbottle" onClick={() => {setIsTrue(true)}} >New Bottle</button>
            <Modal open={isTrue} onClose={() => setIsTrue(false)} />
            { authenticated ? Object.entries(userBottles).map(([key, value], i) => {
                return(
                    <Bottle key={i} props={value}></Bottle>
                )
            })
        :
        <div>loading...</div>
        }
        </div>
    )
}