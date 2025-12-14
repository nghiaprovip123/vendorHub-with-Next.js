/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useMemo } from "react";

import { CustomDialog } from "@/components/useCustomDialog/CustomDialog";
import { useCustomDialog } from "@/components/useCustomDialog/useCustomDialog";
import { mockProducts } from "./helpers";
import { allColumns } from "./allColumns";
import { Table } from "@/components/common";

const ProductsList = () => {
  const dialog = useCustomDialog();

  const columns = useMemo(() => {
    return allColumns(dialog);
  }, []);

  const handleCreateProduct = () => {
    dialog.open({
      title: 'Add New Category',
      content: <></>,
      confirmText: "Submit",
      cancelText: 'Cancel',
      size: "md",
    });
  };
  
  return (
    <div className="w-full px-8">
      <h1 className="mt-4 font-extrabold text-4xl">PRODUCT(s) ({mockProducts.length})</h1>
      <Table 
        data={mockProducts}
        columns={columns}
        buttonText="Add Product"
        handleButtonAction={handleCreateProduct}
      />
      <CustomDialog dialog={dialog} />
    </div>
  );
};

export default ProductsList;
