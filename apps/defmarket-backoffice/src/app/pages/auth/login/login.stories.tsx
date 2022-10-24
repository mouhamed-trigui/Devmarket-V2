import { Story, Meta } from '@storybook/react';
import { Login, LoginProps } from './login';

export default {
  component: Login,
  title: 'Design System/Pages/Auth/Login',
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
