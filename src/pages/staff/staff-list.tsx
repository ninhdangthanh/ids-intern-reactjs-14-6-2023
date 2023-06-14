import React, { FC, Suspense, useState } from "react";
import { Section } from "components/section";
import { Box, Button, Modal } from "zmp-ui";
import { ProductItemSkeleton } from "components/skeletons";
import { useDispatch, useSelector } from "react-redux";
import {  StaffCreate } from "types/product";
import {
  isLoadingSelector,
  staffsRemainingSelector,
} from "redux/staff/selector";
import { StaffItem } from "components/staff";
import { createStaff } from "redux/staff/staffSlice";

export const StaffListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách nhân viên">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const StaffList: FC = () => {
  const staffs = useSelector(staffsRemainingSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const createStaffSubmit = (e) => {
    e.preventDefault();

    let staffCreate: StaffCreate = {
      name: name,
      position: position,
      department: department,
    };

    dispatch(createStaff(staffCreate) as any);

    resetForm();

    setModalVisible(false);
  };

  const resetForm = () => {
    setName("");
    setPosition("");
    setDepartment("");
  };

  return (
    <Suspense fallback={<StaffListFallback />}>
      <Section title="Danh sách nhân viên">
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
            staffs.map((staff) => <StaffItem key={staff.id} staff={staff} />)
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
          <label>Position:</label>
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            id="position"
            name="position"
            required
            style={{ border: "1px solid black" }}
          ></input>{" "}
          <br /> <br />
          <br />
          <label>Department:</label>
          <input
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            type="text"
            id="department"
            name="department"
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
