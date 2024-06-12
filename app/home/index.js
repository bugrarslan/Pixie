import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import {debounce, set} from 'lodash'
import FiltersModal from '../../components/filtersModal';

var page = 1;

export default function HomeScreen() {
    const {top} = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 10 : 30;
    const searchInputRef = useRef(null);
    const modalRef = useRef(null);

    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState(null);
    const [images, setImages] = useState([]);
    const [filters, setFilters] = useState(null);

    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async (params={page:1}, append=false) => {
        console.log('params: ', params, append);
        let res = await apiCall(params);
        if(res.success && res?.data?.hits){
            if (append) {
                setImages([...images, ...res.data.hits]);
            } else {
                setImages([...res.data.hits]);
            }
        }
    }

    const handleChangeCategory = (category) => {
        setActiveCategory(category);
        clearSearch();
        setImages([]);
        page = 1;
        let params = {page};
        if (category) params.category = category;
        fetchImages(params, false);
    };

    const handleSearch = (text) => {
        setSearch(text);
        if (text.length > 2) {
            //search images for this text
            page = 1;
            setImages([]);
            setActiveCategory(null);
            fetchImages({page, q:text}, false);
        }

        if (text=="") {
            //reset images
            page = 1;
            searchInputRef?.current?.clear();
            setImages([]);
            setActiveCategory(null);
            fetchImages({page}, false);
        }
    }

    const clearSearch = () => {
        setSearch("");
        searchInputRef?.current?.clear();
    }

    const openFiltersModal = () => {
        modalRef.current?.present();
    }

    const closeFiltersModal = () => {
        modalRef.current?.close();
    }

    const applyFilters = () => {
        console.log('apply filters');
        closeFiltersModal();
    }

    const resetFilters = () => {
        console.log('reset filters');
        closeFiltersModal();
    }

    
 
    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
    <View style={[styles.container, {paddingTop}]}>
        
        {/* header */}
        <View style={styles.header}>
            <Pressable>
                <Text style={styles.title}>
                    App Name
                </Text>
            </Pressable>
            <Pressable
                onPress={openFiltersModal}
            >
                <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)}/>
            </Pressable>
        </View>

        {/* content */}
        <ScrollView
            contentContainerStyle={{gap:15}}
        >
        
            {/* searchBar */}
            <View style={styles.searchBar}>
                <View style={styles.searchIcon}>
                    <Feather name="search" size={24} color={theme.colors.neutral(0.4)}/>
                </View>
                <TextInput
                    // value={search}
                    onChangeText={handleTextDebounce}
                    ref={searchInputRef}
                    placeholder="Search for photos..."
                    placeholderTextColor={theme.colors.neutral(0.2)}
                    style={styles.searchInput}
                />
                {
                    search && (
                        <Pressable
                            onPress={() => handleTextDebounce("")}
                            style={styles.closeIcon}
                        >
                            <Ionicons name="close" size={24} color={theme.colors.neutral(0.4)}/>
                        </Pressable>
                    )
                }
                
            </View>

            {/* categories */}
            <View style={styles.categories}>
                <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
            </View>

            {/* images with masonry grid */}
            <View>
                {
                    images.length > 0 && <ImageGrid images={images} />
                }
            </View>

        </ScrollView>

        {/* filters modal */}
        <FiltersModal 
            modalRef={modalRef}
            filters={filters}
            setFilters={setFilters}
            onClose={closeFiltersModal}
            onApply={applyFilters}
            onReset={resetFilters}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 15,
    },
    header:{
        marginHorizontal:wp(4),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title: {
        fontSize: hp(4),
        fontWeight: theme.fontWeights.semibold,
        color: theme.colors.neutral(0.9),
    },
    searchBar:{
        marginHorizontal:wp(4),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderWidth:1,
        borderColor:theme.colors.grayBg,
        padding:6,
        paddingLeft:10,
        backgroundColor:theme.colors.white,
        borderRadius:theme.radius.lg,
    },
    searchIcon:{
        padding:8,
    },
    searchInput:{
        flex:1,
        borderRadius:theme.radius.md,
        paddingVertical:10,
        fontSize:hp(1.8),
    },
    closeIcon:{
        backgroundColor:theme.colors.neutral(0.1),
        padding:8,
        borderRadius:theme.radius.sm,
    },
})