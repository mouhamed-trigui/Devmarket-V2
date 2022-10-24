import {
    IconButton,
    InputAdornment,
    InputBase,
    List,
    ListItemButton,
    Paper,
    Stack,
} from '@mui/material';
import React, { FC } from 'react';
import { IStructure } from '../../../services/model/company';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { colors } from '../../../theme/colors';
import { Box } from '@mui/system';

const InputAutoComplete: FC<{
    data: IStructure[];
    search: string;
    showSearchData: boolean;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setShowSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<IStructure[]>>;
    setSelectedCompany: React.Dispatch<
        React.SetStateAction<IStructure | undefined>
    >;
}> = ({
    data,
    search,
    showSearchData,
    setData,
    setSearch,
    setSelectedCompany,
    setShowSearchData,
}) => {
    return (
        <Stack style={{ width: '50%' }}>
            <InputBase
                placeholder="5435"
                value={search}
                style={{ width: '100%' }}
                sx={{
                    border: 2,
                    borderRadius: 5,
                    borderColor: colors.secondary,
                }}
                startAdornment={
                    <SearchIcon style={{ marginLeft: 10 }} color="primary" />
                }
                endAdornment={
                    data.length > 0 && (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() =>
                                    setShowSearchData(!showSearchData)
                                }
                            >
                                {showSearchData ? (
                                    <KeyboardArrowUpIcon color="primary" />
                                ) : (
                                    <KeyboardArrowDownIcon color="primary" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    )
                }
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            {showSearchData && data.length > 0 && (
                <Box
                    style={{
                        width: '45%',
                        zIndex: 999,
                        position: 'absolute',
                        top: 250,
                        alignSelf: 'center',
                        height: '250',
                    }}
                >
                    <Paper
                        style={{
                            maxHeight: 200,
                            overflow: 'auto',
                        }}
                    >
                        <List>
                            {data.map((option) => (
                                <ListItemButton
                                    onClick={(event) => {
                                        setSelectedCompany(option);
                                        setData([]);
                                        setShowSearchData(false);
                                    }}
                                >
                                    {option.nom_complet}
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Box>
            )}
        </Stack>
    );
};

export default InputAutoComplete;
