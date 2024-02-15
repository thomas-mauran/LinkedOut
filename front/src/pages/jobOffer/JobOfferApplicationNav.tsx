import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PaperNavigationBar from '@/components/utils/PaperNavigationBar';
import i18n from '@/utils/i18n';

import JobOfferPage, { JobOfferPageParams } from './JobOfferPage';
import JobOfferApplicationPage from './JobOfferApplicationPage';

/**
 * The parameter list for the JobOffersNav navigator.
 */
export type JobOfferApplicationStackParamList = {
  JobOffer: JobOfferPageParams;
  JobOfferApplicationList: undefined;
};

const JobOfferApplicationStack =
  createNativeStackNavigator<JobOfferApplicationStackParamList>();

/**
 * The stack navigator for the job offers pages.
 * @constructor
 */
const JobOffersApplicationNav = () => {
  return (
    <JobOfferApplicationStack.Navigator
      initialRouteName='JobOfferApplicationList'
      screenOptions={{ header: (props) => <PaperNavigationBar {...props} /> }}
    >
      <JobOfferApplicationStack.Screen
        name='JobOfferApplicationList'
        component={JobOfferApplicationPage}
        options={{
          headerTitle: `${i18n.t('jobOffer.applied.jobOfferAppliedList')}`,
        }}
      />
      <JobOfferApplicationStack.Screen
        name='JobOffer'
        component={JobOfferPage}
        options={{ headerTitle: `${i18n.t('jobOffer.info.jobOffer')}` }}
      />
    </JobOfferApplicationStack.Navigator>
  );
};

export default JobOffersApplicationNav;
