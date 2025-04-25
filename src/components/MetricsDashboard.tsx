// import React, { useState } from 'react';
// import { 
//   Box, 
//   Typography, 
//   Divider, 
//   Chip, 
//   Collapse, 
//   IconButton,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell
// } from '@mui/material';
// import { ExpandMore, ExpandLess } from '@mui/icons-material';

// const ExpandableMetricRow = ({ label, value, unit, children }) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <>
//       <Box display="flex" justifyContent="space-between" py={1}>
//         <Box display="flex" alignItems="center">
//           {children && (
//             <IconButton 
//               size="small" 
//               onClick={() => setExpanded(!expanded)}
//               sx={{ mr: 1 }}
//             >
//               {expanded ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           )}
//           <Typography variant="body2" color="text.secondary">
//             {label}
//           </Typography>
//         </Box>
//         <Box display="flex" alignItems="center">
//           <Typography variant="body2" fontWeight="bold">
//             {value} {unit && <span style={{ fontWeight: 'normal' }}>{unit}</span>}
//           </Typography>
//         </Box>
//       </Box>
//       {children && (
//         <Collapse in={expanded}>
//           <Box pl={6} pr={2} pb={1}>
//             {children}
//           </Box>
//         </Collapse>
//       )}
//     </>
//   );
// };

// const MetricsDashboard = () => {
//   const [expandedRows, setExpandedRows] = useState({});

//   const toggleRow = (rowId) => {
//     setExpandedRows(prev => ({
//       ...prev,
//       [rowId]: !prev[rowId]
//     }));
//   };

//   return (
//     <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
//       <Typography variant="h6" gutterBottom>
//         Metrics
//       </Typography>

//       {/* First Material Block */}
//       <Box mb={3}>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="subtitle2">Metrics</Typography>
//           <Typography variant="caption">
//             Stateless Steel A$3,304 / 1.430 | 0.0 mm
//           </Typography>
//         </Box>
//         <Divider sx={{ my: 1 }} />
        
//         <ExpandableMetricRow 
//           label="Dimensions" 
//           value="100 × 250" 
//           unit="mm"
//         >
//           <Table size="small">
//             <TableBody>
//               <TableRow>
//                 <TableCell>Width</TableCell>
//                 <TableCell>100 mm</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Height</TableCell>
//                 <TableCell>250 mm</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Tolerance</TableCell>
//                 <TableCell>±0.5 mm</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </ExpandableMetricRow>
        
//         <ExpandableMetricRow 
//           label="Surface Area" 
//           value="0.0545 × 198.000 -" 
//           unit="10.53"
//         />
//         <ExpandableMetricRow 
//           label="Outing Line" 
//           value="3.5688 × 1.608 -" 
//           unit="5.75"
//         />
//         <ExpandableMetricRow 
//           label="Closed Leaps" 
//           value="12 × 0.221 -" 
//           unit="2.23"
//         />
//         <ExpandableMetricRow 
//           label="Setup Price" 
//           value="4.155 / 1 =" 
//           unit="5.16"
//         />
//         <ExpandableMetricRow 
//           label="Unit Price" 
//           value="5.934" 
//         />
//       </Box>

//       {/* Second Material Block */}
//       <Box mb={3}>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="subtitle2">Metrics</Typography>
//           <Typography variant="caption">
//             Stateless Steel A$3,304 / 1.430 | 0.5 mm
//           </Typography>
//         </Box>
//         <Divider sx={{ my: 1 }} />
//         <ExpandableMetricRow 
//           label="Dimensions" 
//           value="17/24 × 17/25" 
//           unit="mm"
//         />
//         <ExpandableMetricRow 
//           label="Surface Area" 
//           value="0.0003 × 19.000 -" 
//           unit="5.01"
//         />
//         <ExpandableMetricRow 
//           label="Outing Line" 
//           value="0.8998 × 0.582 -" 
//           unit="6.55"
//         />
//         <ExpandableMetricRow 
//           label="Closed Leaps" 
//           value="0 × 0.081 -" 
//           unit="0.00"
//         />
//         <ExpandableMetricRow 
//           label="Setup Price" 
//           value="2.797 / 1 =" 
//           unit="5.39"
//         />
//         <ExpandableMetricRow 
//           label="Unit Price" 
//           value="5.933" 
//         />
//       </Box>

//       {/* Third Material Block */}
//       <Box mb={3}>
//         <Box display="flex" justifyContent="space-between">
//           <Typography variant="subtitle2">Metrics</Typography>
//           <Typography variant="caption">
//             Aluminum 575.4 / 4.145 / 3.925 | 1.0 mm
//           </Typography>
//         </Box>
//         <Divider sx={{ my: 1 }} />
//         <ExpandableMetricRow 
//           label="Dimensions" 
//           value="115 × 125.51" 
//           unit="mm"
//         />
//         <ExpandableMetricRow 
//           label="Surface Area" 
//           value="0.0205 × 3.790 -" 
//           unit="6.52"
//         />
//         <ExpandableMetricRow 
//           label="Outing Line" 
//           value="0.9865 × 0.582 -" 
//           unit="6.57"
//         />
//         <ExpandableMetricRow 
//           label="Closed Leaps" 
//           value="7 × 0.070 -" 
//           unit="0.43"
//         />
//         <ExpandableMetricRow 
//           label="Setup Price" 
//           value="2.797 / 1 =" 
//           unit="5.39"
//         />
//         <ExpandableMetricRow 
//           label="Unit Price" 
//           value="5.933" 
//         />
//       </Box>

//       {/* Qty / Price Section */}
//       <Box>
//         <Typography variant="subtitle2" gutterBottom>
//           Qty / Price
//         </Typography>
//         <Table size="small">
//           <TableBody>
//             <TableRow>
//               <TableCell>Picture</TableCell>
//               <TableCell>Order</TableCell>
//               <TableCell>11:51</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>Created</TableCell>
//               <TableCell>17:50, 05 Feb. 25</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>Updated</TableCell>
//               <TableCell>19:30, 03 Feb. 25</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>User</TableCell>
//               <TableCell>test.stotewk</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>ojyswinsk@gmail.com</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>+48956641835</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell></TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>in.tensl_adsexerth_editorialin_editorsmail</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </Box>

//       <Divider sx={{ my: 2 }} />
//       <Box display="flex" flexWrap="wrap" gap={1} mb={1}>
//         {['Key price', 'Buy', 'Subtype', 'Burn', 'Wait (20 kPa)', 'Add'].map(
//           (word) => (
//             <Chip
//               key={word}
//               label={word}
//               size="small"
//               sx={{ backgroundColor: '#f5f5f5' }}
//             />
//           )
//         )}
//         <Chip
//           label="Total"
//           size="small"
//           sx={{ backgroundColor: '#1976d2', color: 'white' }}
//         />
//         <Chip
//           label="21.60"
//           size="small"
//           sx={{ backgroundColor: '#4caf50', color: 'white' }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default MetricsDashboard;