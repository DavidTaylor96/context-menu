import React from 'react';
import { StyleSheet } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  calculateMenuHeight,
  menuAnimationAnchor,
} from '../../utils/calculations';

import MenuItems from './MenuItems';

import {
  SPRING_CONFIGURATION_MENU,
  HOLD_ITEM_TRANSFORM_DURATION,
  CONTEXT_MENU_STATE,
} from '../../constants';

import styles from './styles';
import { MenuItemProps } from './types';
import { useInternal } from '../../hooks';
import { deepEqual } from '../../utils/validations';
import { leftOrRight } from './calculations';

const MenuListComponent = () => {
  const { state, theme, menuProps } = useInternal();

  const [itemList, setItemList] = React.useState<MenuItemProps[]>([]);

  const menuHeight = useDerivedValue(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );
    return calculateMenuHeight(
      menuProps.value.items.length,
      itemsWithSeparator.length
    );
  }, [menuProps]);
  const prevList = useSharedValue<MenuItemProps[]>([]);

  const messageStyles = useAnimatedStyle(() => {
    const itemsWithSeparator = menuProps.value.items.filter(
      item => item.withSeparator
    );

    const translate = menuAnimationAnchor(
      menuProps.value.anchorPosition,
      menuProps.value.itemWidth,
      menuProps.value.items.length,
      itemsWithSeparator.length
    );

    const _leftPosition = leftOrRight(menuProps);

    const menuScaleAnimation = () =>
      state.value === CONTEXT_MENU_STATE.ACTIVE
        ? withSpring(1, SPRING_CONFIGURATION_MENU)
        : withTiming(0, {
            duration: HOLD_ITEM_TRANSFORM_DURATION,
          });

    return {
      left: _leftPosition,
      height: menuHeight.value,
      transform: [
        { translateX: translate.beginningTransformations.translateX },
        { translateY: translate.beginningTransformations.translateY },
        {
          scale: menuScaleAnimation(),
        },
        { translateX: translate.endingTransformations.translateX },
        { translateY: translate.endingTransformations.translateY },
      ],
    };
  });

  const animatedInnerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme.value === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(0,0,0,1)',
    };
  }, [theme]);

  const setter = (items: MenuItemProps[]) => {
    setItemList(items);
    prevList.value = items;
  };

  useAnimatedReaction(
    () => menuProps.value.items,
    _items => {
      if (!deepEqual(_items, prevList.value)) {
        runOnJS(setter)(_items);
      }
    },
    [menuProps]
  );

  return (
    <Animated.View style={[styles.menuContainer, messageStyles]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.menuInnerContainer,
          animatedInnerContainerStyle,
        ]}
      >
        <MenuItems items={itemList} />
      </Animated.View>
    </Animated.View>
  );
};

const MenuList = React.memo(MenuListComponent);

export default MenuList;
