import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';

import { StarIcon } from '@heroicons/react/24/outline';

import IconButton from 'components/Button/IconButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Button/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {
        children: {
            type: { name: 'string', required: true },
            control: false,
            description: '컴포넌트',
            table: { category: 'required', type: { summary: 'React.ReactNode' } }
        },
        isDisabled: {
            control: { type: 'boolean' },
            description: '활성화여부',
            table: {
                category: 'optional',
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        type: {
            control: { type: 'inline-radio' },
            description: '버튼 타입',
            options: ['button', 'reset', 'submit'],
            table: {
                category: 'optional',
                defaultValue: { summary: 'button' },
                type: { summary: 'button | reset | submit' }
            }
        },
        variant: {
            control: { type: 'inline-radio' },
            description: '[CSS] 버튼 스타일',
            options: ['outlined', 'contained', 'text'],
            table: {
                category: 'optional',
                defaultValue: { summary: 'outlined' },
                type: { summary: 'outlined | contained | text' }
            }
        },
        size: {
            control: { type: 'inline-radio' },
            description: '[CSS] 버튼 크기',
            options: ['large', 'medium', 'small'],
            table: {
                category: 'optional',
                defaultValue: { summary: 'large' },
                type: { summary: 'large | medium | small' }
            }
        },
        onClick: {
            control: false,
            description: 'Click Event Handler',
            table: {
                category: 'optional',
                defaultValue: { summary: '() => {}' },
                type: { summary: 'function' }
            }
        },
        customCSS: {
            control: { type: 'object' },
            description: 'Custom CSS',
            table: {
                category: 'style',
                defaultValue: { summary: '{}' },
                type: { summary: 'CSSInterpolation' }
            }
        }
    }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
    render: (args) => <IconButton {...args}>{args.children}</IconButton>,
    args: {
        'aria-label': 'Starred',
        children: <StarIcon />, // arg 순서를 위해서
        type: 'button',
        isDisabled: false,
        size: 'large',
        variant: 'outlined',
        customCSS: {}
    }
};

Default.play = async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toHaveStyle('height: 45px');
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalled();
};
