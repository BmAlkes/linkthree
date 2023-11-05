import { useEffect, useState } from "react";
import { Social } from "../../components/social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinkProps {
  id: string;
  name: string;
  bg: string;
  color: string;
  url: string;
}

interface SocialProps {
  facebook: string;
  instagram: string;
  youtube: string;
}
export const Home = () => {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLink, setSocialLink] = useState<SocialProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef)
        .then((snapshot) => {
          const list = [] as LinkProps[];

          snapshot.forEach((doc) => {
            list.push({
              bg: doc.data().bg,
              color: doc.data().color,
              id: doc.data().id,
              name: doc.data().name,
              url: doc.data().url,
            });
          });
          setLinks(list);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    loadLinks();
  }, []);

  useEffect(() => {
    const docRef = doc(db, "social", "link");
    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLink({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col w-full py-4 items-center justify-center">
      <h1 className="md:text-4xl text-3xl text-white mt-20 font-bold">
        Home Page
      </h1>
      <span className=" text-gray-50 mb-5 mt-3"> See my Links 👇</span>
      <main className="flex flex-col w-11/12 max-w-xl items-center text-center">
        {links.map((link) => {
          return (
            <section
              key={link.id}
              style={{ background: link.bg, color: link.color }}
              className="bg-white mb-4 w-full py-2 rounded-xl select-none transition-transform hover:scale-105 cursor-pointer"
            >
              <a href={link.url} target="_blank">
                <p className="text-base md:text-lg ">{link.name}</p>
              </a>
            </section>
          );
        })}
      </main>
      {socialLink && Object.keys(socialLink).length > 0 && (
        <footer className="flex justify-center gap-3 my-4">
          <Social url={socialLink?.facebook}>
            <FaFacebook size={35} color="#fff" />
          </Social>
          <Social url={socialLink?.instagram}>
            <FaYoutube size={35} color="#fff" />
          </Social>
          <Social url={socialLink?.youtube}>
            <FaInstagram size={35} color="#fff" />
          </Social>
        </footer>
      )}
    </div>
  );
};
