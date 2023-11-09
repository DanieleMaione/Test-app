import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { EditIcon, DeleteIcon } from "./Icons";

import { getPostsAPI, deletePostAPI } from "../../api/api";

import { PostPayload } from "../../interfaces/index";
import { useNavigate } from "react-router-dom";

type IProps = {
  setIsOpen: (isOpen: boolean) => void;
  setEditObj: (post: PostPayload) => void;
  setPostList: (arr: string[]) => void;
  postList: string[];
};

const PostList: React.FC<IProps> = (props) => {
  const { setIsOpen, setEditObj, postList, setPostList } = props;
  const [loader, setLoader] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const editPost = (id: number) => {
    openModal();
    const filter = postList.filter((item: any) => item.id === id)[0] as any;
    setEditObj(filter);
  };

  const deletePost = async (id: number) => {
    setLoader(true);
    setEditId(id);
    try {
      const response = await deletePostAPI(id);
      if (response.data) {
        const filter = postList.filter((item: any) => item.id !== id);
        setPostList([...filter]);
      }
    } catch (error) {
      console.log(error);
    }
    setEditId(0);
    setLoader(false);
  };

  const getData = async () => {
    try {
      const response = await getPostsAPI();
      setPostList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchPost = (title: string) => {
    setSelectedTitle(title);
    const filteredPost = postList.filter((item: any) => item.title === title);
    setPostList([...filteredPost]);
  };

  return (
    <div className="mt-5">
      <select
        value={selectedTitle}
        onChange={(e) => searchPost(e.target.value)}
      >
        <option></option>
        {postList.map((post: any) => {
          return <option value={post.title}>{post.title}</option>;
        })}
      </select>
      <div className="container">
        <Button onClick={() => openModal()}>Add New Post</Button>
      </div>
      <div className="main mt-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="column1">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {postList.slice(0, 15).map((item: any, index: number) => (
              <tr key={index}>
                <td onClick={() => navigate(`/detail/${item.id}`)}>
                  {item.title}
                </td>
                <td>
                  <span className="pointer" onClick={() => editPost(item.id)}>
                    <EditIcon />
                  </span>
                  <span
                    className="pointer ms-3"
                    onClick={() => deletePost(item.id)}
                  >
                    {editId === item.id && loader ? (
                      <Spinner color="danger" size="sm" />
                    ) : (
                      <DeleteIcon />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;
