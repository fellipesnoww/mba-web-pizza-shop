import { render } from "@testing-library/react";
import { NavLink } from "./nav-link";
import { MemoryRouter } from "react-router";

describe('NavLink', () => {
    it('should highlight the active link when is the current page link', () => {
        const wrapper = render(
            <>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </>, 
            {
                    wrapper: ({children}) => {
                        return (
                            <MemoryRouter initialEntries={['/about']}>
                                {children}
                            </MemoryRouter>
                        )
                    }
            });

        expect(wrapper.getByText('About').dataset.current).toEqual('true');
    });
})