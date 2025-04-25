import React from "react";
import { Box, Typography } from "@mui/material";

const DetailPanel = ({ order }: { order: any }) => {
  return (
    <Box>
      {/* Metrics will be iterateable */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          padding: 2,
          fontSize: "0.875rem"
        }}
      >
        {/* Metrics Section */}
        {order.materialDetails.map(v => {
          return (
            <>
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Metrics
                </Typography>
                <LabelBlock
                  label="Material"
                  color="#f1c40f"
                  value="Steel S235 / 1.0038"
                  suffix="6.0 mm"
                />
                <LabelBlock
                  label="Dimensions"
                  color="#3498db"
                  value="182.5 mm x 45.74 mm"
                />
                <LabelBlock
                  label="Surface Area"
                  color="#3498db"
                  value="0.0083 x 41.958"
                  suffix="= 0.35"
                />
                <LabelBlock
                  label="Cutting Line"
                  color="#2980b9"
                  value="0.7016 x 0.932"
                  suffix="= 0.65"
                />
                <LabelBlock
                  label="Closed Loops"
                  color="#2980b9"
                  value="5 x 0.098"
                  suffix="= 0.49"
                />
                <LabelBlock
                  label="Setup Price"
                  color="#95a5a6"
                  value="3.265 / 1"
                  suffix="= 3.27"
                />
                <LabelBlock label="Unit Price" color="#c0392b" value="4.76" />
              </Box>

              {/* Qty / Price Section */}
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Qty / Price
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <span>{v?.price?.quantity} x {v?.price?.cost_breakdown?.total_price}  =</span>
                  <StyledTag>{v?.price?.quantity} x {v?.price?.cost_breakdown?.total_price}</StyledTag>
                </Box>
              </Box>

              {/* Picture */}
              <Box>
                <Typography fontWeight="bold" mb={1}>
                  Picture
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <span>{v.file_url}</span>
                  <a href={`/api${v.file_url}`} style={{ color: "#2980b9" }}>
                    View
                  </a>
                </Box>
              </Box>
            </>
          );
        })}

        {/* Order Info */}
        <Box>
          <InfoLabel label="Order" color="#f1c40f" value={order._id} />
          <InfoLabel
            label="Created"
            color="#27ae60"
            value={new Date(order.updated).toLocaleString()||new Date().toLocaleString()}
          />
          <InfoLabel
            label="Updated"
            color="#27ae60"
            value={new Date(order.updated).toLocaleString()||new Date().toLocaleString()}
          />
          <InfoLabel label="User" color="#27ae60" value={order.phone} />
          <InfoLabel
            label="Email"
            color="#27ae60"
            value={order.email}
          />
          <InfoLabel label="Phone" color="#27ae60" value={order.phone} />
          <InfoLabel
            label="Address"
            color="#27ae60"
            value={order.address}
          />
        </Box>
      </Box>

      {/* Final Pricing Summary */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          backgroundColor: "#eee",
          py: 1
        }}
      >
        <InfoLabel label="Net price" color="#587B5B" value={order.totalAmount} />
        <InfoLabel label="Shipping" color="#587B5B" value={order.additionalCost.shipping_cost} />
        {/* <InfoLabel label="VAT (23.0%)" color="#587B5B" value={order.additionalCost.vat_rate} /> */}
        <InfoLabel label={`VAT (${order.additionalCost.vat_rate}%)`} color="#587B5B" value={order.additionalCost.vat_rate} />
        <InfoLabel label="Total" color="#D63638" value={order.totalAmount} />
      </Box>
    </Box>
  );
};

// Helper to show color-labeled blocks
const LabelBlock = ({ label, color, value, suffix }: any) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box
      sx={{
        backgroundColor: color,
        padding: "2px 6px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "0.75rem",
        minWidth: 70,
        textAlign: "center",
        mr: 1
      }}
    >
      {label}
    </Box>
    <StyledTag>{value}</StyledTag>
    {suffix && <StyledTag>{suffix}</StyledTag>}
  </Box>
);

// Simple tag with dark background
const StyledTag = ({ children }: any) => (
  <Box
    sx={{
      backgroundColor: "#555",
      color: "#fff",
      padding: "2px 6px",
      borderRadius: "3px",
      fontSize: "0.75rem",
      ml: 0.5
    }}
  >
    {children}
  </Box>
);

// Right panel labels & final summary
const InfoLabel = ({ label, value, color }: any) => (
  <Box display="flex" alignItems="center" mb={1}>
    <Box
      sx={{
        backgroundColor: color,
        padding: "2px 6px",
        fontWeight: "bold",
        color: "#fff",
        fontSize: "0.75rem",
        minWidth: 80,
        textAlign: "center",
        mr: 1
      }}
    >
      {label}
    </Box>
    <StyledTag>{value}</StyledTag>
  </Box>
);

export default DetailPanel;
