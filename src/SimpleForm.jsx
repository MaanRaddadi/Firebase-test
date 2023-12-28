import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  arrayRemove,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
function SimpleForm() {
  const [userInput, setUserInput] = React.useState({});
  const [itemData, setItemData] = React.useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    getData();
  }, [count]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "item"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItemData(data);
  };

  const handelFile = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.files[0] });
  };

  const handelInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const storeData = async (e) => {
    e.preventDefault();
    const date = new Date();
    const storageRef = ref(
      storage,
      `Images/${userInput.itemName}_${date.getTime()}`
    );
    uploadBytesResumable(storageRef, userInput.image).then((res) => {
      getDownloadURL(storageRef).then(async (url) => {
        await addDoc(collection(db, "item"), {
          itemName: userInput.item_name,
          itemNum: userInput.itemNum,
          items: ["item1", "item2", "item3"],
          itemImage: url,
        }).then((res) => {
          setCount(count + 1);
        });
      });
    });
  };

  const addToArray = async (id) => {
    await updateDoc(doc(db, "item", id), {
      items: arrayUnion("item4"),
    });
  };
  const removeFromArray = async (id) => {
    await updateDoc(doc(db, "item", id), {
      items: arrayRemove("item1"),
    });
  };

  return (
    <>
      <div className="w-full h-screen flex  flex-col  items-center justify-center">
        <label className="text-lg font-bold">Name:</label>
        <input
          className="input input-bordered input-lg"
          name="itemName"
          onChange={handelInput}
        ></input>
        <label className="text-lg font-bold">item Number:</label>
        <input
          className="input input-bordered input-lg"
          name="itemNum"
          onChange={handelInput}
        ></input>
        <label className="text-lg font-bold">Upload A Photo:</label>
        <input
          type="file"
          name="image"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handelFile}
        />
        <button className="btn btn-primary btn-lg mt-2" onClick={storeData}>
          Submit
        </button>
      </div>

      {itemData.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="card  w-96 bg-base-300 shadow-xl">
              <div className="card-body">
                <img src={item.itemImage} className="w-full h-28"></img>
                <h2 className="card-title">{item.itemName}</h2>
                <p>{item.itemNum}</p>
                <div className="card-actions justify-end"></div>
                <button
                  className="btn btn-primay"
                  onClick={() => {
                    addToArray(item.id);
                  }}
                >
                  Add to Array
                </button>
                <button
                  className="btn btn-primay"
                  onClick={() => {
                    removeFromArray(item.id);
                  }}
                >
                  Remove from Array
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SimpleForm;
