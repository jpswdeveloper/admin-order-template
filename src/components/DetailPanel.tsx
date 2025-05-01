import React from "react";
import { Box, Typography } from "@mui/material";

const DetailPanel = ({ order }: { order: any }) => {
  console.log("DetailPanel order", order);
  return (
    <Box>
      {/* Metrics will be iterateable */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // gap: 2,
          padding: 2,
          fontSize: "0.875rem"
        }}
      >
        <Box sx={{ flex: 2 }}>
          {/* Metrics Section */}
          {order.materialDetails.map((v, index) => {
            return (
              <Box
                key={v._id}
                sx={{ display: "flex", mb: 2, justifyContent: "space-evenly" }}
              >
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: 2
                  }}
                >
                  <Typography fontWeight="bold" mb={1}>
                    Metrics #{index + 1}
                  </Typography>

                  {/* Material */}
                  <LabelBlock
                    label="Material"
                    color="#f1c40f"
                    value={v?.data?.material_name || "Steel DC01"}
                    suffix={`${v?.price?.thickness} mm`}
                  />

                  {/* Dimensions */}
                  <LabelBlock
                    label="Dimensions"
                    color="#3498db"
                    value={`${v.data?.dimensions?.[0]?.toFixed(
                      2
                    )} x ${v.data?.dimensions?.[1]?.toFixed(2)} mm`}
                  />

                  {/* Surface Area Calculation */}
                  <LabelBlock
                    label="Surface Area"
                    color="#3498db"
                    value={`${(v.data?.surface_area / 1000000).toFixed(
                      4
                    )} m² × ${v.price?.original_costs?.cost_per_m2 }`}
                    suffix={`= ${(
                      (v.data?.surface_area / 1000000) *
                      (v.price?.original_costs?.cost_per_m2)
                    ).toFixed(2)} EUR`}
                  />

                  {/* Cutting Line Calculation */}
                  <LabelBlock
                    label="Cutting Line"
                    color="#2980b9"
                    value={`${(v.data?.cutting_line / 1000).toFixed(4)} m × ${
                      v.price?.original_costs?.cost_factor 
                    }`}
                    suffix={`= ${(
                      (v.data?.cutting_line / 1000) *
                      (v.price?.original_costs?.cost_factor)
                    ).toFixed(2)} EUR`}
                  />

                  {/* Closed Loops Calculation */}
                  <LabelBlock
                    label="Closed Loops"
                    color="#2980b9"
                    value={`${v.data?.closed_loops } × ${
                      v.price?.original_costs?.loop_cost_per_loop
                    }`}
                    suffix={`= ${(
                      (v.data?.closed_loops) *
                      (v.price?.original_costs?.loop_cost_per_loop )
                    ).toFixed(2)} EUR`}
                  />

                  {/* Setup Price */}
                  <LabelBlock
                    label="Setup Price"
                    color="#95a5a6"
                    value={`${v.price?.cost_breakdown?.setup_price} / ${
                      v?.price?.quantity
                    }`}
                    suffix={`= ${(
                      (v.price?.cost_breakdown?.setup_price ) / (v?.data?.quantity)
                    ).toFixed(2)} EUR`}
                  />

                  {/* Unit Price */}
                  <LabelBlock
                    label="Unit Price"
                    color="#c0392b"
                    value={
                      v.price?.cost_breakdown?.price_per_unit?.toFixed(2) 
                      
                    }
                    suffix="EUR"
                  />

                  {/* Total Price */}
                    <LabelBlock
                      label="Total Price"
                      color="#27ae60"
                      value={`${
                        (
                          v?.price?.cost_breakdown?.total_price
                        )?.toFixed(2)
                      } EUR`}
                      sx={{ fontWeight: "bold", mt: 1 }}
                    />
                </Box>
                {/* Qty / Price Section */}
                <Box>
                  <Typography fontWeight="bold" mb={1}>
                    Qty / Price
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <span>
                      {v?.price?.quantity} x{" "}
                      {v.price?.cost_breakdown?.setup_price} =
                    </span>
                    <StyledTag>
                      {v?.price?.quantity} x{" "}
                      {v.price?.cost_breakdown?.setup_price}
                    </StyledTag>
                  </Box>
                </Box>

                {/* Picture */}
                <Box>
                  <Typography fontWeight="bold" mb={1}>
                    Picture
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <span>{v.svg_url}</span>
                    <a
                      href={`https://flusk-backend.onrender.com${v.svg_url}`}
                      style={{ color: "#2980b9" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Order Info */}
        <Box sx={{ flex: 1 }}>
          <InfoLabel label="Order" color="#f1c40f" value={order._id} />
          <InfoLabel
            label="Created"
            color="#27ae60"
            value={
              new Date(order.created_at).toLocaleString() ||
              new Date().toLocaleString()
            }
          />
          <InfoLabel
            label="Updated"
            color="#27ae60"
            value={
              new Date(order.updated_at).toLocaleString() ||
              new Date().toLocaleString()
            }
          />
          <InfoLabel label="User" color="#27ae60" value={order.phone} />
          <InfoLabel label="Email" color="#27ae60" value={order.email} />
          <InfoLabel label="Phone" color="#27ae60" value={order.phone} />
          <InfoLabel
            label="Address"
            color="#27ae60"
            value={`${order?.country?.label} ${order?.city} ${order?.street}`}
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
        <InfoLabel
          label="Net price"
          color="#587B5B"
          value={order?.totalAmount}
        />
        <InfoLabel
          label="Shipping"
          color="#587B5B"
          value={order?.additionalCost?.shipping_cost}
        />
        {/* <InfoLabel label="VAT (23.0%)" color="#587B5B" value={order.additionalCost.vat_rate} /> */}
        <InfoLabel
          label={`VAT (${order?.additionalCost?.vat_rate}%)`}
          color="#587B5B"
          value={order?.additionalCost?.vat_rate}
        />
        <InfoLabel label="Total" color="#D63638" value={order?.totalAmount} />
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
