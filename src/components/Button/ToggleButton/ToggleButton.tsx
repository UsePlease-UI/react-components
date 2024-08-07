import { ChangeEvent, InputHTMLAttributes, ReactElement, ReactNode, cloneElement, forwardRef, useId } from 'react';

import { joinClassNames } from '@utils/format';

import { SizeType, getSizeStyle } from './styles';

type BaseType = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'>;

type ToggleButtonType = BaseType & {
    children: ReactNode;
    name: string;
    value: string;
    size?: SizeType;
    currentValue?: string | string[];
    isMultiple?: boolean;
};

/**
 *  [UI Component] Toggle Button Component
 *  @param children 컴포넌트
 *  @param name Toggle Button 이름
 *  @param value Toggle Button 값
 *  @param size [CSS] 버튼 사이즈 (small | medium | large)
 *  @returns JSX.Element
 */
const ToggleButton = forwardRef<HTMLInputElement, ToggleButtonType>(function ToggleButton(props, ref) {
    const { size, name, currentValue = '', isMultiple, value, onChange, children, ...rest } = props;
    const id = useId();

    const isChecked = typeof currentValue === 'string' ? value === currentValue : currentValue.includes(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.blur();
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <label
            htmlFor={id}
            className={joinClassNames(
                'group flex h-max w-max shrink-0 cursor-pointer items-center overflow-hidden border-y border-primary-600 bg-white first:rounded-l first:border-l last:rounded-r last:border-r focus-within:border-primary-700 focus-within:bg-primary-100',
                !isChecked && rest.disabled && 'border-yellow-gray-400 cursor-not-allowed',
                isChecked && rest.disabled && 'cursor-not-allowed border-gray-400'
            )}
        >
            <input
                {...rest}
                id={id}
                ref={ref}
                type={isMultiple ? 'checkbox' : 'radio'}
                name={name}
                value={value}
                checked={isChecked}
                onChange={handleChange}
                className="peer sr-only"
            />
            {typeof children === 'string' ? (
                <span
                    className={joinClassNames(
                        'text-16 font-medium uppercase',
                        'peer-disabled:bg-yellow-gray-50 peer-disabled:text-yellow-gray-600 flex items-center justify-center text-primary-800 group-focus-within:text-primary-800 group-hover:bg-primary-50 group-hover:text-primary-900 peer-checked:bg-primary-600 peer-checked:text-primary-950 peer-checked:hover:bg-primary-700 peer-checked:hover:text-white peer-disabled:peer-checked:bg-gray-400 peer-disabled:peer-checked:text-gray-200',
                        getSizeStyle(size).text
                    )}
                >
                    {children}
                </span>
            ) : (
                <span
                    className={joinClassNames(
                        'peer-disabled:bg-yellow-gray-50 peer-disabled:text-yellow-gray-600 flex items-center justify-center text-primary-800 group-focus-within:text-primary-800 group-hover:bg-primary-50 group-hover:text-primary-900 peer-checked:bg-primary-600 peer-checked:text-primary-950 peer-checked:hover:bg-primary-700 peer-checked:hover:text-white peer-disabled:peer-checked:bg-gray-400 peer-disabled:peer-checked:text-gray-200',
                        getSizeStyle(size).icon
                    )}
                >
                    {cloneElement(children as ReactElement, {
                        className: 'block text-inherit'
                    })}
                </span>
            )}
        </label>
    );
});

export default ToggleButton;
