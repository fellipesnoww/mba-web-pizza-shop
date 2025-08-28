import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router";

const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
});

type OrdersFiltersSchema = z.infer<typeof orderFiltersSchema>;

export function OrderTableFilters() {

    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');
    const customerName = searchParams.get('customerName');
    const status = searchParams.get('status');

    const { handleSubmit, register, control, reset } = useForm<OrdersFiltersSchema>({
        resolver: zodResolver(orderFiltersSchema),
        defaultValues: {
            orderId: orderId ?? '',
            customerName: customerName ?? '',
            status: status ?? ''
        }
    });

    function handleFilter({orderId, customerName, status}: OrdersFiltersSchema) {
        setSearchParams(state => {
            if(orderId) {
                state.set('orderId', orderId);
            } else {
                state.delete('orderId');
            }

            if(customerName) {
                state.set('customerName', customerName);
            } else {
                state.delete('customerName');
            }

            if(status) {
                state.set('status', status);
            } else {
                state.delete('status');
            }

            state.set('page', '1');

            return state;
        })
    }

    function handleClearFilters(){
        setSearchParams((state) => {
            state.delete('orderId');
            state.delete('customerName');
            state.delete('status');
            state.set('page', '1');

            return state;
        });

        reset({
            orderId: '',
            customerName: '',
            status: 'all'
        });
    }

    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit(handleFilter)}>
            <span className="text-sm font-semibold">Filtros:</span>
            <Input className="h-8 w-[320px]" placeholder="ID do pedido" {...register("orderId")}/>
            <Input className="h-8 w-[320px]" placeholder="Nome do cliente" {...register("customerName")}/>
            <Controller 
                control={control} 
                name="status"
                render={({field: {name, onChange, value, disabled}}) => {
                    return (
                        <Select 
                            defaultValue="all" 
                            name={name}
                            onValueChange={onChange} 
                            value={value} 
                            disabled={disabled}
                        >
                            <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos status</SelectItem>
                                <SelectItem value="pending">Pendente</SelectItem>
                                <SelectItem value="canceled">Cancelado</SelectItem>
                                <SelectItem value="delivering">Em entrega</SelectItem>
                                <SelectItem value="delivered">Entregue</SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Button type="submit" variant="secondary" size="xs">
                <Search className="h-4 w-4 mr-2"/>
                Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="xs" onClick={() => handleClearFilters()}>
                <X className="h-4 w-4 mr-2"/>
                Remover filtros
            </Button>
        </form>
    )
}