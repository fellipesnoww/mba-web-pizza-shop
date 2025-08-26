import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Search, X } from "lucide-react";


export function OrderTableFilters() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input className="h-8 w-[320px]" placeholder="ID do pedido"/>
            <Input className="h-8 w-[320px]" placeholder="Nome do cliente"/>
            <Select defaultValue="all">
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

            <Button type="submit" variant="secondary" size="xs">
                <Search className="h-4 w-4 mr-2"/>
                Filtrar resultados
            </Button>
            <Button type="button" variant="outline" size="xs">
                <X className="h-4 w-4 mr-2"/>
                Remover filtros
            </Button>
        </form>
    )
}