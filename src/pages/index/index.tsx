import React, { Suspense, useEffect, useState } from "react";
import { Box, Input, Page } from "zmp-ui";
import { Inquiry } from "./inquiry";
import { Welcome } from "./welcome";
import { Banner } from "./banner";
import { Categories } from "./categories";
import { Recommend } from "./recommend";
import { ProductList } from "./product-list";
import { Divider } from "components/divider";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  removeIsLoading,
  setIsLoading,
} from "redux/products/productSlice";
import { useDebounce } from "hook/useDebounce";
import { searchFilterChange } from "redux/filterSlice";

const HomePage: React.FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const searchQuery = useDebounce(inputValue, 2000);

  useEffect(() => {
    dispatch(fetchProducts() as any);
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
      <Welcome />
      <Box className="flex-1 overflow-auto">
        <Box p={4} className="bg-white">
          <Input.Search
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search input ..."
          />
        </Box>
        {/* <Banner /> */}
        {/* <Suspense>
          <Categories />
        </Suspense> */}
        {/* <Divider /> */}
        {/* <Recommend />
        <Divider /> */}
        <ProductList />
        <Divider />
      </Box>
    </Page>
  );
};

export default HomePage;
