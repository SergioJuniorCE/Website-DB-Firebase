import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";

import { db } from "../firebase";

function Links() {
  const [links, setLinks] = useState([]);

  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New link added", { type: "success" });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link has been updated", { type: "info" });
        setCurrentId("");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  const deleteLink = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await db.collection("links").doc(id).delete();
      console.log(id, name);
      toast("Link removed successfuly", { type: "error", autoClose: 2000 });
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="row">
      <LinkForm className="col-md-8" {...{ addOrEditLink, currentId, links }} />
      <div className="col-md-8">
        {links.map((link, key) => (
          <div className="card mb-1 col" key={key}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => deleteLink(link.id, link.name)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    edit
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Links;
