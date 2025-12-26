import { Stack } from "@mui/material";

import { Breadcrumbs } from "@/components/common";

const X = () => {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <Stack>
      <Breadcrumbs items={breadcrumbItems} />
    </Stack>
  );
};

export default X;
