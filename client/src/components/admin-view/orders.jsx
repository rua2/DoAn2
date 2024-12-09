import { useEffect, useState } from "react";  
import { Button } from "../ui/button";  
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";  
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "../ui/dialog"; // Thêm DialogHeader, DialogBody, DialogFooter cho cấu trúc tốt hơn.  
import AdminOrderDetailsView from "./order-details";  
import { useDispatch, useSelector } from "react-redux";  
import {  
  getAllOrdersForAdmin,  
  getOrderDetailsForAdmin,  
  resetOrderDetails,  
} from "@/store/admin/order-slice";  
import { Badge } from "../ui/badge";  

function AdminOrdersView() {  
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);  
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Thêm state để lưu ID đơn hàng được chọn  
  const { orderList, orderDetails, loadingOrderDetails } = useSelector((state) => state.adminOrder); // Thêm loadingOrderDetails để xử lý loading  
  const dispatch = useDispatch();  
  
  useEffect(() => {  
    dispatch(getAllOrdersForAdmin());  
  }, [dispatch]);  

  const handleOpenDetails = (orderId) => {  
    setSelectedOrderId(orderId);  
    dispatch(getOrderDetailsForAdmin(orderId));  
    setOpenDetailsDialog(true);  
  };  

  const handleCloseDetails = () => {  
    setOpenDetailsDialog(false);  
    setSelectedOrderId(null);  
    dispatch(resetOrderDetails());  
  };  

  return (  
    <Card>  
      {/* ... (CardHeader, CardTitle như cũ) ... */}  
      <CardContent>  
        <Table>  
          {/* ... (TableHeader, TableBody như cũ) ... */}  
          <TableBody>  
            {orderList && orderList.map((orderItem) => (  
              <TableRow key={orderItem._id}> {/*Thêm key cho mỗi hàng để tối ưu hiệu suất*/}  
                <TableCell>{orderItem._id}</TableCell>  
                <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>  
                <TableCell>  
                  <Badge  
                    className={`py-1 px-3 ${  
                      orderItem.orderStatus === "confirmed"  
                        ? "bg-green-500"  
                        : orderItem.orderStatus === "rejected"  
                        ? "bg-red-600"  
                        : "bg-black"  
                    }`}  
                  >  
                    {orderItem.orderStatus}  
                  </Badge>  
                </TableCell>  
                <TableCell>${orderItem.totalAmount}</TableCell>  
                <TableCell>  
                  <Button onClick={() => handleOpenDetails(orderItem._id)}>View Details</Button>  
                </TableCell>  
              </TableRow>  
            ))}  
          </TableBody>  
        </Table>  
      </CardContent>  
      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDetails}>  
        <DialogHeader>Order Details</DialogHeader>  
        <DialogBody>  
          {loadingOrderDetails ? (  
            <p>Loading...</p>  
          ) : (  
            <AdminOrderDetailsView orderDetails={orderDetails} />  
          )}  
        </DialogBody>  
        <DialogFooter>  
          <Button onClick={handleCloseDetails}>Close</Button>  
        </DialogFooter>  
      </Dialog>  
    </Card>  
  );  
}  

export default AdminOrdersView;
