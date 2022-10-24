import { GET_ANNOUNCEMENTS } from '../../../constants';
import { annoncesProps } from '../../../model/annonces';
import { mock } from '../../mock';


const loadAnnouncements = () => {
    mock.onGet(GET_ANNOUNCEMENTS, { params: { category: '' } }).reply(
        () => {
            const announcements: { data: any[] } = {
                data: [
                    {
                        title: 'Référencement',
                        description: 'Proposez vos commerces de proximité !',
                        image:
                            '../../../../../assets/images/png/Employee_and_Employer_Relationship.png',
                        link: '',
                    },
                    {
                        title: 'Référencement',
                        description: 'Proposez vos commerces de proximité !',
                        image:
                            '../../../../../assets/images/png/Employee_and_Employer_Relationship.png',
                        link: '',
                    },
                ],
            };
            return [200, announcements];
        }
    );

    mock.onGet(GET_ANNOUNCEMENTS, { params: { category: 'éphémères' } }).reply(
        () => {
            const announcements: { data: annoncesProps[] } = {
                data: [
                    {
                        key: 'pub1',
                        title: 'Annonce 1',
                        text: 'Exclusifs',
                        type: 'Exclusifs',
                        category: 'éphémères',
                        data: {},
                    },
                    {
                        key: 'pub2',
                        title: 'Annonce 2',
                        text: 'Présentation',
                        type: 'Présentation',
                        category: 'éphémères',
                        data: {},
                    },
                    {
                        key: 'pub3',
                        title: 'Annonce 3',
                        text: 'Exclusifs',
                        type: 'Exclusifs',
                        category: 'éphémères',
                        data: {},
                    },
                ],
            };
            return [200, announcements];
        }
    );

    mock.onGet(GET_ANNOUNCEMENTS, {
        params: { category: 'perpétuelles' },
    }).reply(() => {
        const announcements: { data: annoncesProps[] } = {
            data: [
                {
                    key: 'an1',
                    title: 'Annonce 1',
                    text: 'Lorem ipsum lorem ipsum',
                    category: 'perpétuelles',
                    data: {},
                },
                {
                    key: 'an2',
                    title: 'Annonce 2',
                    text: 'Lorem ipsum lorem ipsum',
                    category: 'perpétuelles',
                    data: {},
                },
                {
                    key: 'an3',
                    title: 'Annonce 3',
                    text: 'Lorem ipsum lorem ipsum',
                    category: 'perpétuelles',
                    data: {},
                },
                {
                    key: 'an4',
                    title: 'Annonce 4',
                    text: 'Lorem ipsum lorem ipsum',
                    category: 'perpétuelles',
                    data: {},
                },
            ],
        };
        return [200, announcements];
    });
};

export { loadAnnouncements };
