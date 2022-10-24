import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import { fonts, fontSizes } from '../../../../theme/fonts';
import {
    Loisirs,
    MaisonEcologique,
    Mode,
    NourritureEtBoisson,
    Vacances,
} from '../../../../theme/svgs';
import { ThemeContext } from '../../../../context/ThemeContext';
import Text from '../../../atomes/text/Text';
import { useDispatch } from 'react-redux';
import { storeActions } from './../../../../stores/slices/store/store';
export interface CategoryFilterProps {
    getSelectedCategory?: (ctageoryId: number) => void;
    categories: any;
    disabled?: boolean;
}

export enum StoreCategory {
    Alimentaire_Ménager = 'Alimentaire & Ménager',
    Loisirs_Culture = 'Loisirs & Culture',
    Séjours_Vacances = 'Séjours & Vacances',
    Mode_Accessoires = 'Mode & Accessoires',
    Maison_Jardin = 'Maison & Jardin',
    Beauté_Bien_être = 'Beauté & Bien-être',
    Services_Professionnels = 'Services & Professionnels',
}
export default function CategoryFilter(props: CategoryFilterProps) {
    const dispatch = useDispatch();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [activeTab, setActiveTab] = useState(-1);

    const getCategoryIcon = (categoryName: StoreCategory) => {
        switch (categoryName) {
            case StoreCategory.Alimentaire_Ménager:
                return <NourritureEtBoisson fill={theme.colors.info[50]} />;
            case StoreCategory.Loisirs_Culture:
                return <Loisirs fill={theme.colors.info[50]} />;
            case StoreCategory.Séjours_Vacances:
                return <Vacances fill={theme.colors.info[50]} />;
            case StoreCategory.Mode_Accessoires:
                return <Mode fill={theme.colors.info[50]} />;
            case StoreCategory.Maison_Jardin:
                return <MaisonEcologique fill={theme.colors.info[50]} />;
            case StoreCategory.Beauté_Bien_être:
                return <MaisonEcologique fill={theme.colors.info[50]} />;
            case StoreCategory.Services_Professionnels:
                return <MaisonEcologique fill={theme.colors.info[50]} />;
            default:
                return <MaisonEcologique fill={theme.colors.info[50]} />;
        }
    };
    const categoryItem = (category, index) => {
        return (
            <TouchableOpacity
                disabled={props?.disabled ?? false}
                key={index}
                style={styles.tabContainer}
                //onPress={() => props.getSelectedCategory(category?.id)}
                onPress={() => {
                    setActiveTab(index);
                    dispatch(
                        storeActions.setSelectedStoreCategory(category?.id)
                    );
                }}
            >
                <View
                    style={
                        activeTab === index
                            ? styles.activeTab
                            : styles.inactiveTab
                    }
                >
                    <View
                        style={
                            activeTab === index
                                ? styles.activeTab
                                : styles.inactiveTab
                        }
                    >
                        {category?.icon ??
                            category?.icon ??
                            getCategoryIcon(category?.name)}
                        <Text
                            numberOfLines={2}
                            textAlign="center"
                            fontFamily={fonts.body}
                            fontSize={fontSizes['dm-sm']}
                            color={theme.colors.info[50]}
                            vPadding={5}
                        >
                            {category?.title ??
                                category?.title ??
                                category?.name}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
                backgroundColor: theme.colors.info[200],
                height: 120,
                paddingHorizontal: 5,
            }}
        >
            {props?.categories.map((category, index) =>
                categoryItem(category, index)
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        paddingHorizontal: 5,
    },
    tabContainer: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactiveTab: {
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTab: {
        width: 75,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCD7DD',
        borderRadius: 8,
        paddingTop: 8,
    },
});
