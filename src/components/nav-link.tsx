import { Link, useLocation, type LinkProps } from "react-router";

interface NavLinkProps extends LinkProps{

}
export function NavLink(props: NavLinkProps) {

    const { pathname } = useLocation();

    return (
        <Link 
            data-current={pathname === props.to}
            className="flex items-center gap-1.5 tex-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground" 
            {...props} 
        />
    )
}