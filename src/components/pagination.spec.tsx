import { render } from '@testing-library/react';
import { Pagination } from "./pagination";
import { userEvent } from '@testing-library/user-event'
import { beforeEach } from 'node:test';

const onPageChangeCallback = vi.fn();

describe('Pagination', () => {

    beforeEach(() => {
        onPageChangeCallback.mockClear();
    })

    it('should display the right amount of pages and results', () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        );

        const totalItems = wrapper.getByText('Total de 200 item(s)');
        const currentPage = wrapper.getByText('Página 1 de 20');

        expect(totalItems).toBeInTheDocument();
        expect(currentPage).toBeInTheDocument();
    })

    it('should be able to navigate to the next page', async () => {
        const user = userEvent.setup();
        
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        );

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Próxima página'
        });

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(1);
    })

    it('should be able to navigate to the previous page', async () => {
        const user = userEvent.setup();
        
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        );

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Página anterior'
        });

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(4);
    })

    it('should be able to navigate to the first page', async () => {
        const user = userEvent.setup();
        
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        );

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Primeira página'
        });

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(0);
    })

    it('should be able to navigate to the last page', async () => {
        const user = userEvent.setup();
        
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        );

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Última página'
        });

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(19);
    })
})