import moment from "moment/moment";
import "moment/locale/tr";
import { MdDelete } from "react-icons/md";

const CommentCard = ({ data, handleDelete, isOwn }) => {
  return (
    <div className="bg-gray-800 p-3 rounded-lg flex gap-4">
      <img
        width={40}
        className="object-contain rounded-xl"
        src={data.author.image}
      />

      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <b>{data.author.name}</b>
            <span className="text-gray-400">{moment(data.date).fromNow()}</span>
          </div>

          {isOwn && (
            <MdDelete
              onClick={() => handleDelete(data.id)}
              className="cursor-pointer hover:text-red-500"
            />
          )}
        </div>
        <p className="mt-2">{data.text}</p>
      </div>
    </div>
  );
};

export default CommentCard;
