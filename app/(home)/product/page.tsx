import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";

const X = () => {
  const breadcrumbItems = [
    { label: "Product Management", href: "/product" },
  ];

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
