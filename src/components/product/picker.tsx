import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { deleteProduct } from "redux/products/productSlice";
import { Product } from "types/product";
import { Box } from "zmp-ui";

export interface ProductPickerProps {
  product?: Product;
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
}) => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const confirmDelete = () => {
    dispatch(deleteProduct(product?.id as string) as any);
    setVisible(false);
  };

  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
          autoHeight
        >
          <h2
            style={{
              textAlign: "center",
              fontWeight: "bold",
              paddingBottom: 20,
            }}
          >
            Delete product with id: {product?.id}
          </h2>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0px 50px 30px",
            }}
          >
            <button
              onClick={confirmDelete}
              style={{ backgroundColor: "green", padding: "12px 30px" }}
            >
              <strong>Confirm</strong>
            </button>
            <button
              onClick={() => {
                setVisible(false);
              }}
              style={{ backgroundColor: "red", padding: "12px 30px" }}
            >
              <strong>Cancel</strong>
            </button>
          </Box>
        </Sheet>,
        document.body
      )}
    </>
  );
};
