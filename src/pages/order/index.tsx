import { Divider } from "components/divider";
import { useDebounce } from "hook/useDebounce";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchFilterChange } from "redux/filterSlice";
import {
  fetchOrders,
  removeIsLoading,
  setIsLoading,
} from "redux/order/orderSlice";
import { Box, Input, Page } from "zmp-ui";
import { OrderList } from "./order-list";

const OrderPage: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const searchQuery = useDebounce(inputValue, 2000);

  useEffect(() => {
    dispatch(fetchOrders() as any);
  }, []);

  useEffect(() => {
    if (searchQuery || inputValue.length <= 0) searchCharacter();
    async function searchCharacter() {
      dispatch(searchFilterChange(searchQuery));
      dispatch(removeIsLoading());
    }
  }, [searchQuery]);

  useEffect(() => {
    dispatch(setIsLoading());
  }, [inputValue]);

  useEffect(() => {
    dispatch(removeIsLoading());
  }, []);

  return (
    <Page className="relative flex-1 flex flex-col bg-white">
      <Box className="flex-1 overflow-auto">
        <Box p={4} className="bg-white">
          <Input.Search
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search input ..."
          />
        </Box>
        <OrderList />
      </Box>
      <Divider />
    </Page>
  );
};

export default OrderPage;
