import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const getData = () => {
    axios.get("posts?_sort=date&_order=desc").then((res) => {
      setPosts(res.data);
    });
  };

  useEffect(() => {
    // ilk bileşen ekrana basıldığında verileri getir
    getData();

    // 5 saniyede bir yeni postlar için istek atar
    const interval = setInterval(() => {
      getData();
    }, 15000);

    // bileşenin ekranadqan ayrılmasını izle
    // ayrılırsa sayacı durdur
    return () => {
      clearInterval(interval);
    };
  }, []);

  // post ekler
  const addPost = (newPost) => {
    // state'i dooğrudan değiştiremiyeceğimiz için kopysaını oluşturduk
    const clone = [...posts];
    // dizinin başımna yeni postu ekledik
    clone.unshift(newPost);
    // state'i güncelle
    setPosts(clone);
  };

  // postu silme
  const deletePost = (delete_id) => {
    // api'den postu siler
    axios.delete(`/posts/${delete_id}`).then(() => {
      // state'den siler
      const filtred = posts.filter((i) => i.id !== delete_id);
      setPosts(filtred);
      // anasayfaya yönlendirme
      navigate("/");
    });
  };

  // postu günceller
  const updatePost = (post) => {
    // api'deki postu günceller
    axios.put(`/posts/${post.id}`, post).then(() => {
      // state'deki postu günceller
      const updated = posts.map((i) => (i.id === post.id ? post : i));
      setPosts(updated);
    });
  };

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost, updatePost }}>
      {children}
    </PostContext.Provider>
  );
}
