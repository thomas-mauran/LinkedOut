import { getHeaderTitle } from '@react-navigation/elements';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Appbar } from 'react-native-paper';

/**
 * Replacement for the react-navigation header using react-native-paper's Appbar component.
 * @constructor
 */
const PaperNavigationBar = ({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) => {
  // Display the title that would be shown on the native header
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {options.headerRight?.({ canGoBack: !!back })}
    </Appbar.Header>
  );
};

export default PaperNavigationBar;
