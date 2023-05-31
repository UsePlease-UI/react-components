import { useState } from 'react';

import Checkbox from 'components/atoms/Checkbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Checkbox> = {
    title: 'ATOMS/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        label: {
            type: { name: 'string', required: true },
            description: '라디오 텍스트 값',
            control: false,
            table: {
                type: { summary: 'string' },
                category: 'required'
            }
        },
        value: {
            type: { name: 'string', required: true },
            description: '라디오 버튼 값',
            control: false,
            table: {
                type: { summary: 'string | number' },
                category: 'required'
            }
        },
        checked: {
            type: { name: 'string', required: true },
            description: '값 선택여부',
            control: false,
            table: {
                type: { summary: 'boolean' },
                category: 'required'
            }
        },
        onChange: {
            type: { name: 'function', required: true },
            description: 'Change Handler',
            control: false,
            table: {
                type: { summary: 'function' },
                category: 'optional'
            }
        },
        icon: {
            type: { name: 'string', required: false },
            description: '기본 아이콘',
            control: 'text',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'optional'
            }
        },
        checkedIcon: {
            type: { name: 'string', required: false },
            description: '선택 아이콘',
            control: 'text',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'optional'
            }
        },
        customCSS: {
            control: { type: 'object' },
            description: 'Custom CSS',
            table: {
                category: 'style',
                defaultValue: { summary: '{}' },
                type: {
                    summary: 'CSSInterpolation'
                }
            }
        }
    }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Default: Story = {
    render: (args) => {
        const [candy, setCandy] = useState(true);
        return (
            <Checkbox {...args} label="사탕" value="candy" checked={candy} onChange={() => setCandy((prev) => !prev)} />
        );
    },
    args: {
        label: '사탕',
        value: 'candy',
        checked: true,
        customCSS: {}
    }
};