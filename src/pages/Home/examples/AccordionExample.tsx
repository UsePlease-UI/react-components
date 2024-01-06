/** @jsxImportSource @emotion/react */
import { useState } from 'react';

import Accordion from 'components/Accordion/Accordion';
import AccordionHeader from 'components/Accordion/AccordionHeader';
import AccordionPanel from 'components/Accordion/AccordionPanel';
import FlexBox from 'components/Base/FlexBox';

export default function AccordionExample() {
    const [panel, setPanel] = useState('panel1');

    // Reference : https://stackoverflow.com/questions/32782922/what-do-multiple-arrow-functions-mean-in-javascript
    // *함수를 return하는 함수
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleChange =
        (selectedPanel: string) => (_event: React.MouseEvent<HTMLButtonElement>, isExpanded: boolean) => {
            // eslint-disable-next-line no-console
            console.log('i am controlled!', selectedPanel);
            // eslint-disable-next-line no-console
            console.log('i am currently expanded', isExpanded);
            setPanel(selectedPanel);
        };

    return (
        <FlexBox direction="column" customCSS={{ margin: '20px 0' }}>
            <Accordion isExpanded={panel === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionHeader index={1}>Controlled - Q1</AccordionHeader>
                <AccordionPanel index={1}>Apple</AccordionPanel>
            </Accordion>
            <Accordion>
                <AccordionHeader index={2}>Uncontrolled - Q2</AccordionHeader>
                <AccordionPanel index={2}>Banana</AccordionPanel>
            </Accordion>
        </FlexBox>
    );
}
