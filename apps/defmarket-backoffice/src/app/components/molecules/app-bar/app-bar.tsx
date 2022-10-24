import * as React from 'react';
import {
    AppBar as MuiAppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Autocomplete,
    TextField,
    InputAdornment,
    AutocompleteRenderInputParams,
} from '@mui/material';
import { IonIcon } from '@ionic/react';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '../drawer/drawer';
import NotificationsIcon from '../../../../assets/svg/bouton-notifications-bleu-f.svg';
import MenuIcon from '@mui/icons-material/Menu';
import ProfilePng from '../../../../assets/images/png/notif-profil.png';
import ShopPng from '../../../../assets/images/png/notif-shop.png';
import OfferPng from '../../../../assets/images/png/notif-offre.png';
import { ReactComponent as CompanySvg } from '../../../../assets/svg/notif-company.svg';

import { List } from '@mui/material';
import { menuController } from '@ionic/core';
import NotificationItem from '../../atoms/notification-item/notification-item';
import { EntityType, IGlobalSearch } from '../../../services/model/common';
import { globalSearch } from '../../../services/methodes/common/search';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/user/index.slice';

const Icon: React.FC<{ type: EntityType }> = ({ type }) => {
    switch (type) {
        case 'USER':
            return (
                <img
                    src={ProfilePng}
                    alt="Profil"
                    width={30}
                    height={30}
                    style={{
                        marginRight: '10px',
                    }}
                />
            );
        case 'COMPANY':
            return (
                <CompanySvg
                    width={30}
                    height={30}
                    style={{
                        marginRight: '10px',
                    }}
                />
            );
        case 'STORE':
            return (
                <img
                    src={ShopPng}
                    alt="Profil"
                    width={30}
                    height={30}
                    style={{
                        marginRight: '10px',
                    }}
                />
            );
        case 'OFFER':
            return (
                <img
                    src={OfferPng}
                    alt="Profil"
                    width={30}
                    height={30}
                    style={{
                        marginRight: '10px',
                    }}
                />
            );
        default:
            return null;
    }
};

/* eslint-disable-next-line */
export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
    const history = useHistory();

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const [search, setSearch] = React.useState<string>('');
    const [searchOptions, setSearchOptions] = React.useState<IGlobalSearch[]>(
        []
    );

    React.useEffect(() => {
        globalSearch(search)
            .then((data) => setSearchOptions(data))
            .catch((err) => console.error(err));
    }, [search]);

    React.useEffect(() => {
        menuController?.isOpen().then(setIsMenuOpen);
    }, []);

    const handleMobileMenuOpen = async () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            await menuController.close();
        } else {
            setIsMenuOpen(true);
            await menuController.open();
        }
    };

    const handleGlobalSearch = (search: IGlobalSearch | null) => {
        dispatch(userActions.setGlobalSearch(search ?? undefined));
        switch (search?.entityType) {
            case 'USER':
                console.log({ path: history.location.pathname });
                if (!history.location.pathname.includes('/pro-account'))
                    history.push('/pro-account');
                break;
            case 'COMPANY':
                if (!history.location.pathname.includes('/companies'))
                    history.push('/companies');
                break;
            case 'STORE':
                if (!history.location.pathname.includes('/structures'))
                    history.push('/structures');
                break;
            case 'OFFER':
                if (!history.location.pathname.includes('/offres'))
                    history.push('/offres');
                break;
        }
    };
    return (
        <MuiAppBar
            position="static"
            style={{
                backgroundColor: '#ffffff',
                color: '#517689',
                zIndex: 100292,
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="#0F435D"
                    fontWeight="bold"
                    sx={{ display: { xs: 'flex', md: 'flex', lg: 'flex' } }}
                >
                    DEFMARKET PRO BACK OFFICE
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Autocomplete
                        style={{ width: '250px' }}
                        options={searchOptions}
                        onInputChange={(_e, value) => setSearch(value)}
                        getOptionLabel={(option) => option.text}
                        filterOptions={(x) => x}
                        renderOption={(props, option) => (
                            <Box component="li" {...props}>
                                <Icon type={option.entityType} />
                                {option.text}
                            </Box>
                        )}
                        onChange={(_e, value) => handleGlobalSearch(value)}
                        renderInput={(
                            params: AutocompleteRenderInputParams
                        ) => (
                            <TextField
                                variant="outlined"
                                {...params}
                                size="small"
                                fullWidth
                                placeholder="Rechercher…"
                                InputProps={{
                                    ...params.InputProps,
                                    onKeyDown: (event) => {
                                        if (event.key === 'Enter') {
                                            // Prevent's default 'Enter' behavior.
                                            event.stopPropagation();
                                        }
                                    },
                                    style: { borderRadius: 99 },
                                    fullWidth: true,
                                    type: 'search',
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon
                                                style={{ marginLeft: 5 }}
                                                color="primary"
                                            />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                    <IconButton
                        size="medium"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={() => setOpen(!open)}
                    >
                        <Badge badgeContent={2} color="error">
                            <IonIcon
                                slot="start"
                                ios={NotificationsIcon}
                                md={NotificationsIcon}
                            />
                        </Badge>
                    </IconButton>
                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={() => setOpen(!open)}
                    >
                        <Box mt={2} ml={2}>
                            {' '}
                            <Typography variant="h6" fontWeight={'bold'}>
                                Notifications
                            </Typography>
                        </Box>
                        {/* TODO : Notfication List */}
                        <List>
                            {[
                                'lorem lorem',
                                'lorem lorem',
                                'lorem lorem',
                                'lorem lorem',
                            ].map((text, index) => (
                                <NotificationItem
                                    key={'NotificationItem-' + index}
                                    id={index + 1}
                                    iconType="STORE"
                                    text={text}
                                    createdDate={new Date().toString()}
                                />
                            ))}
                        </List>
                    </Drawer>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        aria-controls={'search-account-menu-mobile'}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </MuiAppBar>
    );
}

export default AppBar;
