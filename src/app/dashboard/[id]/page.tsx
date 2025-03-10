"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { DeliveryStatus } from "@/types/Delivery";
import Link from "next/link"; // Import RTK Query hook
import { useGetOrderQuery } from "@/store/order/orderApi";
import withAuth from "@/components/common/withAuth";
import Loader from "@/components/common/Loaders/Loader";
import { formatTime } from "@/components/Utils/formatTime";
import Heading from "@/components/Utils/Heading";

interface Props {
  params: {
    id: string;
  };
}

const statusOrder = ["pending", "accepted", "delivered", "failed", "canceled"];

const DeliveryDetails = ({ params }: Props) => {
  const {
    data: delivery,
    isLoading,
    error,
  } = useGetOrderQuery({ id: params.id });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-red-500">Failed to load delivery details.</p>
      </div>
    );
  }

  // Extract data safely
  const currentStatusIndex = statusOrder.indexOf(delivery?.order_status || "pending");
  const deliveryTimeDelivered = delivery?.deliveredAt || "waiting";
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Heading
        title="Delivery details - ShapShap "
        description="Deliveries details"
        keywords="Details page, ShapShap, AI, ML"
      />
      <div className="max-w-6xl mx-auto">
        <Link
          href="/dashboard"
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Deliveries
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6 ">
          <div className=" p-4 border rounded-lg ">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Trip - #{delivery?.id}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Pickup Address
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {delivery?.delivery_address?.address + " " +
                      delivery?.delivery_address?.address_type || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Customer Name
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {delivery?.receiver_details?.contact_person_name || "N/A"}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Time Created
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {formatTime(delivery?.created_at || "")}
                   
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Dropoff Location
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {delivery?.dropoff_locations[0]?.receiver_details?.address || "N/A"}
                  </p>
                </div>
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Phone Number
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {delivery?.customerPhone || "N/A"}
                  </p>
                </div> */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Time Delivered
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {deliveryTimeDelivered === "waiting" ? (
                      <span className="text-yellow-500">Waiting</span>
                    ) : (
                      formatTime(deliveryTimeDelivered)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Delivery Status
            </h2>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                {statusOrder.filter((order_status) => {
                  if (delivery?.order_status === "failed") {
                    return order_status !== "canceled" && order_status !== "delivered";
                  }
                  if (delivery?.order_status === "canceled") {
                    return order_status !== "failed" && order_status !== "delivered";
                  }
                  if (delivery?.order_status === "delivered") {
                    return order_status !== "failed" && order_status !== "canceled";
                  }
                  return true;
                }).map((order_status, index) => (
                  <div
                    key={order_status}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center transition-all duration-300 ${
                      index <= currentStatusIndex ? "bg-blue-500" : "bg-gray-200"
                    }`}
                    style={{ width: `${100 / statusOrder.filter((status) => {
                      if (delivery?.order_status === "failed") return status !== "canceled" && status !== "delivered";
                      if (delivery?.order_status === "canceled") return status !== "failed" && status !== "delivered";
                      if (delivery?.order_status === "delivered") return status !== "failed" && status !== "canceled";
                      return true;
                    }).length}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between pt-5 px-4 text-xs sm:text-sm">
                {statusOrder.filter((order_status) => {
                  if (delivery?.order_status === "failed") {
                    return order_status !== "canceled" && order_status !== "delivered";
                  }
                  if (delivery?.order_status === "canceled") {
                    return order_status !== "failed" && order_status !== "delivered";
                  }
                  if (delivery?.order_status === "delivered") {
                    return order_status !== "failed" && order_status !== "canceled";
                  }
                  return true;
                }).map((order_status, index) => (
                  <div
                    key={order_status}
                    className={`flex flex-col items-center ${
                      index <= currentStatusIndex
                        ? order_status === "canceled"
                          ? "text-yellow-500"
                          : order_status === "failed"
                          ? "text-red-500"
                          : "text-blue-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mb-1 transition-all duration-300 ${
                        index <= currentStatusIndex
                          ? order_status === "canceled"
                            ? "bg-yellow-500"
                            : order_status === "failed"
                            ? "bg-red-500"
                            : "bg-blue-600"
                          : "bg-gray-400"
                      }`}
                    />
                    <span className="text-[10px] sm:text-sm font-medium capitalize">
                      {order_status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DeliveryDetails);
