import { motion } from "framer-motion";
import type { postType } from "~/utils/model";

export default function Post({ data }: PostPropsType) {
  return (
    <motion.div
      className="shadow shadow-sky-600/80 bg-white rounded-xl py-4 px-6 w-full flex flex-col relative"
      layout="position"
    >
      <span
        className="text-lg text-orange-600 font-semibold truncate"
        title={data.title}
      >
        {data.title}
      </span>
      <p className="py-1 px-3 mt-3">{data.body}</p>
      {data.user && (
        <span
          className="py-1 px-3 text-white bg-orange-600/90 absolute -bottom-2 right-6 rounded-full text-xs"
          v-if="data.user"
        >
          {data.user.username}
        </span>
      )}
    </motion.div>
  );
}
type PostPropsType = {
  data: postType;
};
