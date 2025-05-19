import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef
} from "material-react-table";
import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";
import axios from "axios";

type MaterialRow = {
  _id?: string;
  material: string;
  thickness: string;
  setupPrice: number;
  costFactor: number;
  loopCost: number;
  costPerM2: number;
  stock: boolean;
};


export default function MaterialTable() {
  const [editRowIndex, setEditRowIndex] = useState<number | null>(null);
  const [rowValues, setRowValues] = useState<MaterialRow | null>(null);
  const [data, setData] = useState<MaterialRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  
  const [rowCount, setRowCount] = useState(0);
  
    const base_url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${base_url}/materials`, {
          params: {
            page: pagination.pageIndex + 1,
            size: pagination.pageSize
          }
        });
        setData(res.data.items);
        setRowCount(res.data.total);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pagination]);

  console.log("items", data[0]);

  const handleSave = async () => {
    if (editRowIndex !== null && rowValues) {
      try {
        const url = rowValues._id
          ? `/api/api/materials/${rowValues._id}`
          : "/api/api/materials";
        const method = rowValues._id ? "put" : "post";

        const response = await axios[method](url, rowValues);

        const updated = [...data];
        if (rowValues._id) {
          // Update existing
          updated[editRowIndex] = response.data;
        } else {
          // Add new
          updated.push(response.data);
        }
        setData(updated);
      } catch (error) {
        console.error("Failed to save row:", error);
      } finally {
        setEditRowIndex(null);
        setRowValues(null);
      }
    }
  };

  const handleCancel = () => {
    setEditRowIndex(null);
    setRowValues(null);
  };

  const handleDelete = async (index: number) => {
    const row = data[index];
    if (!row._id) return;

    try {
      await axios.delete(`${base_url}/materials/${row._id}`);
      const updated = [...data];
      updated.splice(index, 1);
      setData(updated);
      setRowCount(prev => prev - 1);
    } catch (error) {
      console.error("Failed to delete row:", error);
    }
  };

  const handleAddNew = () => {
    setData(prev => [
      {
        material: "",
        thickness: "",
        setupPrice: 0,
        costFactor: 0,
        loopCost: 0,
        costPerM2: 0,
        stock: true
      },
      ...prev
    ]);
    setEditRowIndex(0);
    setRowValues({
      material: "",
      thickness: "",
      setupPrice: 0,
      costFactor: 0,
      loopCost: 0,
      costPerM2: 0,
      stock: true
    });
  };

  const columns: MRT_ColumnDef<MaterialRow>[] = [
    {
      header: "Material",
      accessorKey: "material",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            fullWidth
            value={rowValues?.material || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                material: e.target.value
              }))
            }
          />
        ) : (
          cell.getValue<string>()
        )
    },
    {
      header: "Thickness (mm)",
      accessorKey: "thickness",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            fullWidth
            type="number"
            value={rowValues?.thickness || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                thickness: e.target.value
              }))
            }
          />
        ) : (
          cell.getValue<string>()
        )
    },
    {
      header: "Setup Price (€)",
      accessorKey: "setupPrice",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            type="number"
            fullWidth
            value={rowValues?.setupPrice || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                setupPrice: parseFloat(e.target.value)
              }))
            }
          />
        ) : (
          cell.getValue<number>().toFixed(2)
        )
    },
    {
      header: "Cost Factor",
      accessorKey: "costFactor",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            type="number"
            fullWidth
            value={rowValues?.costFactor || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                costFactor: parseFloat(e.target.value)
              }))
            }
          />
        ) : (
          cell.getValue<number>().toFixed(3)
        )
    },
    {
      header: "Loop Cost (€)",
      accessorKey: "loopCost",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            type="number"
            fullWidth
            value={rowValues?.loopCost || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                loopCost: parseFloat(e.target.value)
              }))
            }
          />
        ) : (
          cell.getValue<number>().toFixed(2)
        )
    },
    {
      header: "Cost per m² (€)",
      accessorKey: "costPerM2",
      Cell: ({ row, cell }) =>
        editRowIndex === row.index ? (
          <TextField
            type="number"
            fullWidth
            value={rowValues?.costPerM2 || ""}
            onChange={e =>
              setRowValues(prev => ({
                ...(prev as MaterialRow),
                costPerM2: parseFloat(e.target.value)
              }))
            }
          />
        ) : (
          cell.getValue<number>().toFixed(2)
        )
    },
    {
      header: "In Stock",
      accessorKey: "stock",
      Cell: ({ row }) =>
        editRowIndex === row.index ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={rowValues?.stock || false}
                onChange={e =>
                  setRowValues(prev => ({
                    ...(prev as MaterialRow),
                    stock: e.target.checked
                  }))
                }
              />
            }
            label=""
          />
        ) : row.original.stock ? (
          "✔️"
        ) : (
          "❌"
        )
    },
    {
      header: "Actions",
      Cell: ({ row }) =>
        editRowIndex === row.index ? (
          <Box display="flex" gap={1}>
            <Tooltip title="Save">
              <IconButton onClick={handleSave} color="success">
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton onClick={handleCancel} color="error">
                <CancelIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box display="flex" gap={1}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => {
                  setEditRowIndex(row.index);
                  setRowValues({ ...row.original });
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleDelete(row.index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )
    }
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    manualPagination: true,
    rowCount,
    state: {
      pagination,
      isLoading: loading
    },
    onPaginationChange: setPagination,
    enablePagination: true,
    enableDensityToggle: false,
    enableColumnActions: false,

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

  return <MaterialReactTable table={table} />;
}
