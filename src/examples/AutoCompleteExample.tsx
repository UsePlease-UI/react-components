import { useState, useCallback, useEffect } from 'react';

import _ from 'lodash';

import FlexBox from 'components/atoms/FlexBox';
import AutoComplete from 'components/molecules/AutoComplete';
import { AUTOCOMPLETE } from 'constants/autocomplete';

type ListType = {
    idx: number;
    label: string;
    value: string;
};

export default function AutoCompleteExample() {
    const list = AUTOCOMPLETE;
    const [listArr, setListArr] = useState<ListType[]>(list);
    const [inputValue, setInputValue] = useState<string>('');

    const handleSearch = useCallback(
        _.debounce((value: string) => {
            let newArr = [];
            if (value.length !== 0 && value !== '') {
                newArr = list.filter((el: ListType) => el.label.includes(value));
                setListArr(newArr);
            }
        }, 100),
        []
    );
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputValue(value);
        handleSearch(value);
    };

    useEffect(() => {
        if (!inputValue) {
            setListArr([]);
        }
    }, [inputValue]);

    return (
        <FlexBox direction="column" gap={10}>
            <h2>AutoComplete</h2>
            <AutoComplete label="autoComplete" listArr={listArr} inputValue={inputValue} onChange={handleChange} />
        </FlexBox>
    );
}
