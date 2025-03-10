"use client";
import { Delivery, DeliveryStatus } from "@/types/Delivery";
import React, { useEffect, useState } from "react";
import DeliveryTable from "./DeliveryTable";
import SearchBar from "./SearchBar";
import CardDataStats from "./CardDetails";
import { useGetAllOrdersQuery } from "@/store/order/orderApi";
import withAuth from "@/components/common/withAuth";
import Heading from "@/components/Utils/Heading";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalFailedDeliveries, setTotalFailedDeliveries] = useState(0)
  const [totalCanceledDeliveries, setTotalCanceledDeliveries] = useState(0)
  const [totalDeliveredDeliveries, setTotalDeliveredDeliveries] = useState(0)
  const [selectedStatus, setSelectedStatus] = useState<DeliveryStatus | "all">(
    "all"
  );
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  // const [data, setData] = useState<{ orders: any[] } | null>(null);
  const [totalOrders, setTotalOrders] = useState(0);

  const { data: deliveryData , isLoading } = useGetAllOrdersQuery({
    refetchOnMountOrArgChange: true,
  });
  console.log(deliveryData);

  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    if (!deliveryData?.orders) return;

    const filtered = deliveryData.orders.filter((order: any) => {
      let failedOrders = 0;
      let canceledOrders = 0;
      let deliveredOrders = 0;
      const matchesSearch = order.id
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || order.order_status === selectedStatus;

      const matchesDate =
        (!dateRange.start ||
          new Date(order.created_at) >= new Date(dateRange.start)) &&
        (!dateRange.end ||
          new Date(order.created_at) <= new Date(dateRange.end));
      
      // const totalDelivered  = deliveryData.orders.filter((order:Delivery) => order?.order_status = "delivered")
      // if(totalDelivered && totalDelivered.length !== 0){
      //   setTotalOrders(totalDelivered.length)

      // }
      return matchesSearch && matchesStatus && matchesDate;
    });
    setTotalOrders(deliveryData?.total_size)

    setFilteredOrders(filtered);
  }, [searchQuery, selectedStatus, dateRange, deliveryData]);

  useEffect(() => {
    if (!deliveryData?.orders) return;
    let failedDeliveries = 0;
    let canceledDeliveries = 0;
    let deliveredDeliveries = 0;

    const filtered = deliveryData.orders.filter((order: any) => {
      
       // Counting orders by status
       if (order.order_status === "failed") failedDeliveries++;
       if (order.order_status === "canceled") canceledDeliveries++;
       if (order.order_status === "delivered") deliveredDeliveries++;
    });
    setTotalFailedDeliveries(failedDeliveries || 0)
    setTotalCanceledDeliveries(canceledDeliveries || 0)
    setTotalDeliveredDeliveries( deliveredDeliveries || 0)
  }, [deliveryData]);

  return (
    <div>
      {/* Meta Data */}
      <Heading
        title="Delivery list - ShapShapp"
        description="Deliveries List"
        keywords="ShapShap, AI, ML"
      />
      <div className="min-h-screen bg-gray-50 p-4 sm:px-15 sm:py-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-2 sm:p-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-5">
              <CardDataStats
                title="OnGoing Trips"
                total={totalOrders}
                color="bg-blue-400"
                isLoading={isLoading}
              />
              <CardDataStats
                title="Canceled Trips"
                total={totalCanceledDeliveries}
                color="bg-red-300"
                isLoading={isLoading}
              />
              <CardDataStats
                title="Completed Trips"
                total={totalDeliveredDeliveries}
                color="bg-green-400"
                isLoading={isLoading}
              />
            </div>
            <SearchBar
              searchQuery={searchQuery}
              selectedStatus={selectedStatus}
              dateRange={dateRange}
              onSearchChange={setSearchQuery}
              onStatusChange={setSelectedStatus}
              onDateRangeChange={setDateRange}
            />

            <DeliveryTable deliveries={filteredOrders || []} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard) ;
