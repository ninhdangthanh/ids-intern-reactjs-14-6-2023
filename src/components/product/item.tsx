import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { editProduct } from "redux/products/productSlice";
import { Product } from "types/product";
import { Modal } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //form state
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const dispatch = useDispatch();

  const editProductSubmit = (e) => {
    e.preventDefault();

    let productEdit: Product = {
      id: product.id,
      name: name,
      description: description,
      price: price,
    };

    dispatch(editProduct(productEdit) as any);

    setModalVisible(false);
  };

  return (
    <ProductPicker product={product}>
      {({ open }) => (
        <div
          className="space-y-2"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#ccc",
          }}
        >
          <img src="data:image/png;base64,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" />
          <h2 style={{ fontWeight: "bold", fontSize: 24 }}>{product.name}</h2>
          <h3>{product.description}</h3>
          <h3>{product.price}</h3>
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
            <form onSubmit={editProductSubmit} id="productForm">
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingBottom: 20,
                }}
              >
                Edit product with id: {product?.id}
              </h2>
              <label>Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                required
                style={{ border: "1px solid black" }}
              ></input>{" "}
              <br /> <br />
              <br />
              <label>Price:</label>
              <input
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                type="number"
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
    </ProductPicker>
  );
};
