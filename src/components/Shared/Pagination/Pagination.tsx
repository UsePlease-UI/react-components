/** @jsxImportSource @emotion/react */
import { ReactNode, useMemo, useState } from 'react';

import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';

import Button from 'components/Button/Button';
import IconButton from 'components/Button/IconButton';
import { ShapeType, SizeType, VariantType } from 'components/Button/styles';

import { getActiveVariant, getButtonSizeStyle, paginationStyle } from './styles';

type PaginationType = {
    variant?: VariantType;
    size?: SizeType;
    shape?: ShapeType;
    totalCount?: number;
    itemsPerPage?: number;
    pageRange?: number;
    selectedPage?: number;
    onChange?: (newPage: number) => void;
    hasFirstIcon?: boolean;
    hasLastIcon?: boolean;
    firstIcon?: ReactNode;
    lastIcon?: ReactNode;
    nextIcon?: ReactNode;
    prevIcon?: ReactNode;
};

/**
 *  Pagination Component
 *  @param totalCount 전체 데이터 크기
 *  @param itemsPerPage 페이지 당 데이터 수
 *  @param pageRange 한 번에 노출되는 페이지 버튼 갯수
 *  @param selectedPage 현재 선택된 페이지
 *  @param onChange Page Change Event Handler
 *  @param hasFirstIcon 아이콘 사용 여부
 *  @param hasLastIcon 아이콘 사용 여부
 *  @param firstIcon ReactNode
 *  @param lastIcon ReactNode
 *  @param nextIcon ReactNode
 *  @param prevIcon ReactNode
 *  @param size [CSS] 버튼 크기 (large | medium | small)
 *  @param variant [CSS] 버튼 스타일 (outlined | contained | text)
 *  @param variant [CSS] 버튼 형태 (rounded | square | circular)
 *  @returns JSX.Element
 */
export default function Pagination(props: PaginationType) {
    const {
        selectedPage,
        onChange,
        itemsPerPage = 10,
        pageRange = 10,
        totalCount = 100,
        size = 'medium',
        variant = 'outlined',
        shape = 'circular',
        hasFirstIcon = true,
        hasLastIcon = true,
        firstIcon,
        lastIcon,
        nextIcon,
        prevIcon
    } = props;

    const totalPage = useMemo(() => Math.ceil(totalCount / itemsPerPage), [totalCount, itemsPerPage]); // 총 페이지 버튼 갯수
    const [page, setPage] = useState(selectedPage || 1); // 현재 선택된 페이지
    const pageGroup = useMemo(() => Math.ceil(page / pageRange) - 1, [page, pageRange]); // 페이지 그룹

    const pageList = useMemo(
        () =>
            Array.from({ length: pageRange }, (_, idx) => idx + 1)
                .map((val) => pageGroup * pageRange + val)
                .filter((val) => val <= totalPage),
        [pageGroup, pageRange, totalPage]
    );
    const [firstPage, lastPage] = useMemo(() => [pageList[0], pageList[pageList.length - 1]], [pageList]);

    const handlePrevPageGroup = () => {
        let newPage = firstPage;
        if (page === pageList[0]) {
            newPage -= 1;
        }
        setPage(newPage);
        if (onChange) {
            onChange(newPage);
        }
    };

    const handlePreviousPage = () => {
        setPage((prev) => prev - 1);
        if (onChange) {
            onChange(page - 1);
        }
    };

    const handlePageChange = (currentPage: number) => {
        setPage(currentPage);
        if (onChange) {
            onChange(currentPage);
        }
    };

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
        if (onChange) {
            onChange(page + 1);
        }
    };

    const handleLastPageGroup = () => {
        let newPage = lastPage;
        if (page === lastPage) {
            newPage += 1;
        }
        setPage(newPage);
        if (onChange) {
            onChange(newPage);
        }
    };

    return (
        <nav aria-label="pagination">
            <ul css={paginationStyle.list}>
                {hasFirstIcon && (
                    <li>
                        <IconButton
                            size={size}
                            variant={variant}
                            shape={shape}
                            aria-label="처음 페이지로 이동하기"
                            isDisabled={page === 1}
                            onClick={handlePrevPageGroup}
                        >
                            {firstIcon || <ChevronDoubleLeftIcon />}
                        </IconButton>
                    </li>
                )}
                <li>
                    <IconButton
                        size={size}
                        variant={variant}
                        shape={shape}
                        aria-label="이전 페이지로 이동하기"
                        isDisabled={page === 1}
                        onClick={handlePreviousPage}
                    >
                        {prevIcon || <ChevronLeftIcon />}
                    </IconButton>
                </li>
                {pageList.map((currentPage) => (
                    <li key={currentPage}>
                        <Button
                            size={size}
                            variant={getActiveVariant(page === currentPage, variant)}
                            shape={shape}
                            aria-label={page === currentPage ? undefined : `page ${currentPage}`}
                            aria-current={page === currentPage ? 'page' : undefined}
                            onClick={() => handlePageChange(currentPage)}
                            customCSS={{
                                ...getButtonSizeStyle(size),
                                ...(variant === 'text' && page === currentPage && paginationStyle.activeButton)
                            }}
                        >
                            {currentPage}
                        </Button>
                    </li>
                ))}
                <li>
                    <IconButton
                        size={size}
                        variant={variant}
                        shape={shape}
                        aria-label="다음 페이지로 이동하기"
                        isDisabled={page === totalPage}
                        onClick={handleNextPage}
                    >
                        {nextIcon || <ChevronRightIcon />}
                    </IconButton>
                </li>
                {hasLastIcon && (
                    <li>
                        <IconButton
                            size={size}
                            variant={variant}
                            shape={shape}
                            aria-label="마지막 페이지로 이동하기"
                            isDisabled={page === totalPage}
                            onClick={handleLastPageGroup}
                        >
                            {lastIcon || <ChevronDoubleRightIcon />}
                        </IconButton>
                    </li>
                )}
            </ul>
        </nav>
    );
}
