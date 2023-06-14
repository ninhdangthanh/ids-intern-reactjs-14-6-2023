import React, { FC, Suspense, useState } from "react";
import { Section } from "components/section";
import { Box, Button, Modal } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoadingSelector,
  productsRemainingSelector,
} from "redux/products/selector";
import { ProductCreate } from "types/product";
import {
  createProduct,
} from "redux/products/productSlice";

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  const products = useSelector(productsRemainingSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const createProductSubmit = (e) => {
    e.preventDefault();

    let productCreate: ProductCreate = {
      name: name,
      description: description,
      price: price,
    };

    dispatch(createProduct(productCreate) as any);

    resetForm();

    setModalVisible(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice(0);
  };

  return (
    <Suspense fallback={<ProductListFallback />}>
      <Section title="Danh sách sản phẩm">
        <Button
          onClick={() => {
            setModalVisible(true);
          }}
          variant="primary"
          size="large"
        >
          Create
        </Button>
        {isLoading ? (
          <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Loading......</h1>
        ) : (
          <Box className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
            {/* <InfiniteScroll
              dataLength={productsPerPage}
              next={fetchMoreProducts}
              hasMore={hasMore}
              refreshFunction={fetchProducts}
              loader={<h2>Loading...</h2>}
            >
              {products.slice(0, page * productsPerPage).map((product) => (
                <ProductItem key={product.id} product={product} />
                // <div key={product.id}>{product.name}</div>
              ))}
            </InfiniteScroll> */}
          </Box>
        )}
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
        <form onSubmit={createProductSubmit} id="productForm">
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
