import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, Dimensions } from 'react-native';
import styles from './styles';
import { decrementBalance, addSkin, addShirt, getShirts, getSkins } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBalance } from '../../src/features/auth/authSlice';
import mainStyles from '../../styles/styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from '../../utils/carouselInterpolations';

function AvatarShop({ type, items, inventory }) {
    const [purchasedSkins, setPurchasedSkins] = useState(['lighter', 'darker']);
    const [purchasedShirts, setPurchasedShirts] = useState(['crimson', 'skyblue']);

    useEffect(() => {
        getShirts().then(shirts => {
            setPurchasedShirts([...shirts, ...purchasedSkins]);
        });
        getSkins().then(skins => {
            setPurchasedSkins([...skins, ...purchasedShirts]);
        });
    }, [setPurchasedSkins, setPurchasedShirts]);
    
    let shopItems = [];
    Object.entries(items).map(([itemKey, item], index) => {
        shopItems.push({key: itemKey, item: item});
        return;
    });
    const dispatch = useDispatch();
    const balanceSelector = useSelector(state => state.auth);
    let currentBalance = balanceSelector.currentUser ? balanceSelector.currentUser.balance : 0;

    let shopCarousel = {};
    const [ carouselRef, setCarouselRef ] = useState({});

    const [ currentItem, setCurrentItem ] = useState(0);
    const currentItemPurchased = (itemKey) => {
        if(type === 'skin'){
            return purchasedSkins.includes(itemKey);
        }else if (type === 'shirt') {
            return purchasedShirts.includes(itemKey);
        }
    };

    const _renderShopItem = (itemToRender) => {
        const { key, item } = itemToRender.item;
        const itemKey = key;
        const activeItem = itemToRender.index == currentItem;
        const itemIndex = itemToRender.index;
        return (
            <ShopItem key={item.index} 
                purchased={(itemKey) => {
                    return currentItemPurchased(itemKey);
                }}
                propFunction={() => {
                    if(!activeItem){
                        shopCarousel.snapToItem(itemIndex);
                        return;
                    }
                }} 
                image={item.image}
                price={item.price}
                itemKey={itemKey}
                name={item.name}/>
        );
    };

    return (
        <View style={[styles.avatarShop, mainStyles.platformShadow]}>
            <View style={styles.itemGrid}>
                <Carousel
                    layout={'default'}
                    ref={ c => {shopCarousel = c;setCarouselRef(c);}}
                    data={shopItems}
                    renderItem={_renderShopItem}
                    sliderWidth={Dimensions.get('window').width*0.85}
                    itemWidth={Dimensions.get('window').width * 0.4}
                    inactiveSlideShift={0}
                    onSnapToItem={(index) => {setCurrentItem(index);}}
                    scrollInterpolator={scrollInterpolator}
                    slideInterpolatedStyle={animatedStyles}
                    useScrollView={true}
                />
            </View>
                <Pressable
                    style={[{
                        marginTop: 20,
                        backgroundColor: 'skyblue',
                        padding: 10,
                        paddingHorizontal: 20,
                        alignSelf: 'center',
                        borderRadius: 15,
                        borderColor: 'blue',
                        borderWidth: 2,
                        alignItems: 'center',
                    },!currentItemPurchased(shopItems[currentItem].key) ? {backgroundColor: '#a8e2ff'} : null]}
                    onPress={ async () => {
                        if (currentItemPurchased(shopItems[currentItem].key)) return;

                        const item = shopItems[currentItem].item;
                        const itemKey = shopItems[currentItem].key;
                        if (currentBalance >= item.price) {
                            await decrementBalance(currentBalance, item.price);
                            dispatch(removeFromBalance(item.price));
                            if (type == 'skin') {
                                setPurchasedSkins([...purchasedSkins, itemKey]);
                                addSkin(itemKey);
                            } else if (type == 'shirt') {
                                setPurchasedShirts([...purchasedShirts, itemKey]);
                                addShirt(itemKey);
                            }
                        } else {
                            alert('Insufficient funds! You need ₩' + (item.price - currentBalance) + ' more.');
                        }
                    }}
                >
                    { !currentItemPurchased(shopItems[currentItem].key) && 
                        <Text>Purchase for ₩{shopItems[currentItem].item.price}</Text>
                    }
                    { currentItemPurchased(shopItems[currentItem].key) &&
                        <Text style={{color:'grey'}}>Already Purchased</Text>
                    }
                </Pressable>
                <Pagination
                    dotsLength={shopItems.length}
                    activeDotIndex={currentItem}
                    carouselRef={carouselRef}
                    tappableDots={true}
                    dotContainerStyle={{width: '2%'}}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: '#007aff',
                        borderColor: 'blue',
                        borderWidth: 2
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                        backgroundColor: 'skyblue',
                        width: 15,
                        height: 15,
                        borderRadius: 10,
                        marginHorizontal: 8,
                        borderColor: 'black',
                        borderWidth: 3
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
        </View>
    );
}

const ShopItem = (props) => {
  return (
      <View style={[{alignSelf: 'center', borderRadius: 50 / 4, borderWidth: 2, borderColor: 'grey'}, props.purchased(props.itemKey) ? styles.purchased : null]}>
        <Pressable
            style={[styles.gridItem ]}
            onPress={ () => {
                    props.propFunction();
                }
            }
        >
            <Image
            style={styles.itemImage}
            source={props.image}
            />
            <Text style={styles.gridItemText}>{props.name}</Text>
        </Pressable>
      </View>
  );
};

export default AvatarShop;
