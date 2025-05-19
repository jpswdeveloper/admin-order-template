import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from "material-react-table";
import { Box, Typography, Chip, Link, CircularProgress, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { Check, Schedule } from "@mui/icons-material";
import DetailPanel from "./DetailPanel";
import { useNavigate } from "react-router-dom";
import moment from "moment";



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
  city?: string;
  street?: string;
  country?:{
    label:string
  };
  totalAmount: number;
  _id: string;
  id: number;
  price: number;
  name: string;
  phone: string;
  address: string;
  vat: string;
  updated: string;
  status: "Pending" | "In Progress" | "Manufactured" | "Delivered"|"Cancelled";
  email?: string;
  finalized:boolean;
  created_at?: string;
  updated_at?: string;
  materialDetails: OrderItem[];
};

const OrdersTable = () => {
  const [data, setData] = useState<Order[]>([]);
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  const [rowCount, setRowCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const base_url=import.meta.env.VITE_BASE_URL
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${base_url}/orders`, {
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
        Cell: ({ row }) => row.original.totalAmount?.toFixed(2)
      },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "phone", header: "Phone" },
      {
        accessorKey: "country",
        header: "Address",
        Cell: ({ row }) => {
          return (<Typography>{row?.original?.country?.label} {row?.original?.city} {row?.original?.street}</Typography>)
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        Cell: ({ row }) => (
          <Link
            href={`mailto:${row.original.email}`}
            sx={{ color: "#2980b9" }}
          >
            {row.original.email}
          </Link>
        )
      },
  
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ row, table }) => {
          const [status, setStatus] = useState(row.original.status||'Pending');
          const [isUpdating, setIsUpdating] = useState(false);
      
          const handleStatusChange = async (event) => {
            const newStatus = event.target.value;
            setIsUpdating(true);
            try {
              await axios.put(`${base_url}/orders/${row.original._id}/status`, {
                status: newStatus
              });
              console.log("Status updated successfully",newStatus);
              setStatus(newStatus);
              setPagination(prev => ({ ...prev }));
            } catch (error) {
              console.error("Error updating status:", error);
            } finally {
              setIsUpdating(false);
            }
          };
      
          const statusColors = {
            pending: "#f39c12",
            "In Progress": "#3498db",
            manufactured: "#2ecc71",
            delivered: "#27ae60",
            cancelled: "#e74c3c"
          };
      
          return (
            <Box sx={{ position: 'relative', minWidth: 150 }}>
              <TextField
                select
                value={status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: `${statusColors[status]}20`,
                    borderColor: statusColors[status],
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: statusColors[status],
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: statusColors[status],
                      borderWidth: 1,
                    },
                  },
                  '& .MuiSelect-select': {
                    paddingRight: '32px', // Space for loading indicator
                  },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root': {
                          padding: '6px 16px',
                        },
                      },
                    },
                  },
                }}
              >
                {Object.entries(statusColors).map(([key, color]) => (
                  <MenuItem key={key} value={key}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: color,
                          marginRight: 1,
                        }}
                      />
                      {key.toUpperCase()}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
              {isUpdating && (
                <CircularProgress
                  size={20}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                />
              )}
            </Box>
          );
        }
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        Cell: ({ row }) => {
          return moment(row.original.created_at).format("YYYY-MM-DD HH:mm:ss"); // Format using Moment.js
        }
      },
      {
        accessorKey: "updated_at",
        header: "Updated At",
        Cell: ({ row }) => {
          return moment(row.original.updated_at).format("YYYY-MM-DD HH:mm:ss"); // Format using Moment.js
        }
      },
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
    enableDensityToggle: false,
    renderDetailPanel: ({ row }) => (
      <Box p={2} sx={{ backgroundColor: "#f8f9fa" }}>
        <DetailPanel order={row.original} />
      </Box>
    ),

    muiTableContainerProps: {
      sx: {
        height: "100%",
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
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default OrdersTable;
