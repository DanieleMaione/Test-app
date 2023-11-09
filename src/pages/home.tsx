import { useState } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { PostList, ModalPost } from "../components";

import { PostPayload } from "../interfaces";

const Home = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editObj, setEditObj] = useState<PostPayload>({
    userId: 0,
    title: "",
    body: "",
    id: 0,
  });
  const [postList, setPostList] = useState<string[]>([]);

  return (
    <div className="App">
      <PostList
        setIsOpen={setIsOpen}
        setEditObj={setEditObj}
        setPostList={setPostList}
        postList={postList}
      />
      <ModalPost
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        editObj={editObj}
        setEditObj={setEditObj}
        setPostList={setPostList}
        postList={postList}
      />
    </div>
  );
};

export default Home;
