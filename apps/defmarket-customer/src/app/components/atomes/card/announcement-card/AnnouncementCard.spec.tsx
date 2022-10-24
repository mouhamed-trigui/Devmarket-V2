import React from 'react';
import { Text } from 'react-native';
import { act } from 'react-test-renderer';
import { RenderReduxComponent } from '../../../../utils/test/RenderRedux';
import AnnouncementCard from './AnnouncementCard';

const announcementData = {
    title: 'Test title',
    description: 'Test description',
    image: '',
    link: '',
};
it('Test announcement component', () => {
    let announcementElement = RenderReduxComponent(
        <AnnouncementCard
            title={announcementData.title}
            description={announcementData.description}
            image={announcementData.image}
            link={announcementData.link}
        />
    );
    const announcementInstantElement = announcementElement.root;
    const textElements = announcementInstantElement.findAllByType(Text);
    expect(textElements[0].props.children).toBe(announcementData.title);
    expect(textElements[1].props.children).toBe(announcementData.description);
});
