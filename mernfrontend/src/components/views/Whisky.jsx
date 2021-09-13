import React, { useEffect, useState, useContext } from "react";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthProvider";
import { Bottle } from "../subcomponents/Bottles";
import { Modal } from "../modal/NewBottle";

export const Whisky = () => {
  const { authenticated } = useContext(AuthContext);
  const [userBottles, setUserBottles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [reLoad, setReLoad] = useState(true);

  const getBottle = async () => {
    const data = await AuthService("getbottles");
    if (data) {
      setUserBottles(data.message.msgBody);
      setReLoad(false);
    }
  };

  const deleteBottle = async (_id) => {
    if (_id === undefined) {
      return;
    } else {
      const data = await AuthService(`bottles?id=${_id}`, "delete");
      if (data) {
        setReLoad(true);
      }
    }
  };

  useEffect(() => {
    if (reLoad) {
      getBottle();
    }
  }, [reLoad]);

  return (
    <div className="whisky">
      <button
        className="newbottle"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        New Bottle
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        reload={() => setReLoad(true)}
        title="New Bottle"
      />
      {authenticated ? (
        Object.entries(userBottles).map(([key, value], i) => {
          return (
            <Bottle
              key={i}
              props={value}
              reload={() => setReLoad(true)}
              deleteBottle={deleteBottle}
            ></Bottle>
          );
        })
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
