import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import JobOfferPage from '@/pages/jobOffer/JobOfferPage';
import i18n from '@/utils/i18n';

/**
 * The parameter list for the JobOffersNav navigator.
 */
export type JobOfferStackParamList = {
  JobOffer: undefined;
};

const JobOfferStack = createNativeStackNavigator<JobOfferStackParamList>();

/**
 * The stack navigator for the job offers pages.
 * @constructor
 */
const JobOffersNav = () => {
  return (
    <JobOfferStack.Navigator
      initialRouteName='JobOffer'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <JobOfferStack.Screen
        name='JobOffer'
        component={JobOfferPage}
        options={{ headerTitle: `${i18n.t('jobOffer.info.jobOffer')}` }}
      />
    </JobOfferStack.Navigator>
  );
};

export default JobOffersNav;
