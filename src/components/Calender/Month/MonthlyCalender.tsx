/* eslint-disable no-alert */
import { useState } from 'react';

import { Typography, FlexBox } from 'components/Base';
import Button from 'components/Button/Button';
import AddSchedule from 'components/Calender/Schedule/AddSchedule';
import Schedule from 'components/Calender/Schedule/Schedule';
import { MonthlyCalenderStyle } from 'components/Calender/styles';
import PopOver from 'components/Menu/PopOver';
import { useCalender } from 'components/useCalender';
import useMobile from 'hooks/useMobile';
import { CALENDER_SEVEN_DAYS } from 'pages/Example/Kimyerim1935/constants';

export default function MonthlyCalender() {
    const isMobile = useMobile();
    const { year, month, scheduleList, dispatch: calenderDispatch } = useCalender();
    const [isOpenAddForm, setIsOpenAddForm] = useState(false);
    const [isOpenSchedule, setIsOpenSchedule] = useState({ isOpen: '', index: -1 });
    const [isEdited, setIsEdited] = useState(false);

    const prevMonth = () => {
        calenderDispatch({ type: 'PREV_MONTH' });
    };

    const nextMonth = () => {
        calenderDispatch({ type: 'NEXT_MONTH' });
    };

    const handleAddContent = () => {
        if (isOpenSchedule) {
            setIsOpenSchedule({ isOpen: '', index: -1 });
            setIsEdited(false);
        }
        setIsOpenAddForm((prev) => !prev);
    };

    return (
        <FlexBox flexDirection="column" customCSS={MonthlyCalenderStyle.wrapper}>
            <FlexBox alignItems="center" justifyContent="center" customCSS={MonthlyCalenderStyle.buttonWrapper}>
                <Button size="small" variant="outlined" onClick={() => prevMonth()}>
                    prev
                </Button>
                <Typography customCSS={{ margin: '0px 20px' }}>
                    {year}년 {month}월
                </Typography>
                <Button size="small" variant="outlined" onClick={() => nextMonth()}>
                    next
                </Button>
                <div style={{ position: 'absolute', right: 0 }}>
                    {isMobile ? (
                        <Button
                            size="medium"
                            shape="circular"
                            variant="contained"
                            onClick={() => handleAddContent()}
                            customCSS={MonthlyCalenderStyle.addSchedule}
                        >
                            +
                        </Button>
                    ) : (
                        <Button size="medium" variant="contained" onClick={() => handleAddContent()}>
                            일정 추가하기
                        </Button>
                    )}
                    <PopOver isOpen={isOpenAddForm} customCSS={{ padding: 0, position: 'absolute', right: 0, top: 20 }}>
                        <AddSchedule
                            setIsOpenAddForm={setIsOpenAddForm}
                            length={scheduleList.length || 0}
                            handleCancel={handleAddContent}
                        />
                    </PopOver>
                </div>
            </FlexBox>
            <FlexBox>
                {CALENDER_SEVEN_DAYS.map((el: string, idx: number) => (
                    <Typography customCSS={{ width: '100%', height: '30px', textAlign: 'center' }} key={idx}>
                        {el}
                    </Typography>
                ))}
            </FlexBox>
            <Schedule
                isEdited={isEdited}
                setIsEdited={setIsEdited}
                isOpenAddForm={isOpenAddForm}
                setIsOpenAddForm={setIsOpenAddForm}
                isOpenSchedule={isOpenSchedule}
                setIsOpenSchedule={setIsOpenSchedule}
            />
        </FlexBox>
    );
}
