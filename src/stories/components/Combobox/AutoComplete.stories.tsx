import { useState, useCallback, ChangeEvent } from 'react';

import _ from 'lodash';

import { Autocomplete } from '@components/Combobox';
import { CommonListDataType } from '@components/types';

import { AUTOCOMPLETE } from '../constants';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Combobox/Autocomplete',
    component: Autocomplete,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const AutoCompleteTemplate: Story = {
    render: (args) => {
        const list = AUTOCOMPLETE;

        const [selectedItem, setSelectedItem] = useState<CommonListDataType>();
        const [inputValue, setInputValue] = useState<string>('');
        const [listArr, setListArr] = useState<CommonListDataType[]>(list);

        const handleSearch = useCallback(
            _.debounce((value: string) => {
                let newArr = [];
                if (value.length !== 0 || value !== '') {
                    newArr = list.filter((el: CommonListDataType) => el.label.includes(value));
                    setListArr(newArr);
                }

                if (value.length === 0) {
                    setListArr(list);
                }
            }, 100),
            []
        );

        const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setInputValue(value);
            handleSearch(value);
        }, []);

        const handleSelect = useCallback((item: CommonListDataType) => setSelectedItem(item), []);

        return (
            <div className="flex flex-col gap-10">
                <p className="mb-20 text-16 font-medium">
                    선택된 항목 :<strong className="block w-full truncate">{selectedItem?.label}</strong>
                </p>
                <Autocomplete
                    {...args}
                    label="Autocomplete example"
                    listArr={listArr}
                    inputValue={inputValue}
                    onChange={handleChange}
                    onSelect={handleSelect}
                />
            </div>
        );
    }
};

export const Default: Story = {
    ...AutoCompleteTemplate,
    args: {
        listArr: AUTOCOMPLETE
    }
};
