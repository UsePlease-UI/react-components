import { css } from '@emotion/react';
import { palette } from 'styles';

export const listBoxStyle = {
    list: css({
        width: '100%',
        maxHeight: 300,
        padding: '10px 0',
        border: `1px solid ${palette.gray['100']}`,
        borderRadius: 4,
        backgroundColor: palette.neutral.white,
        overflowX: 'hidden',
        overflowY: 'auto'
    }),
    listItem: css({
        width: '100%',
        minWidth: 120,
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.5,
        padding: '0 12px',
        '& button': {
            width: '100%',
            height: 40,
            textAlign: 'left',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        '&:hover, &:hover button': {
            fontWeight: 600,
            color: palette.neutral.white,
            backgroundColor: palette.tertiary['400']
        }
    })
};
