import { render } from "@testing-library/react"
import { SignIn } from "./sign-in"
import { MemoryRouter } from "react-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { HelmetProvider } from "react-helmet-async"
import { queryClient } from "@/lib/react-query"

describe('SignIn', () => {
    it('should set default email input value if email is present on search params', () => {
        const wrapper = render(<SignIn />,
            {
                wrapper: ({ children }) => {
                    return (
                        <HelmetProvider>
                            <MemoryRouter initialEntries={['/sign-in?email=test@example.com']}>
                                <QueryClientProvider client={queryClient}>
                                    {children}
                                </QueryClientProvider>                   
                            </MemoryRouter>
                        </HelmetProvider>
                    )
                }
            }
        )

        const emailInput = wrapper.getByLabelText('Seu e-mail');
        expect(emailInput).toHaveValue('test@example.com');
    })
})