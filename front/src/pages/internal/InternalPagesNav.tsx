import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import InternalPagesPage from '@/pages/internal/InternalPagesPage';
import ProfileNav from '@/pages/profile/ProfileNav';

import JobOffersNav from '../jobOffer/JobOfferNav';

/**
 * The parameter list for the InternalPagesNav navigator.
 */
export type InternalPagesStackParamList = {
  PagesMain: undefined;
  PagesProfile: undefined;
  PagesJobOffer: undefined;
};

const InternalPagesStack =
  createNativeStackNavigator<InternalPagesStackParamList>();

/**
 * The stack navigator for the internal pages.
 * @constructor
 */
const InternalPagesNav = () => {
  return (
    <InternalPagesStack.Navigator
      initialRouteName='PagesMain'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <InternalPagesStack.Screen
        name='PagesMain'
        component={InternalPagesPage}
        options={{ headerTitle: 'Pages' }}
      />
      <InternalPagesStack.Screen
        name='PagesProfile'
        component={ProfileNav}
        options={{ headerShown: false }}
      />
      <InternalPagesStack.Screen
        name='PagesJobOffer'
        component={JobOffersNav}
        options={{ headerShown: false }}
      />
    </InternalPagesStack.Navigator>
  );
};

export default InternalPagesNav;
