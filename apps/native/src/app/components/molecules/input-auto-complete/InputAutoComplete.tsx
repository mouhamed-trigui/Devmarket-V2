import React, { FC } from 'react';
import FormControl from '../form-control/form-control';
import { Box, Icon, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { useIntl } from 'react-intl';
import { primary, system } from '../../../theme/colors';
import { Text } from '../../../components/atomes';
import { IStructure } from '../../../services/model/company';
import { Dimensions, TouchableOpacity } from 'react-native';

const InputAutoComplete: FC<{
    data: IStructure[];
    search: string;
    showSearchData: boolean;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setShowSearchData: React.Dispatch<React.SetStateAction<boolean>>;
    setData: React.Dispatch<React.SetStateAction<IStructure[]>>;
    setSelectedCompany: React.Dispatch<React.SetStateAction<IStructure | null>>;
}> = ({
    data,
    search,
    showSearchData,
    setData,
    setSearch,
    setSelectedCompany,
    setShowSearchData,
}) => {
    const { formatMessage } = useIntl();

    return (
        <>
            <FormControl
                InputLeftElement={
                    <Icon
                        as={
                            <Ionicons
                                name={'md-search'}
                                size={32}
                                color="white"
                                style={{ paddingHorizontal: 5 }}
                            />
                        }
                        size={5}
                        color="muted.400"
                    />
                }
                label=""
                placeholder={formatMessage({
                    id: 'IMF03s',
                    description: 'Rechercher',
                    defaultMessage: 'Rechercher',
                })}
                value={search}
                type="input"
                variant="underlined"
                error={null}
                errorMessage={null}
                helperText={null}
                onChange={(value: React.SetStateAction<string>) =>
                    setSearch(value)
                }
                InputRightElement={
                    data.length > 0 && (
                        <Icon
                            as={
                                <Ionicons
                                    name={
                                        showSearchData
                                            ? 'chevron-up'
                                            : 'chevron-down'
                                    }
                                />
                            }
                            size="sm"
                            color={primary[50]}
                            onPress={() => setShowSearchData(!showSearchData)}
                        />
                    )
                }
            />
            {showSearchData && data.length > 0 && (
                <Box
                    zIndex={999}
                    position="absolute"
                    top={100}
                    width={Dimensions.get('window').width - 50}
                    alignSelf="center"
                    height={250}
                >
                    <ScrollView nestedScrollEnabled>
                        {data.map((item, index) => (
                            <TouchableOpacity
                                key={`${item.nom_complet}${index}`}
                                onPress={() => {
                                    setSelectedCompany(item);
                                    setData([]);
                                }}
                                activeOpacity={0.9}
                                style={{
                                    borderRadius: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: system[100],
                                    paddingVertical: 10,
                                    paddingLeft: 10,
                                    borderColor: system[300],
                                    borderBottomWidth:
                                        data.length - 1 === index ? 0 : 1,
                                }}
                            >
                                <Text color={system[50]}>
                                    {item.nom_complet}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Box>
            )}
        </>
    );
};

export default InputAutoComplete;
