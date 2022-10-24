import Card from './card';

export default {
  component: Card,
  title: 'Design System/Atoms/Card',
};

const Template = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
