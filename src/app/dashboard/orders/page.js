"use client";

import { getOrders } from "@/app/actions/dashboard/order/getOrders";
import OrderDetails from "@/app/components/order/orderDetails";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Orders() {
  const [ordersData, setOrdersData] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await getOrders();
      setOrdersData(res.reverse());
    })();
  }, []);

  function handelPdfGeneration(orderInfo) {
    const doc = new jsPDF();

    // Page Title
    doc.setFontSize(18);
    doc.text("Order Invoice", 14, 20);

    // Order Info
    doc.setFontSize(12);
    doc.text(`Order ID:   ${orderInfo._id}`, 14, 30);

    // format Date
    const dateObj = new Date(orderInfo.orderTime);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 0-based month
    const year = dateObj.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    doc.text(`Order Date:  ${formattedDate}`, 14, 37);

    // Items Header
    let y = 50;
    doc.setFontSize(14);
    doc.text("Items:", 14, y);

    y += 10;
    doc.setFontSize(12);
    doc.text("Title", 14, y);
    doc.text("Price", 80, y);
    doc.text("Qty", 120, y);
    doc.text("Total", 160, y);

    y += 6;
    doc.line(14, y, 200, y); // underline

    // Items List
    let subtotal = 0;
    orderInfo.books.forEach((item) => {
      y += 10;
      subtotal += item.totalPrice;

      doc.text(item.title, 14, y);
      doc.text(`${item.price} Tk`, 80, y);
      doc.text(item.quantity.toString(), 120, y);
      doc.text(`${item.totalPrice} Tk`, 160, y);
    });

    y += 4;
    doc.line(14, y, 200, y); // underline

    // Summary
    y += 15;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${subtotal} Tk`, 14, y);

    y += 7;
    doc.text(`Shipping: ${50} Tk`, 14, y);

    y += 7;
    doc.text(`Cash on Delivery: ${subtotal + 50} Tk`, 14, y);

    // Shipping Address
    y += 15;
    doc.setFontSize(12);
    doc.text("Shipping Address:", 14, y);
    y += 7;

    doc.text(`Name      :  ${orderInfo.client.name}`, 14, y);
    y += 7;

    doc.text(`Phone     :  ${orderInfo.client.phone}`, 14, y);
    y += 7;

    doc.text(`Address   :  ${orderInfo.client.address}`, 14, y);

    // Save PDF
    doc.save("invoice.pdf");
  }

  function handelOpenModal(order) {
    setOrder(order);
    setIsOpenModal(true);
  }

  return (
    <div>
      <h1 className="text-center text-gray-600">
        My Orders({ordersData?.length})
      </h1>

      {ordersData?.map((order) => (
        <div
          key={order?._id}
          className="m-5 bg-gray-50 rounded-sm p-2 text-gray-600"
        >
          <div className="flex space-x-3 text-sm md:text-base">
            <div className="p-1">ID: {order._id}</div>
            <div className="bg-green-100 rounded-sm p-1 text-green-500">
              Pending
            </div>
          </div>

          {order?.books?.map((books) => (
            <div key={books.id} className="m-3 border-b border-gray-300">
              <div className="grid grid-cols-12 space-y-2">
                <div className="flex col-span-6 space-x-2">
                  <div>
                    <Image
                      src={books.cover}
                      width={50}
                      height={60}
                      className=""
                      alt="cover"
                    />
                  </div>
                  <div className="">
                    <div>{books.title}</div>

                    <div>
                      TK {books.price}
                      {"    "}x{"   "}
                      {books.quantity}
                    </div>
                  </div>
                </div>

                <div className="col-span-6 text-end mt-3">
                  {books.totalPrice} TK
                </div>
              </div>
            </div>
          ))}

          <div className="flex space-x-5">
            <div
              className="bg-blue-100 text-blue-500 py-1 px-2 round-sm cursor-pointer hover:bg-blue-200"
              onClick={() => handelOpenModal(order)}
            >
              view details
            </div>
            <div
              className="bg-red-100 text-red-500 py-1 px-2 round-sm cursor-pointer hover:bg-red-200"
              onClick={() => handelPdfGeneration(order)}
            >
              download pdf
            </div>
          </div>
        </div>
      ))}

      {isOpenModal && (
        <OrderDetails order={order} setIsOpenModal={setIsOpenModal} />
      )}
    </div>
  );
}
