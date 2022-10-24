import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { GET_ANNOUNCEMENTS } from '../../../services/constants';
import axiosInstance from '../../../services/constants/api';
import { AnnouncementCard } from '../../atomes/card';

export default function Announcement() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [announcements, setAnnouncements] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            axiosInstance
                .get(GET_ANNOUNCEMENTS, { params: { category: '' } })
                .then(({ data }) => {
                    setAnnouncements(data.data);
                });
        }
    }, [isFocused]);

    return (
        <View
            style={{
                backgroundColor: theme.colors.info['700'],
                height: 140,
            }}
        >
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: '6%',
                    paddingTop: 10,
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                {announcements?.map((announcement, index) => (
                    <AnnouncementCard
                        key={index}
                        title={announcement.title}
                        description={announcement.description}
                        image={announcement.image}
                        link={announcement.link}
                        onPress={(data) => {}}
                    />
                ))}
            </ScrollView>
        </View>
    );
}
