import React, { useState, useEffect, useRef } from 'react';
import {
    Autocomplete,
    IconButton,
    InputAdornment,
    TextField,
} from '@mui/material';
import {
    ICompany,
    IProAccountProps,
    IUser,
} from '../../../services/model/accounts';
import { IStore } from '../../../services/model/store';
import { IOffer } from '../../../services/model/offer';

import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import './auto-search-input.module.scss';
import { autoSearchApi } from '../../../services/methodes/accounts';
import { colors } from '../../../theme/colors';

/* eslint-disable-next-line */
export interface AutoSearchInputProps {
    searchType: 'trader' | 'company' | 'store' | 'offer';
    filters?: {
        key: string;
        value: boolean;
    }[];
    page?: number;
    size?: number;
    setContent:
        | React.Dispatch<React.SetStateAction<ICompany[]>>
        | React.Dispatch<React.SetStateAction<IOffer[]>>
        | React.Dispatch<React.SetStateAction<IStore[]>>
        | React.Dispatch<React.SetStateAction<IProAccountProps[]>>;
    setBackupContent?: any;
}

export function AutoSearchInput(props: AutoSearchInputProps) {
    const [search, setSearch] = useState<string>('');
    const [options, setOptions] = useState<any>([]);
    const textInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (search.length === 0) {
            setOptions([]);
        }
    }, [search]);

    useEffect(() => {
        let searchTimer: any;
        const autoSearch = async (
            filters:
                | {
                      key: string;
                      value: boolean;
                  }[]
                | null,
            search: string | null,
            searchType: string,
            page?: number,
            size?: number
        ) => {
            autoSearchApi(
                filters,
                search !== null
                    ? search.replace('%20', ' ') //search.replace(/%20/g, ' ')
                    : search,
                searchType,
                page,
                size
            ).then((res: any) => {
                if (res.content) {
                    setOptions(res.content);
                }
            });
        };

        if (props?.searchType) {
            if (search?.length === 0) {
                //backup
                searchTimer = setTimeout(() => {
                    props?.setBackupContent(0, props.size);
                    return;
                }, 1000);
            } else {
                searchTimer = setTimeout(
                    () =>
                        autoSearch(
                            props?.filters ?? null,
                            search,
                            props.searchType,
                            0, // props.page,
                            props.size
                        ),
                    1000
                );
            }
        }

        return () => {
            clearTimeout(searchTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.filters, props.page, props.searchType, props.size, search]);

    return (
        <Autocomplete
            freeSolo
            id="AutoSearchInput"
            size="small"
            disableClearable
            options={options}
            style={{ paddingTop: 0 }}
            getOptionLabel={(option: any) =>
                props?.searchType === 'company' || props?.searchType === 'store'
                    ? option?.name
                    : props?.searchType === 'offer'
                    ? option?.title
                    : option?.firstName +
                      ' ' +
                      option?.lastName +
                      ' : ' +
                      option?.email
            }
            onChange={(_e, value) => {
                if (typeof value !== 'string') props.setContent([value]);
            }}
            filterOptions={(x) => x}
            inputValue={search}
            onInputChange={(_event, newInputValue) => {
                setSearch(newInputValue);
            }}
            renderInput={(params) => (
                <TextField
                    inputRef={textInput}
                    variant="standard"
                    required
                    {...params}
                    placeholder="Recherche ..."
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                        type: 'search',
                        onKeyDown: (event) => {
                            if (event.key === 'Enter') {
                                // Prevent's default 'Enter' behavior.
                                event.stopPropagation();
                            }
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon
                                    style={{ marginLeft: 5 }}
                                    color="primary"
                                />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setSearch('')}>
                                    <CloseIcon color="primary" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                    sx={{
                        width: 250,
                        backgroundColor: 'white',
                        border: 2,
                        borderRadius: 25,
                        borderColor: colors.secondary,
                        overflow: 'hidden',
                    }}
                />
            )}
        />
    );
}

export default AutoSearchInput;
