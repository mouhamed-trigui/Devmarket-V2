import { Stack, Box, Typography } from '@mui/material';
import './notification-item.module.scss';

// Icones PNG
import notifOfferIcon from '../../../../assets/images/png/notif-offre.png';
import notifShopIcon from '../../../../assets/images/png/notif-shop.png';
import notifProfilIcon from '../../../../assets/images/png/notif-profil.png';
import notifCoucouIcon from '../../../../assets/images/png/notif-coucou.png';
import companyIcon from '../../../../assets/images/png/company-icon.png';
import moment from 'moment';

/* eslint-disable-next-line */
export interface NotificationItemProps {
    id: number;
    text: string;
    iconType: string;
    createdDate: string;
}

export function NotificationItem(props: NotificationItemProps) {
    const getIconFromName = (name: string) => {
        switch (name) {
            case 'OFFER':
                return notifOfferIcon;

            case 'STORE':
                return notifShopIcon;

            case 'PROFILE':
                return notifProfilIcon;

            case 'COMPANY':
                return companyIcon;

            case 'WELCOME':
                return notifCoucouIcon;
            default:
                return notifOfferIcon;
        }
    };

    return (
        <div key={props.id} style={{ backgroundColor: 'white', minWidth: 350 }}>
            <Box
                paddingLeft={4}
                paddingRight={2}
                paddingY={2}
                borderTop={1}
                borderColor="#F6F6F7"
            >
                <Stack
                    direction="row"
                    spacing={3}
                    style={{
                        alignItems: 'center',
                        flexGrow: 1,
                    }}
                >
                    <img
                        src={getIconFromName(props.iconType)}
                        style={{ width: 50, height: 50 }}
                        alt=""
                    />

                    <Box flexGrow={1} flexShrink={1}>
                        <Typography
                            align="left"
                            // fontWeight={'bold'}
                            fontSize={14}
                            style={{ flexGrow: 1 }}

                            // color={colors.primary}
                        >
                            {props.text}
                        </Typography>
                        <Typography
                            align="left"
                            style={{ color: '#00AAC7' }}
                            fontSize={14}
                        >
                            {moment(props.createdDate).format(
                                'DD/MM/YYYY à HH:mm'
                            )}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </div>
    );
}

export default NotificationItem;
