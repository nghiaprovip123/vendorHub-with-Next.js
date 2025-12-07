/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useMemo } from "react";

import { categoriesMock } from "./helpers";
import { allColumns } from "./allColumns";
import { CustomDialog } from "@/components/useCustomDialog/CustomDialog";
import { useCustomDialog } from "@/components/useCustomDialog/useCustomDialog";
import { Table } from "@/components/customUI";

const CategoriesList = () => {
  const dialog = useCustomDialog();
    
  const columns = useMemo(() => {
    return allColumns(dialog);
  }, []);

  const handleCreateCategory = () => {
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
      <h1 className="mt-4 font-extrabold text-4xl">CATEGORY ({categoriesMock.length})</h1>
      <Table 
        data={categoriesMock}
        columns={columns}
        buttonText="Add Category"
        handleButtonAction={handleCreateCategory}
      />
      <CustomDialog dialog={dialog} />
    </div>
  );
};

export default CategoriesList;
