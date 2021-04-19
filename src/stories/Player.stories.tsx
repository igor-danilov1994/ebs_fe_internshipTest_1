import React from 'react';
import { Story, Meta } from '@storybook/react';

import Player, { PlayerType } from './Player';

export default {
    title: 'Example/Player',
    component: Player,
} as Meta;

const Template: Story<PlayerType> = (args) => <Player {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {

};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};