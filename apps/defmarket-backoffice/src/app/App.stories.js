import App from './App.js';

export default {
  component: App,
  title: 'Design System/Main/App',
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
