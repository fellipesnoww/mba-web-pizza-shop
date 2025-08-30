import { Link, useRouteError } from "react-router";

export function Error(){

    const error = useRouteError() as Error;

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">Whooops, algo aconteceu...</h1>
            <p className="text-muted-foreground">Um erro aconteceu na aplicação, abaixo você encontra mais detalhes</p>
            <pre>
                {error?.message || JSON.stringify(error)}
            </pre>
            <p className="text-accent-foreground">
                Voltar para o <Link to="/" className="text-sky-600 dark:text-sky-400">Dashboard</Link>
            </p>
        </div>
    )
}