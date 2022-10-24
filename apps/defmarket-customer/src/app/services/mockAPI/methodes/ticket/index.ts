import { GET_TICKET } from '../../../constants';
import { mock } from '../../mock';

const loadTicket = () => {
    mock.onGet(GET_TICKET).reply(() => {
        const ticket: { data: any[] } = {
            data: [
                {
                    title: 'Le Terroir de Loriot Le Terroir de Loriot',
                    subTitle:
                        'E-billet 1 jour Parc Astérix - Tarif unique Adulte/enfant',
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    dueDate:
                        "Valable 1 jour du 11 juin au 11 septembre 2022 inclus selon calendrier d'ouverture ",
                    prix: '19',
                    traifTitle:null,
                    discount:"50",
                    quantity:0,
                    type: 'E-billet',
                    category: 'Parcs',
                    image:
                        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324',
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                    addressData: {
                        address: '3 lot La Croix du Palais 13390 Aubagne',
                        geolocation: {
                            longitude: 36.7253,
                            latitude: 9.192,
                        },
                    },
                },
                {
                    title: 'Le Terroir de Loriot ',
                    subTitle:
                        'E-billet 1 jour Parc Astérix - Tarif unique Adulte/enfant',
                    description:
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    dueDate:
                        "Valable 1 jour du 11 juin au 11 septembre 2022 inclus selon calendrier d'ouverture ",
                    prix: '19',
                    traifTitle:"Tarif de groupe*",
                    discount:"20",
                    type: null,
                    category: 'Vacances',
                    image:
                        'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-logo-design-template-78655edda18bc1196ab28760f1535baa_screen.jpg?ts=1617645324',
                    coverImage:
                        'https://observatoire-des-aliments.fr/wp-content/uploads/2021/09/fruits-et-legumes-diabete-1.jpg',
                    addressData: {
                        address: '3 lot La Croix du Palais 13390 Aubagne',
                        geolocation: {
                            longitude: 36.7253,
                            latitude: 9.192,
                        },
                    },
                },
 
            ],
        };
        return [200, ticket];
    });
};

export { loadTicket };
