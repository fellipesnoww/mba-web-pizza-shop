import { http, HttpResponse } from 'msw'
import type { GetMonthOrdersCanceledAmount } from '../get-month-canceled-orders-amount'

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersCanceledAmount
>('/metrics/month-canceled-orders-amount', () => {
  return HttpResponse.json({
    amount: 5,
    diffFromLastMonth: -5,
  })
})