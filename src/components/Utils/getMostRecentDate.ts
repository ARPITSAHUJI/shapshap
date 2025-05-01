import { formatTime } from "./formatTime";



  /**
 * Returns the most recent valid `updated_at` date from objects
 * where `order_status === "delivered"`.
 * @param items - Array of objects with `order_status` and `updated_at`
 * @returns Most recent date string or null
 */
export function getMostRecentUpdatedAt(items:any) {
    console.log(items)
    const validDeliveredDates = items
      .filter((item:any) => item.status === "delivered")
      .map((item:any) => new Date(item.updated_at))
      .filter((date:any) => !isNaN(date.getTime()));
  
    if (validDeliveredDates.length === 0) return null;
  
    const mostRecent = validDeliveredDates.reduce((latest:any, current:any) =>
      current > latest ? current : latest
    );
    console.log('mostRecent', mostRecent)
    console.log("ok")
  
    return formatTime(mostRecent)
  }
  
  