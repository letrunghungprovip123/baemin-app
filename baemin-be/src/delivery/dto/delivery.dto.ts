export class DeliveryDto {
    delivery_id : number;
    order_id : number;
    driver_id : number;
    status : string;
    delivery_address : string;
    delivery_time : Date;
    created_at : Date;
}
