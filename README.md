# VFX-MobileDeveloperChallenge by Tiago Gomes

Welcome to my VFX-MobileDeveloperChallenge! This app is built using React Native and serves to test my React Native skills to VFX Financial.

## Features

- Navigate between screens using the bottom tab navigator.
- Search Functionality:
  - On the Story1 screen, users can type the stock name in the search bar to display corresponding results (hard-coded data).
  - On the Story2 screen, users can type the currency pair in the search bar to see relevant information in a list based on their input.
- Interactive Charts:
  - Users can explore historical price data by clicking on the dots inside the chart.
  - The chart is currently configured with hard-coded data for demonstration purposes.
- Interactive Buttons:
  - On the Story2, users can switch the chart of the currency pair between the daily, weekly and monthly views.
  - The buttons are currently not working, will work when real data is in redux.

## Third-Party Libraries

Here's a list of third-party libraries used in this project and their purposes:

- **@react-navigation**: React Navigation is used for handling navigation within the app. It provides a flexible and customizable way to navigate between screens, a fast and effective way to add a stack navigatior, bottom tab navigator and a drawer navigatior. It's also one of the most used third-party libraries to handle navigation.

- **react-native-vector-icons**: This library is used for adding icons to the app. It provides a wide range of customizable icons that can be easily integrated into the app. It's used inside the bottom tab navigator and inside the search bar component.

- **react-native-svg-charts**: This library is used to add charts to the app. It provides customizable charts that can be easily integrated, some of the features I'm using are the custom data points and an onPress data point function to know which data point the user clicked to show more details about that data point. It's used to show the price and month of the stocks and the price of the currency pairs, daily, weekly and monthly depending on the user's input. (Now it's all hard coded to configure the chart itself).

- **react-native-svg**: This library provides SVG support for React Native and is required in the react-native-svg-charts library.

## Installation

1. Clone the repository to your local machine:

   git clone https://github.com/Ghomess/VFX-MobileDeveloperChallenge-Tiago-Gomes.git

2. Navigate to the project directory:

   cd VFX-MobileDeveloperChallenge-Tiago-Gomes

3. Install dependencies:

   npm install

   or

   yarn install

## Usage

To run the app on your local machine, you can use the following commands:

For iOS:

    npx react-native run-ios

For Android:

    npx react-native run-android
