import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {withTheme} from '../../theme';
import {themes} from '../../constants/colors';
import images from '../../assets/images';
import {dateStringFromNowShort} from '../../utils/datetime';
import PopupMenu from '../../containers/PopupMenu';
import {getUserRepresentString} from '../../utils/const';
import {VectorIcon} from '../../containers/VectorIcon';

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.4,
    flexDirection: 'column',
    padding: 18,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '500',
    fontSize: 12,
  },
  handle: {
    fontSize: 12,
    fontWeight: '400',
  },
  more: {
    height: 13,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: '400',
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
    paddingRight: 20,
  },
  toolIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#898989',
  },
  chatIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#898989',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  count: {
    fontSize: 12,
    marginLeft: 6,
    marginRight: 20,
  },
});

const PostText = ({
  item,
  isLiking,
  onPressUser,
  onPress,
  onPressShare,
  onActions,
  onLike,
  theme,
}) => {
  return (
    <View
      style={[
        styles.container,
        {borderColor: themes[theme].profilePostBorder},
      ]}>
      <View style={[styles.row, {justifyContent:'space-between'}]}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity onPress={onPressUser}>
            <Image
              source={
                item?.owner?.avatar
                  ? {uri: item?.owner?.avatar}
                  : images.default_avatar
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={[styles.column, {marginLeft: 10}]}>
            <View style={styles.row}>
              <Text style={[styles.name, {color: themes[theme].activeTintColor}]}>
                {item?.owner?.displayName}
              </Text>
              <Text
                style={[
                  styles.handle,
                  {color: themes[theme].profileHandle, marginLeft: 7},
                ]}>
                {getUserRepresentString(item?.owner)}
              </Text>
            </View>
            <Text style={[styles.handle, {color: themes[theme].profileHandle, marginTop: 5}]}>
              {item?.date ? dateStringFromNowShort(item?.date) : null}
            </Text>
          </View>
        </View>
        <PopupMenu
          theme={theme}
          options={onActions.options}
          renderTrigger={() => (
            <VectorIcon
              type="Feather"
              name="more-horizontal"
              size={18}
              color={themes[theme].activeTintColor}
            />
          )}
        />
      </View>
      <View style={{marginTop: 10}}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.text, {color: themes[theme].activeTintColor}]}>
            {item?.text}
          </Text>
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => onLike(isLiking)}>
              <Image
                style={[styles.toolIcon, {tintColor: isLiking ? '#EF1E1E' : '#898989'}]}
                source={images.heart}
              />
              <Text
                style={[styles.count, {color: themes[theme].activeTintColor}]}>
                {item.likes?.length ?? 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={styles.row}>
              <Image source={images.chat} style={styles.chatIcon} />
              <Text
                style={[styles.count, {color: themes[theme].activeTintColor}]}>
                {item.comments?.length ?? 0}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressShare}>
            <Image source={images.share} style={styles.toolIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default withTheme(PostText);
