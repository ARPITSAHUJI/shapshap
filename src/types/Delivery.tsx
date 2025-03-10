export type DeliveryStatus = 'picked up' | 'pending' | 'accepted' | 'delivered' | 'canceled' | 'failed';

export interface Delivery {
  id: string;
  pickupAddress: string;
  dropoffLocation: string;
  status: DeliveryStatus;
  created_at: string;
  updated_at: string | 'waiting';
  customerName?: string;
  phoneNumber?: string;
  notes?: string;
  delivery_address:{
    address:string
  };
  dropoff_locations:[{
    status:string
  }]
  order_status: DeliveryStatus;
  delivery_time: string;

}