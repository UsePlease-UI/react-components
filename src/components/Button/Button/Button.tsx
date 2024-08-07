import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { joinClassNames } from '@utils/format';

import { getSizeStyle, getShapeStyle, getIconShapeStyle } from './styles';
import { ShapeType, SizeType, VariantType, getVariantStyle } from '../styles';

type BaseType = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

type ButtonType = BaseType & {
    children: ReactNode;
    isDisabled?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    isFullWidth?: boolean;
    size?: SizeType;
    variant?: VariantType;
    shape?: ShapeType;
};

/**
 *  [UI Component] Button Component
 *  @param children 컴포넌트
 *  @param isDisabled 비활성화 여부 [optional]
 *  @param startIcon 아이콘 (앞) [optional]
 *  @param endIcon 아이콘 (뒤) [optional]
 *  @param size [CSS] 버튼 크기 (large | medium | small)
 *  @param variant [CSS] 버튼 스타일 (outlined | contained | text)
 *  @param shape [CSS] 버튼 형태 (rounded | square | circular)
 *  @returns JSX.Element
 */
const Button = forwardRef<HTMLButtonElement, ButtonType>(function Button(props, ref) {
    const {
        type = 'button',
        children,
        isDisabled,
        startIcon,
        endIcon,
        size = 'medium',
        variant = 'outlined',
        shape = 'square',
        isFullWidth,
        onClick,
        ...rest
    } = props;

    if ((startIcon || endIcon) && shape === 'circular') {
        console.warn('Button with either "Start Icon" or "End Icon" does not have default circular style.');
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <button
            ref={ref}
            {...rest}
            // eslint-disable-next-line react/button-has-type
            type={type}
            disabled={isDisabled}
            onClick={handleClick}
            className={joinClassNames(
                'font-pretendard',
                getSizeStyle(size),
                getVariantStyle(variant),
                startIcon || endIcon ? getIconShapeStyle(shape) : getShapeStyle(size, shape),
                isFullWidth && 'w-full'
            )}
        >
            {startIcon || endIcon ? (
                <div className="flex items-center justify-center gap-4">
                    {startIcon && (
                        <span className="-ml-8 inline-flex h-20 w-20 shrink-0 items-center justify-center">
                            {startIcon}
                        </span>
                    )}
                    <p className="mt-2 shrink-0 text-center">{children}</p>
                    {endIcon && (
                        <span className="-mr-8 inline-flex h-20 w-20 shrink-0 items-center justify-center">
                            {endIcon}
                        </span>
                    )}
                </div>
            ) : typeof children === 'string' ? (
                <p className="mt-2 w-full text-center">{children}</p>
            ) : (
                children
            )}
        </button>
    );
});

export default Button;
