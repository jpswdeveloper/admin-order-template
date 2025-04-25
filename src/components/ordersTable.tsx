import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from "material-react-table";
import { Box, Typography, Chip, Link } from "@mui/material";
import axios from "axios";
import { Check, Schedule } from "@mui/icons-material";
import DetailPanel from "./DetailPanel";
import { useNavigate } from "react-router-dom";

type OrderItem = {
  id: string;
  material: string;
  thickness: string;
  dimensions: string;
  surface: string;
  surfaceCost: string;
  cutting: string;
  cuttingCost: string;
  loops: string;
  loopCost: string;
  setupPrice: string;
  unitPrice: string;
  qty: string;
  file: string;
};

type Order = {
  total_amount: any;
  _id: string;
  id: number;
  price: number;
  name: string;
  phone: string;
  address: string;
  vat: string;
  updated: string;
  status: "Calculator Only" | "Pending";
  created?: string;
  email?: string;
  materialDetails: OrderItem[];
};

const OrdersTable = () => {
  const [data, setData] = useState<Order[]>([]);
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/api/orders", {
          params: {
            page: pagination.pageIndex + 1,
            limit: pagination.pageSize
          }
        });
        setData(response.data.orders);
        setRowCount(response.data.total);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [pagination]);
  console.log("orders data", data);
  const columns = useMemo<MRT_ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        Cell: ({ row }) => <Box fontWeight="bold">#{row.original._id}</Box>
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ row }) => row.original.total_amount?.toFixed(2)
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Address" },
      // {
      //   accessorKey: "updated",
      //   header: "Updated",
      //   Cell: ({ row }) => (
      //     <Box sx={{ color: "#666", fontSize: "0.85rem" }}>
      //       {row.original.updated}
      //     </Box>
      //   )
      // },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => {
          const val = cell.getValue<string>();

          return (
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "0.875rem",
                minWidth: 120,
                backgroundColor: "#fff",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  right: "8px",
                  width: 0,
                  height: 0,
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #999",
                  transform: "translateY(-50%)",
                  pointerEvents: "none"
                }
              }}
            >
              {val}
            </Box>
          );
        }
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false,
    manualPagination: true,
    rowCount,
    state: { pagination },
    onPaginationChange: setPagination,
    enablePagination: true,
    renderDetailPanel: ({ row }) => (
      <Box p={2} sx={{ backgroundColor: "#f8f9fa" }}>
        <DetailPanel order={row.original} />
      </Box>
    ),

    muiTableContainerProps: {
      sx: {
        height: "400px",
        overflow: "auto"
      }
    },

    muiTablePaperProps: {
      sx: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }
    },
    muiTableBodyProps: {
      sx: {
        minHeight: "350px"
      }
    }
  });
  return (
    <Box
      sx={{
        display: "flex"
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrdersTable;
