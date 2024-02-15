import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {outsideHeader, themedHeader, StackAnimation} from '../utils/navigation';
import PrivacyAndSettingsView from '../views/PrivacyAndSettingsView';
import BlockView from '../views/BlockView';
import HelpAndSupport from '../views/HelpAndSupport';
import VipMembersClubView from '../views/VipMembersClubView';
import PremiumSubscription from '../views/PremiumSubscription';
import PrivacySettingsView from '../views/PrivacySettingsView';

// Outside
const Menu = createStackNavigator();
const MenuStack = () => {
  const theme = 'light';

  return (
    <Menu.Navigator
      screenOptions={{
        ...outsideHeader,
        ...themedHeader(theme),
        ...StackAnimation,
      }}>
      <Menu.Screen
        name="PrivacyAndSettings"
        component={PrivacyAndSettingsView}
      />
      <Menu.Screen name="PrivacySettings" component={PrivacySettingsView} />
      <Menu.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Menu.Screen
        name="VipMembers"
        component={VipMembersClubView}
        options={VipMembersClubView.navigationOptions}
      />
      <Menu.Screen name="Block" component={BlockView} />
      <Menu.Screen name="PremiumSubscription" component={PremiumSubscription} />
    </Menu.Navigator>
  );
};

export default MenuStack;