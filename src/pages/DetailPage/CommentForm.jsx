import { useContext } from "react";
import { IoIosSend } from "react-icons/io";
import { UserContext } from "./../../context/UserContext";
import { v4 } from "uuid";
import axios from "axios";
import CommentCard from "./CommentCard";

const CommentForm = ({ post, comments, setComments }) => {
  const { activeUser } = useContext(UserContext);

  // yeni gönderi ekleme
  const handleSubmit = (e) => {
    e.preventDefault();
    // şifreyi kullanıcıdan kaldırma
    const author = { ...activeUser };
    delete author.password;

    // yeni yorum tanımalama
    const newComment = {
      author,
      text: e.target[0].value,
      date: new Date(),
      id: v4(),
    };

    // yeni yapılan yorumu dizinin başına ekle
    const tempComments = [...comments, newComment];

    axios
      // apı günceller
      .patch(`/posts/${post.id}`, { comments: tempComments })
      // state günceller
      .then(() => setComments(tempComments));
    e.target[0].value = "";
  };

  // gönderiyi silme
  const handleDelete = (comment_id) => {
    // silinecek yorumun kaldırığıldı yenşi dizi
    const filtred = comments.filter((i) => i.id !== comment_id);
    // postun comment field'ini güncelle
    axios
      .patch(`/posts/${post.id}`, { comment: filtred })
      // apiden silinirse state güncelle
      .then(() => {
        setComments(filtred);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 bg-gray-800 rounded-xl my-5 p-4"
      >
        <input
          className="w-full rounded p-2 text-black"
          placeholder="yorumunuzu giriniz..."
          type="text"
          required
        />
        <button className="bg-blue-600   rounded p-2 flex items-center gap-1">
          <IoIosSend className="text-lg" />
        </button>
      </form>

      <section className="flex flex-col gap-10">
        {comments
          ?.map((data) => {
            // gönderiyi gönderen aktif kullanıcı mı ?
            const isOwn = activeUser?.id === data.author?.id;

            return (
              <CommentCard
                handleDelete={handleDelete}
                data={data}
                key={data.id}
                isOwn={isOwn}
              />
            );
          })
          .reverse()}
      </section>
    </>
  );
};

export default CommentForm;
