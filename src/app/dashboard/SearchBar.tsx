import React from 'react';
import { Search } from 'lucide-react';
import { DeliveryStatus } from '@/types/Delivery';

interface SearchBarProps {
  searchQuery: string;
  selectedStatus: DeliveryStatus | 'all';
  dateRange: {
    start: string;
    end: string;
  };
  onSearchChange: (value: string) => void;
  onStatusChange: (value: DeliveryStatus | 'all') => void;
  onDateRangeChange: (range: { start: string; end: string }) => void;
}

export default function SearchBar({
  searchQuery,
  selectedStatus,
  dateRange,
  onSearchChange,
  onStatusChange,
  onDateRangeChange,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      {/* Search Input */}
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search by ID, Address, or Sender Name..."  
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters Container */}
      <div className="flex sm:flex-row flex-col gap-4 items-center w-full ">
        {/* Status Dropdown */}
        <div className="flex flex-col w-full sm:w-1/4">
          <label className="mb-1 text-sm font-medium">Status</label>
          <select
            className="border rounded-lg px-4 py-2 bg-white min-w-[150px]"
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as DeliveryStatus | 'all')}
          >
            <option value="all">All Status</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {/* Date Inputs */}
        <div className="flex flex-col w-full sm:w-1/4">
          <label className="mb-1 text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="border rounded-lg px-4 py-2"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
          />
        </div>

        <div className="flex flex-col w-full sm:w-1/4">
          <label className="mb-1 text-sm font-medium">End Date</label>
          <input
            type="date"
            className="border rounded-lg px-4 py-2"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
