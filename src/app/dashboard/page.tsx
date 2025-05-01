"use client";
import { Delivery, DeliveryStatus } from "@/types/Delivery";
import React, { useCallback, useEffect, useState } from "react";
import DeliveryTable from "./DeliveryTable";
import SearchBar from "./SearchBar";
import CardDataStats from "./CardDetails";
import { useGetAllOrdersQuery } from "@/store/order/orderApi";
import withAuth from "@/components/common/withAuth";
import Heading from "@/components/Utils/Heading";
import Header from "@/components/Layouts/Header";
import { Pagination } from "@/components/common/Pagination";

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
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);


  const { data: deliveryData, isLoading, isFetching } = useGetAllOrdersQuery({
    query: searchQuery,
    status: selectedStatus !== "all" ? selectedStatus : undefined,
    startDate: dateRange.start || undefined,
    endDate: dateRange.end || undefined,
    limit,       // or use a state variable if you want dynamic pagination
    offset,       // update this for pagination
  }, {
    refetchOnMountOrArgChange: true,
  });
  
  

  useEffect(() => {
    if (!deliveryData?.orders) return;
    let failedDeliveries = 0;
    let canceledDeliveries = 0;
    let deliveredDeliveries = 0;

    const filtered = deliveryData.orders.filter((order: any) => {
      
       // Counting orders by status
       if (order.order_status === "failed") failedDeliveries++;
       if (order.order_status === "canceled") canceledDeliveries++;
       if (order.order_status === "delivered"){
        deliveredDeliveries++
       } 

    });
    setTotalFailedDeliveries(failedDeliveries || 0)
    setTotalCanceledDeliveries(canceledDeliveries || 0)
    setTotalDeliveredDeliveries( deliveredDeliveries || 0)
  }, [deliveryData]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setOffset(0); // Reset pagination
  }, []);
  
  const handleStatusChange = useCallback((value: DeliveryStatus | "all") => {
    setSelectedStatus(value);
    setOffset(0);
  }, []);
  
  const handleDateRangeChange = useCallback((range: { start: string; end: string }) => {
    setDateRange(range);
    setOffset(0);
  }, []);

  return (
    <div>
      {/* Meta Data */}
      <Heading
        title="Delivery list - ShapShapp"
        description="Deliveries List"
        keywords="ShapShap, AI, ML"
      />
      <Header/>
      <div className="min-h-screen bg-gray-50 p-4 sm:px-10 md:px-15 sm:py-8 ">
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
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
              onDateRangeChange={handleDateRangeChange}
            />

            <DeliveryTable deliveries={ deliveryData?.orders|| []} isLoading={isFetching} />
            <Pagination currentPage={offset} totalItems={30} totalPages={3} itemsPerPage={limit} onPageChange={setOffset}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard) ;
