import { api } from "@/lib/axios";

export interface GetMonthOrdersCanceledAmount {
    amount: number;
    diffFromLastMonth: number;
}

export async function getMonthOrdersCanceledAmount(){
    const response = await api.get<GetMonthOrdersCanceledAmount>('/metrics/month-canceled-orders-amount');

    return response.data;
}