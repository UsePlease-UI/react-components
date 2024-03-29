/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from 'react';

import { css } from '@emotion/react';
import palette from 'styles/palette';

import { Box, Typography } from 'components/Base';
import FlexBox from 'components/Base/FlexBox';
import PopOver from 'components/Menu/PopOver';
import useClickOutside from 'components/useClickOutside';

const popoverStyle = css({
    height: 30,
    fontWeight: 700,
    color: palette.tertiary[400],
    border: `1px solid ${palette.tertiary[400]}`,
    borderRadius: 4,
    padding: '4px 12px'
});

const ulStyle = css({
    padding: '4px 0',
    '& li': {
        height: 40,
        margin: '0 5px',
        padding: '0 10px',
        borderBottom: `1px solid ${palette.tertiary[400]}`,
        '&:hover': {
            '& a': {
                cursor: 'pointer',
                color: palette.tertiary[400]
            }
        },
        '&:last-of-type': {
            borderBottom: 0
        }
    },
    '& a': {
        display: 'inline-block',
        lineHeight: '40px',
        color: palette.primary[600]
    }
});

// FIXME: handleClickOutside 수정
export default function PopoverExample() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            setAnchorEl(null);
            document.body.style.overflow = 'auto';
        } else {
            setAnchorEl(e.currentTarget);
            document.body.style.overflow = 'hidden';
        }
    };

    const handleClose = () => setAnchorEl(null);

    useClickOutside(isOpen, handleClose, buttonRef);

    return (
        <FlexBox flexDirection="column" gap={20}>
            <Typography component="h2" fontSize={24}>
                Popover
            </Typography>
            <Box>
                <button type="button" ref={buttonRef} onClick={handleOpen} css={popoverStyle}>
                    메뉴 보기
                </button>
                <PopOver isOpen={isOpen} customCSS={{ padding: 0 }}>
                    <ul css={ulStyle}>
                        <li>
                            <a href="/">Hello</a>
                        </li>
                        <li>
                            <a href="/">Hi</a>
                        </li>
                    </ul>
                </PopOver>
            </Box>
        </FlexBox>
    );
}
