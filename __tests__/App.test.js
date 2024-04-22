import 'react-native';
import React from 'react';

// Note: import explicitly to use the types shipped with jest.
import {test} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import App from '../App';
import 'react-native-vector-icons/Ionicons';
test('renders correctly', () => {
  renderer.create(<App />);
});
