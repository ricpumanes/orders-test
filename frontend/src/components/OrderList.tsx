import ReactPaginate from "react-paginate";

import SearchBox from "./SearchBox";
import { useOrders } from "../hooks/useSummary";
import type { Order } from "../types";
import OrderForm from "./OrderForm";

export default function OrderList() {
  const {
    queryKeyDeps,
    data: orders = [],
    page,
    handlePageChange,
    handleSearchChange,
  } = useOrders();

  return (
    <div className="p-4">
      <h3 className="font-bold">Recent Orders</h3>
      <div className="flex justify-between items-center">
        <SearchBox onSearch={handleSearchChange} />
        <OrderForm queryKeyDeps={queryKeyDeps} />
      </div>
      <table className="w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 p-2">ID</th>
            <th className="border border-gray-500 p-2">Product</th>
            <th className="border border-gray-500 p-2">Quantity</th>
            <th className="border border-gray-500 p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order.id}>
              <td className="border border-gray-500 p-2">{order.id}</td>
              <td className="border border-gray-500 p-2">{order.product}</td>
              <td className="border border-gray-500 p-2">{order.qty}</td>
              <td className="border border-gray-500 p-2">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={(page) => handlePageChange(page.selected)}
        containerClassName="flex justify-center space-x-2 mt-6"
        pageClassName="group"
        pageLinkClassName="px-3 py-1 rounded-lg bg-white text-gray-700 hover:bg-blue-100 hover:text-bglue-600 shadow-sm transition-colors cursor-pointer"
        activeClassName="font-semibold text-bglue-600"
        activeLinkClassName="bg-blue-600 text-white hover:bg-blue-700"
        previousClassName="group"
        previousLinkClassName="px-3 py-1 rounded-lg bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-colors cursor-pointer"
        nextClassName="group"
        nextLinkClassName="px-3 py-1 rounded-lg bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600 shadow-sm transition-colors cursor-pointer"
        breakClassName="group"
        breakLinkClassName="px-3 py-1 rounded-lg bg-gray-200 text-gray-600"
        forcePage={page}
      />
    </div>
  );
}
