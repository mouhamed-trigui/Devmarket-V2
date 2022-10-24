import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from './button';
import { action } from '@storybook/addon-actions';

export default {
  component: Button,
  title: 'Design System/Atoms/Button',
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    color: {
      options: ["primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark"],
      control: { type: 'radio' }
    },
    expand : {
      options: ["full", "block",undefined],
      control: { type: 'radio' }
    },
    shape : {
      options: ["round",undefined],
      control: { type: 'radio' }
    },
    slot : {
      options: ["start","end","icon-only"],
      control: { type: 'radio' }
    },
    size: {
      options: ["default" , "large" , "small" , undefined],
      control: { type: 'radio' }
    },
  }
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}  />;

export const Primary = Template.bind({});
Primary.args = {
  size: "default",
  color: 'primary',
  fill:"solid",
  title:"Default",
  disabled:false,
  showIcon:false
};
Primary.parameters = {
  backgrounds: { default: 'light' }
};


