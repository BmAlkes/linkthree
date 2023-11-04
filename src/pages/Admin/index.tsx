/* eslint-disable prefer-const */
import { FormEvent, useEffect, useState } from "react";
import Header from "../../components/header";
import { Input } from "../../components/input";
import { FiTrash } from "react-icons/fi";
import {
  addDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  bg: string;
  color: string;
  url: string;
}

const Admin = () => {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");
  const [linkList, setLinkList] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let list = [] as LinkProps[];
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          color: doc.data().color,
          bg: doc.data().bg,
        });
      });
      setLinkList(list);
    });

    return () => {
      unsub();
    };
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      alert("Please enter all fields required");
      return;
    }
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        console.log("cadastrado com sucesso");
        setNameInput("");
        setUrlInput("");
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteLink = async (id: string) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };
  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleSubmit}
      >
        <label htmlFor="link" className="text-white font-medium mt-2 mb-2">
          Link name
        </label>
        <Input
          placeholder="type link name"
          type="text"
          id="link"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label htmlFor="url" className="text-white font-medium mt-2 mb-2">
          Link URL
        </label>
        <Input
          placeholder="type Url adress"
          type="url"
          id="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className="flex gap-3">
            <label
              htmlFor="color1"
              className="text-white font-medium mt-2 mb-2"
            >
              Link Color
            </label>
            <input
              type="color"
              id="color1"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <label htmlFor="color" className="text-white font-medium mt-2 mb-2">
              Background Color
            </label>
            <input
              type="color"
              id="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="flex flex-col items-center justify-center mb-7 p-1 border-gray-100/25 border rounded-md">
            <label htmlFor="color" className="text-white font-medium mt-2 mb-2">
              Prev Link
            </label>
            <article
              className="w-11/12 mx-w-lg flex flex-col items-center justify-center bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColorInput,
              }}
            >
              <p style={{ color: textColorInput }} className="font-medium">
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 rounded-md text-white font-medium gap-4 h-9 flex justify-center items-center mb-5"
        >
          Register
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl"> My Links</h2>

      {linkList.map((link) => {
        return (
          <article
            key={link.id}
            className="flex justify-between items-center w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <p>{link.name}</p>
            <div>
              <button
                className="border border-dashed p-1 rounded"
                onClick={() => handleDeleteLink(link.id)}
              >
                <FiTrash size={18} color="#fff" />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Admin;
