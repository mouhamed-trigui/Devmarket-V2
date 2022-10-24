import { ReactComponent as ChatSvg } from '../../../../assets/svg/chat.svg';
import { Divider, Typography, Box, Stack } from '@mui/material';
import { colors } from '../../../theme/colors';
import Dialog from '../../molecules/dialog/Dialog';

const Body = () => {
    return (
        <Box>
            <Stack direction="row">
                <ChatSvg
                    fill={colors.secondary}
                    width={70}
                    style={{ marginRight: 15 }}
                />
                <Stack>
                    <Typography
                        fontSize={13}
                        fontWeight={650}
                        color={colors.primary}
                        style={{ marginBottom: 20 }}
                    >
                        Dites nous en plus sur votre activité et votre
                        structure, un administrateur vous contactera rapidement
                        pour vous accompagner.
                    </Typography>
                    <Typography color={colors.primary} fontSize="small">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Typography>
                </Stack>
            </Stack>
            <Divider style={{ marginBottom: 20, marginTop: 20 }} />
            <Stack direction="row" style={{ alignContent: 'space-between' }}>
                <ChatSvg
                    fill={colors.secondary}
                    width={70}
                    style={{ marginRight: 15 }}
                />
                <Stack marginBottom={3}>
                    <Typography
                        fontSize={13}
                        fontWeight={650}
                        color={colors.primary}
                        style={{ marginBottom: 20 }}
                    >
                        Avant de connaître Defmarket PRO, Pratiquiez-vous déja
                        des offres auprès de notre communauté?
                    </Typography>
                    <Typography color={colors.primary} fontSize="small">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </Typography>
                </Stack>
            </Stack>
        </Box>
    );
};
const UserMessage = () => {
    return (
        <Dialog
            isOpen
            title="Messages de l'utilisateur"
            body={<Body />}
            maxWidth="md"
        />
    );
};

export default UserMessage;
