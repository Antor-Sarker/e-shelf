export default function OrderDetails({ order, setIsOpenModal }) {
  const subTotal = order?.books?.reduce(
    (prev, book) => book.totalPrice + prev,
    0
  );

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center top-16">
      <div className="bg-white w-full sm:h-auto sm:max-w-md sm:rounded-2xl shadow-lg p-6 relative overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute text-xl top-3 right-5 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setIsOpenModal(false)}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Order Details:</h2>

        <div className="flex space-x-3 text-sm md:text-base">
          <div className="p-1">ID: {order._id}</div>
          <div className="bg-green-100 rounded-sm p-1 text-green-500">
            {order.status}
          </div>
        </div>
        <div className="text-sm md:text-base border-b border-gray-300">
          <div>Total Item : {order.books.length}</div>
          <div>Name : {order.client.name}</div>
          <div>Phone : {order.client.phone}</div>
          <div>Address : {order.client.address}</div>
        </div>
        <div className="rounded space-y-4 text-gray-600 bg-white p-3">
          <div className="flex justify-between border-b border-gray-300 border-dashed">
            <div>Subtotal</div>
            <div>{subTotal} Tk.</div>
          </div>
          <div className="flex justify-between border-b border-gray-300 border-dashed">
            <div>Online Fee</div>
            <div>{50} Tk.</div>
          </div>

          <div className="flex justify-between border-b border-gray-300 border-dashed font-bold">
            <div>Total Payable</div>
            <div>{subTotal + 50} Tk.</div>
          </div>
        </div>
        <div className="flex space-x-5">
          <div
            className="bg-red-100 text-red-500 py-1 px-2 round-sm cursor-pointer hover:bg-red-200"
            onClick={() => setIsOpenModal(false)}
          >
            Close
          </div>
          <div
            className="bg-blue-100 text-blue-500 py-1 px-2 round-sm cursor-pointer hover:bg-blue-200"
            onClick={() => handelPdfGeneration(order)}
          >
            download pdf
          </div>
        </div>
      </div>
    </div>
  );
}
