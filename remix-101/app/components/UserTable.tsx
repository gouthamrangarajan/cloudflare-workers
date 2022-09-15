import { motion } from "framer-motion";
import { slideDown } from "~/utils/animations";
import type { userType } from "~/utils/model";

function UserTable({ data }: TablePropsType) {
  return (
    <table className="table-fixed w-full border-collapse border-slate-500">
      <thead>
        <tr>
          <th className="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200">
            Name
          </th>
          <th className="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200">
            User Name
          </th>
          <th className="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200">
            Email
          </th>
          <th className="text-left py-2 px-4 text-white bg-orange-600/90 font-normal border border-slate-200">
            Phone
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((dt) => (
          <motion.tr
            key={dt.id}
            layout="position"
            variants={slideDown}
            initial="initial"
            animate="animate"
          >
            <td className="py-2 px-4 border border-slate-200 break-all">
              {dt.name}
            </td>
            <td className="py-2 px-4 border border-slate-200 break-all">
              {dt.username}
            </td>
            <td className="py-2 px-4 border border-slate-200 break-all">
              {dt.email}
            </td>
            <td className="py-2 px-4 border border-slate-200 break-all">
              {dt.phone}
            </td>
          </motion.tr>
        ))}
        {data.length == 0 && (
          <motion.tr
            key={-1}
            layout="position"
            variants={slideDown}
            initial="initial"
            animate="animate"
          >
            <td
              colSpan={4}
              className="text-center py-2 px-4 border border-slate-200 break-all text-gray-600"
            >
              No data found...
            </td>
          </motion.tr>
        )}
      </tbody>
    </table>
  );
}
type TablePropsType = {
  data: userType[];
};
export default UserTable;
