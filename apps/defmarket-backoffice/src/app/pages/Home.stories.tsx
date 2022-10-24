import { Story, Meta } from '@storybook/react';
import  Home  from './Home';

export default {
  component: Home,
  title: 'Design System/Pages/Home',
} as Meta;

const Template: Story = (args) => <Home {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
