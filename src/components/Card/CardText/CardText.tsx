import { ReactNode, useCallback, useState } from 'react';

import { IconButton } from '@components/Button';

import { ChevronDownFilled, ChevronUpFilled } from '@fluentui/react-icons';

import { TextType } from '../types';

type CardTextType = TextType & {
    isExpandable?: boolean;
    onClick?: () => void;
    expandedContents?: ReactNode;
};

/**
 *  Card Text Component (Card Body Component)
 *  @param primaryText
 *  @param secondaryText
 */
export default function CardText({
    primaryText,
    secondaryText,
    isExpandable,
    expandedContents,
    onClick,
    ...rest
}: CardTextType) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = useCallback(() => {
        setIsExpanded((prev) => !prev);
        if (onClick) {
            onClick();
        }
    }, [onClick]);

    return (
        <>
            <div {...rest} className="flex items-center justify-between px-12 py-9">
                <div>
                    {typeof primaryText === 'string' ? (
                        <p className="text-16 font-semibold leading-20 text-gray-950">{primaryText}</p>
                    ) : (
                        primaryText
                    )}
                    {typeof secondaryText === 'string' ? (
                        <small className="text-12 font-normal leading-16 text-gray-900">{secondaryText}</small>
                    ) : (
                        secondaryText
                    )}
                </div>
                {isExpandable && (
                    <IconButton variant="text" size="small" onClick={handleClick}>
                        {isExpanded ? <ChevronUpFilled /> : <ChevronDownFilled />}
                    </IconButton>
                )}
            </div>
            {isExpandable && isExpanded && <div className="px-12 py-9">{expandedContents}</div>}
        </>
    );
}
