/* eslint-disable no-console */
import React, { memo, useMemo } from 'react';
import { View } from 'react-native';

import { HoldItem } from 'react-native-hold-menu';

import styles from './styles';
import { useAppContext } from '../../hooks/useAppContext';
import StyleGuide from '../../utilities/styleGuide';

interface PlaygroundProps {}

const Playground = ({}: PlaygroundProps) => {
  const { theme } = useAppContext();

  const items = [
    {
      isTitle: true,
      text: 'Actions',
    },
    {
      text: 'Home',
      icon: 'home',
      onPress: () => {
        console.log('[ACTION]: Home');
      },
    },
    {
      text: 'Edit',
      icon: 'edit',
      onPress: () => {
        console.log('[ACTION]: Edit');
      },
    },
    {
      text: 'Download',
      onPress: () => {
        console.log('[ACTION]: Download');
      },
      icon: 'download',
    },
    {
      text: 'Delete',
      onPress: () => {
        console.log('[ACTION]: Delete');
      },
      icon: 'trash',
      withSeparator: true,
      isDestructive: true,
    },
    {
      text: 'Share',
      onPress: () => {
        console.log('[ACTION]: Share');
      },
      icon: 'share',
    },
    {
      text: 'More',
      onPress: () => {
        console.log('[ACTION]: More');
      },
      icon: 'more-horizontal',
    },
  ];

  const themeStyles = useMemo(() => {
    return {
      containerStyles: [
        styles.container,
        { backgroundColor: StyleGuide.palette[theme].backgroundColor },
      ],
      item: [
        styles.item,
        { backgroundColor: StyleGuide.palette[theme].primary },
      ],
      dot: [
        styles.dot,
        { backgroundColor: StyleGuide.palette[theme].primaryDark },
      ],
      footer: [
        styles.footer,
        { borderColor: StyleGuide.palette[theme].secondary },
      ],
    };
  }, [theme]);

  return (
    <View style={themeStyles.containerStyles}>
      <View style={themeStyles.footer}>
        <HoldItem items={items}>
          <View style={[themeStyles.item, { backgroundColor: 'green' }]}>
            <View style={[themeStyles.dot, styles.bottomLeft]} />
          </View>
        </HoldItem>
        <HoldItem items={items}>
          <View style={[themeStyles.item, { backgroundColor: 'yellow' }]}>
            <View style={[themeStyles.dot, styles.bottomCenter]} />
          </View>
        </HoldItem>
        <HoldItem items={items}>
          <View style={[themeStyles.item, { backgroundColor: 'red' }]}>
            <View style={[themeStyles.dot, styles.bottomRight]} />
          </View>
        </HoldItem>
      </View>
    </View>
  );
};

export default memo(Playground);
