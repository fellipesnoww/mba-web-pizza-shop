import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router";
import { z } from 'zod';
import { OrderTableSkeleton } from "./order-table-skeleton";

export function Orders() {

    const [searchParams, setSearchParams] = useSearchParams();

    const pageIndex = z.coerce.number()
        .transform((page: number) => page - 1)
        .parse(searchParams.get('page') ?? '1');
    
    const orderId = searchParams.get('orderId');
    const customerName = searchParams.get('customerName');
    const status = searchParams.get('status'); 

    const { data: result, isLoading: isLoadingOrders } = useQuery({
        queryKey: ['orders', pageIndex, orderId, customerName, status],
        queryFn:() => getOrders({ pageIndex, orderId, customerName, status: status === ''  ? null : status})
    });

    function handlePaginate(page: number) {
        setSearchParams(prev => {
            prev.set('page', (page + 1).toString())
            return prev;
        });
    }

    return (
        <>
            <Helmet title="Pedidos"/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
                <div className="space-y-2.5">
                    <OrderTableFilters />
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Identificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado há</TableHead>
                                    <TableHead className="w-[180px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {result && result.orders.map((order) => {
                                    return <OrderTableRow key={order.orderId} order={order}/>
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {isLoadingOrders && <OrderTableSkeleton />}
                    {result && (
                        <Pagination 
                            pageIndex={result.meta.pageIndex}
                            totalCount={result.meta.totalCount} 
                            perPage={result.meta.perPage}
                            onPageChange={(page) => handlePaginate(page)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}