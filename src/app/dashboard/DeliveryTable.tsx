"use client";
import TableRowLoader from "@/components/common/Loaders/TableRowLoader";
import { formatDate } from "@/components/Utils/formatDate";
import { formatTime } from "@/components/Utils/formatTime";
import { getMostRecentUpdatedAt } from "@/components/Utils/getMostRecentDate";
import { Delivery, DeliveryStatus } from "@/types/Delivery";
import { useRouter } from "next/navigation";
import React from "react";

interface DeliveryTableProps {
  deliveries: Delivery[];
  isLoading?: boolean;
}

const statusColors: Record<DeliveryStatus, string> = {
  "picked up": "bg-blue-100 text-blue-800",
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
  canceled: "bg-yellow-100 text-yellow-800",
};

export default function DeliveryTable({
  deliveries,
  isLoading,
}: DeliveryTableProps) {
  const router = useRouter();
  const handleRowClick = (id: string) => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
              Dropoff Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sender Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Created
            </th>
            <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time Delivered
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <TableRowLoader />
            </tr>
          ) : deliveries?.length === 0 || deliveries === null ? (
            <tr>
              <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                {"No Deliveries Found"}
              </td>
            </tr>
          ) : (
            deliveries &&
            deliveries.map((delivery) => (
              <tr
                key={delivery.id}
                onClick={() => handleRowClick(delivery.id)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {delivery.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap truncate max-w-[250px] ">
                  {delivery?.dropoff_locations[0]?.receiver_details.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery?.receiver_details?.contact_person_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[delivery.order_status]
                    }`}
                  >
                    {delivery.order_status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatTime(delivery.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {delivery.order_status === "delivered" &&
                  delivery.dropoff_locations?.length > 0 ? (
                    getMostRecentUpdatedAt(delivery.dropoff_locations)
                  ) : delivery.order_status === "pending" ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : delivery.order_status === "failed" ||
                    delivery.order_status === "canceled" ? (
                    <span className="text-red-500">Not Completed</span>
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
