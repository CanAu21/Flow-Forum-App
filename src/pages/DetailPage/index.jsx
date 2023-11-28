import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostCard } from "../MainPage/PostCard";
import Loading from "../../components/Loading";
import CommentForm from "./CommentForm";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../../components/ConfirmModal";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";
import UpdateModal from "../../components/UpdateModal";

const DetailPage = () => {
  const { deletePost, updatePost } = useContext(PostContext);
  const { activeUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {
      setPost(res.data);
      setComments(res.data.comments.reverse());
    });
  }, []);

  // modali güncelleme fonk
  const handleEditSave = (data) => {
    const updated = { ...post, ...data };
    updatePost(updated);
    setPost(updated);
    setIsEditOpen(false);
  };

  // gönderilen post oturumu açık olan kullanıcıya mı ait ?
  const isOwn = post && activeUser && post.author.id === activeUser.id;

  return (
    <div>
      {/* Etkileşim Butonları */}
      <div className="flex justify-between items-center">
        <button
          className="my-4 hover:bg-gray-700 p-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          {" "}
          {"<"} Geri{" "}
        </button>

        {isOwn && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-2 p-1 rounded bg-blue-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="px-2 p-1 rounded bg-red-500"
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>

      {/* Gönderi İçeriği */}
      {!post ? <Loading /> : <PostCard post={post} />}

      {/* Gönderi Yorumları */}
      <CommentForm comments={comments} setComments={setComments} post={post} />

      {isConfirmOpen && (
        <ConfirmModal
          close={() => setIsConfirmOpen(false)}
          text="Gönderiyi Sil"
          handleConfirm={() => deletePost(id)}
        />
      )}

      {isEditOpen && (
        <UpdateModal
          post={post}
          close={() => setIsEditOpen(false)}
          handleSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default DetailPage;
