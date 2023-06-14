import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { editOrder } from "redux/order/orderSlice";
import { Order } from "types/product";
import { Modal } from "zmp-ui";
import { OrderPicker } from "./picker";

export const OrderItem: FC<{ order: Order }> = ({ order }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //form state
  const [productId, setProductId] = useState(order.product_id);
  const [quantity, setQuantity] = useState(order.quantity);
  const [orderDate, setOrderDate] = useState(order.order_date);

  const dispatch = useDispatch();

  const editStaffSubmit = (e) => {
    e.preventDefault();

    let orderEdit: Order = {
      id: order.id,
      product_id: productId,
      quantity: quantity,
      order_date: convertDateToTimestamp(orderDate).toString(),
    };

    dispatch(editOrder(orderEdit) as any);

    setModalVisible(false);
  };

  const convertDateToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-");

    const timestamp = new Date(`${month}/${day}/${year}`).getTime() / 1000;

    return timestamp;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    // Formatting the date as dd/mm/yyyy
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    return formattedDate;
  };

  return (
    <OrderPicker order={order}>
      {({ open }) => (
        <div
          className="space-y-2"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#ccc",
          }}
        >
          <img src="https://static.thenounproject.com/png/3592871-200.png" />
          <h2 style={{ fontWeight: "bold", fontSize: 24 }}>
            {order.product_id}
          </h2>
          <h3>{order.quantity}</h3>
          <h3>{formatDate(order.order_date)}</h3>
          <div
            className="flex-row"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => {
                setModalVisible(true);
              }}
              style={{ backgroundColor: "orange", padding: "8px 20px" }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                open();
              }}
              style={{ backgroundColor: "red", padding: "8px 20px" }}
            >
              Delete
            </button>
          </div>

          <Modal
            visible={modalVisible}
            onClose={() => {
              setModalVisible(false);
            }}
            zIndex={1200}
            actions={[
              {
                text: "Cancel",
                close: true,
                highLight: true,
              },
            ]}
          >
            <form onSubmit={editStaffSubmit} id="productForm">
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingBottom: 20,
                }}
              >
                Edit product with id: {order?.id}
              </h2>
              <label>Name:</label>
              <input
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                type="text"
                id="name"
                name="name"
                required
                style={{ border: "1px solid black" }}
              />{" "}
              <br /> <br />
              <br />
              <label>Description:</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                id="description"
                name="description"
                required
                style={{ border: "1px solid black" }}
              ></input>{" "}
              <br /> <br />
              <br />
              <label>Price:</label>
              <input
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                type="date"
                id="price"
                name="price"
                step="0.01"
                required
                style={{ border: "1px solid black" }}
              />{" "}
              <br /> <br />
              <button
                style={{ padding: "10px 20px", backgroundColor: "greenyellow" }}
                type="submit"
              >
                Save
              </button>
            </form>
          </Modal>
        </div>
      )}
    </OrderPicker>
  );
};
