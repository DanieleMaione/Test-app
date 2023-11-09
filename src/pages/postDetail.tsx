import { useParams } from "react-router-dom";
import { getPostAPI } from "../api/api";
import { useEffect, useState } from "react";
import { PostPayload } from "../interfaces";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostPayload>();

  const getData = async () => {
    try {
      const response = await getPostAPI(id);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Utente {post?.userId}
      <h1>Title: {post?.title}</h1>
      <h4>Body: {post?.body}</h4>
    </div>
  );
};

export default PostDetail;
