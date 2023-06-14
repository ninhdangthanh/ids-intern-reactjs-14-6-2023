import React, { FC, Suspense, useState } from "react";
import { Section } from "components/section";
import { Box, Button, Modal } from "zmp-ui";
import { ProductItemSkeleton } from "components/skeletons";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingSelector,
  ordersRemainingSelector,
} from "redux/order/selector";
import { OrderCreate } from "types/product";
import { createOrder } from "redux/order/orderSlice";
import { OrderItem } from "components/order";

export const OrderListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách order">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const OrderList: FC = () => {
  const orders = useSelector(ordersRemainingSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const createStaffSubmit = (e) => {
    e.preventDefault();

    let orderCreate: OrderCreate = {
      product_id: productId,
      quantity: quantity,
      order_date: convertDateToTimestamp(orderDate).toString(),
    };

    dispatch(createOrder(orderCreate) as any);

    resetForm();

    setModalVisible(false);
  };

  const convertDateToTimestamp = (dateString) => {
    const [year, month, day] = dateString.split("-");

    const timestamp = new Date(`${month}/${day}/${year}`).getTime() / 1000;

    return timestamp;
  };

  const resetForm = () => {
    setProductId("");
    setQuantity("");
    setOrderDate("");
  };

  return (
    <Suspense fallback={<OrderListFallback />}>
      <Section title="Danh sách order">
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
          variant="primary"
          size="large"
        >
          Create
        </Button>
        <Box className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Loading......</h1>
          ) : (
            orders.map((order) => <OrderItem key={order.id} order={order} />)
          )}
        </Box>
      </Section>

      <Modal
        visible={modalVisible}
        title="ZaUI 2.0 Modal"
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
        <form onSubmit={createStaffSubmit} id="productForm">
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
          <label>Quantity:</label>
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            id="quantity"
            name="quantity"
            required
            style={{ border: "1px solid black" }}
          ></input>{" "}
          <br /> <br />
          <br />
          <label>OrderDate:</label>
          <input
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            type="date"
            id="orderdate"
            name="orderdate"
            step="0.01"
            required
            style={{ border: "1px solid black" }}
          />{" "}
          <br /> <br />
          <button
            style={{ padding: "10px 20px", backgroundColor: "green" }}
            type="submit"
          >
            <strong> Create</strong>
          </button>
        </form>
      </Modal>
    </Suspense>
    // <ProductListContent />
  );
};
