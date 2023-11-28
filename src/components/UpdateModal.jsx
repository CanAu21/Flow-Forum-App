import { categories } from "../constant";

const UpdateModal = ({ close, handleSave, post }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const data = Object.fromEntries(form.entries());
    handleSave(data);
  };
  return (
    <div className="w-full fixed h-full top-0 left-0 h-screen grid place-items-center bg-black bg-opacity-60">
      <div className="bg-gray-800 px-[32px] py-[22px] sm:min-w-[400px] rounded-xl">
        {/* Başlık Alanı */}
        <div className="flex justify-between mb-[32px]">
          <h2 className="font-medium text-xl">Gönderiyi Düzenle</h2>
          <button
            onClick={close}
            className="text-xl hover:bg-gray-500 w-7 rounded-lg"
          >
            X
          </button>
        </div>
        {/* Form alanı */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <div className="flex flex-col  gap-[16px] ">
            <label>Başlık</label>
            <input
              name="title"
              required
              defaultValue={post.title}
              className=" p-[10px] rounded-lg text-black"
              type="text"
            />
          </div>
          <div className="flex flex-col  gap-[16px]">
            <label>İçerik</label>
            <textarea
              name="content"
              required
              defaultValue={post.content}
              className="min-h-[200px] max-h-[300px] p-[10px] rounded-lg text-black"
            />
          </div>
          <div className="flex flex-col  gap-[16px]">
            <label>Kategori</label>
            <select
              name="category"
              defaultValue={post.category}
              className=" p-[10px] rounded-lg text-black"
            >
              {categories.map((i) => (
                <option key={i.title}>{i.title}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="bg-blue-600 p-2 rounded-xl">
            Değişiklikleri Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
