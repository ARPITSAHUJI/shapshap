"use client"
import React from "react";
import ContentLoader from "react-content-loader";

const TableRowLoader = () => {
  return (
    <ContentLoader 
      viewBox="0 0 100% 120" 
      width="100%" 
      height={120} 
      className="w-full"
    >
      {/* Row 1 */}
      <rect x="5%" y="10" rx="4" ry="4" width="10%" height="12" />
      <rect x="20%" y="10" rx="4" ry="4" width="25%" height="12" />
      <rect x="50%" y="10" rx="4" ry="4" width="20%" height="12" />
      <rect x="75%" y="10" rx="4" ry="4" width="15%" height="12" />

      {/* Row 2 */}
      <rect x="5%" y="35" rx="4" ry="4" width="10%" height="12" />
      <rect x="20%" y="35" rx="4" ry="4" width="25%" height="12" />
      <rect x="50%" y="35" rx="4" ry="4" width="20%" height="12" />
      <rect x="75%" y="35" rx="4" ry="4" width="15%" height="12" />

      {/* Row 3 */}
      <rect x="5%" y="60" rx="4" ry="4" width="10%" height="12" />
      <rect x="20%" y="60" rx="4" ry="4" width="25%" height="12" />
      <rect x="50%" y="60" rx="4" ry="4" width="20%" height="12" />
      <rect x="75%" y="60" rx="4" ry="4" width="15%" height="12" />

      {/* Row 4 */}
      <rect x="5%" y="85" rx="4" ry="4" width="10%" height="12" />
      <rect x="20%" y="85" rx="4" ry="4" width="25%" height="12" />
      <rect x="50%" y="85" rx="4" ry="4" width="20%" height="12" />
      <rect x="75%" y="85" rx="4" ry="4" width="15%" height="12" />
      
    </ContentLoader>
  );
};

export default TableRowLoader;
