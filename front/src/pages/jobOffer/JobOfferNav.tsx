import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import i18n from '@/utils/i18n';

import JobOfferListPage from './JobOfferListPage';
import JobOfferPage, { JobOfferPageParams } from './JobOfferPage';

/**
 * The parameter list for the JobOffersNav navigator.
 */
export type JobOfferStackParamList = {
  JobOfferList: undefined;
  JobOffer: JobOfferPageParams;
  JobOfferApplication: undefined;
};

const JobOfferStack = createNativeStackNavigator<JobOfferStackParamList>();

/**
 * The stack navigator for the job offers pages.
 * @constructor
 */
const JobOffersNav = () => {
  return (
    <JobOfferStack.Navigator
      initialRouteName='JobOfferList'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <JobOfferStack.Screen
        name='JobOfferList'
        component={JobOfferListPage}
        options={{ headerTitle: `${i18n.t('home.home')}` }}
      />
      <JobOfferStack.Screen
        name='JobOffer'
        component={JobOfferPage}
        options={{ headerTitle: `${i18n.t('jobOffer.info.jobOffer')}` }}
      />
    </JobOfferStack.Navigator>
  );
};

export default JobOffersNav;
