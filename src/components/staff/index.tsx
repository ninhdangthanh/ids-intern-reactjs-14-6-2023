import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, editProduct } from "redux/products/productSlice";
import { editStaff } from "redux/staff/staffSlice";
import { Product, ProductCreate, Staff } from "types/product";
import { Button, Modal } from "zmp-ui";
import { StaffPicker } from "./picker";

export const StaffItem: FC<{ staff: Staff }> = ({ staff }) => {
  const [modalVisible, setModalVisible] = useState(false);
  //form state
  const [name, setName] = useState(staff.name);
  const [position, setPosition] = useState(staff.position);
  const [department, setDepartment] = useState(staff.department);

  const dispatch = useDispatch();

  const editStaffSubmit = (e) => {
    e.preventDefault();

    let staffEdit: Staff = {
      id: staff.id,
      name: name,
      position: position,
      department: department,
    };

    dispatch(editStaff(staffEdit) as any);

    setModalVisible(false);
  };

  return (
    <StaffPicker staff={staff}>
      {({ open }) => (
        <div
          className="space-y-2"
          style={{
            textAlign: "center",
            marginBottom: "20px",
            backgroundColor: "#ccc",
          }}
        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMYSQ3I5N_1wrsEKTZ4W1P4TNJnUSnThL1sGveSUI&s" />
          <h2 style={{ fontWeight: "bold", fontSize: 24 }}>{staff.name}</h2>
          <h3>{staff.position}</h3>
          <h3>{staff.department}</h3>
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
                Edit product with id: {staff?.id}
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
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                id="description"
                name="description"
                required
                style={{ border: "1px solid black" }}
              ></input>{" "}
              <br /> <br />
              <br />
              <label>Price:</label>
              <input
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                type="text"
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
    </StaffPicker>
  );
};
