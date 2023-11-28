import { IoIosWarning } from "react-icons/io";

const ConfirmModal = ({ handleConfirm, close, text = "Elemanı Sil" }) => {
  return (
    <div className="w-full fixed h-full top-0 left-0 h-screen grid place-items-center bg-black bg-opacity-60">
      <div className="flex gap-[24px] flex-col p-[40px] p-md-[60px] bg-white text-black rounded-xl shadow-xl   ">
        <h2 className="text-center font-bold text-2xl">{text}</h2>
        <p className="font-bold">
          İçerik kalıcı olarak silinecektir, Emin misiniz?
        </p>

        <div className="bg-red-100 border-l-8 border-red-700 p-3">
          <div className="flex gap-3 items-center">
            <IoIosWarning className="text-xl" />
            <span className="font-bold">Uyarı</span>
          </div>
          <p>Bu içeriği silerseniz tekrardan erişemezsiniz.</p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={close}
            className="bg-black text-white px-[20px] py-[12px] rounded-lg hover:bg-gray-800"
          >
            İptal
          </button>
          <button
            className="border border-black px-[20px] py-[12px] rounded-lg hover:bg-gray-200"
            onClick={() => {
              handleConfirm();
              close();
            }}
          >
            Onayla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
