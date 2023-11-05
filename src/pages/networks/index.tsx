import React, { FormEvent, useState } from "react";
import Header from "../../components/header";
import { Input } from "../../components/input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

const Network = () => {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  const handleSendSocial = (e: FormEvent) => {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      facebook,
      instagram,
      youtube,
    })
      .then(() => {
        console.log("sucess");
      })
      .catch((e) => {
        console.log(e.message);
      });

    setFacebook("");
    setInstagram("");
    setYoutube("");
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-full pb-7 px-2">
      <Header />
      <h1 className="text-[#FFF] text-2xl font-medium mt-8 mb-4">
        My Social Network
      </h1>

      <form className="flex flex-col max-w-xl w-full">
        <label className="text-white font-medium mt-2 mb-2">Facebook</label>
        <Input
          type="url"
          placeholder="Type your facebook url...."
          value={facebook}
          onChange={(e) => {
            setFacebook(e.currentTarget.value);
          }}
        />
        <label className="text-white font-medium mt-2 mb-2">Instagram</label>
        <Input
          type="url"
          placeholder="Type your Instagram url...."
          value={instagram}
          onChange={(e) => {
            setInstagram(e.currentTarget.value);
          }}
        />
        <label className="text-white font-medium mt-2 mb-2">Youtube</label>
        <Input
          type="url"
          placeholder="Type your Youtube...."
          value={youtube}
          onChange={(e) => {
            setYoutube(e.currentTarget.value);
          }}
        />
        <button
          type="submit"
          onClick={handleSendSocial}
          className="bg-blue-600 rounded-md text-white font-medium gap-4 h-9 flex justify-center items-center mb-5"
        >
          Register Links
        </button>
      </form>
    </div>
  );
};

export default Network;
