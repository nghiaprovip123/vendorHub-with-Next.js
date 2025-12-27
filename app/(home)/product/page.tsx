import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";
import { ProductList } from "@/src/containers/ProductManagement";

const X = () => {
  const breadcrumbItems = [
    { label: "Product Management", href: "/product" },
  ];

  return (
    <Stack gap={2}>
      <Breadcrumbs items={breadcrumbItems} />
      <ProductList />
    </Stack>
  );
};

export default X;
