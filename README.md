# VFX-MobileDeveloperChallenge by Tiago Gomes

Welcome to my VFX-MobileDeveloperChallenge! This app is built using React Native and serves to test my React Native skills to VFX Financial.

## Features

- Navigate between screens using the bottom tab navigator.

- Search Functionality:
  - On the Story1 screen, users can type the stock name in the search bar to display corresponding results using Alpha Vantage API, and can select it.
  - On the Story2 screen, users can type the currency pair in the search bar to see a list based on their input, there are only 3 currency pairs, EUR/USD, GBP/USD and GBP/EUR.
- Interactive Charts:

  - Users can explore historical price data by clicking on the dots inside the chart.
  - The chart is currently configured to receive API data only for the Story2.

- Interactive Buttons:
  - On the Story2, users can switch the chart of the currency pair between the daily, weekly and monthly views.

## Third-Party Libraries

Here's a list of third-party libraries used in this project and their purposes:

- **@react-navigation**: React Navigation is used for handling navigation within the app. It provides a flexible and customizable way to navigate between screens, a fast and effective way to add a stack navigatior, bottom tab navigator and a drawer navigatior. It's also one of the most used third-party libraries to handle navigation.

- **react-native-vector-icons**: React Native Vector Icons is used for adding icons to the app. It provides a wide range of customizable icons that can be easily integrated into the app. It's used inside the bottom tab navigator and inside the search bar component.

- **react-native-chart-kit**: React Native Chart Kit is used to add charts to the app. It provides customizable charts that can be easily integrated, some of the features I'm using are the onDataPointClick function to know which data point the user clicked to show more details about that data point and change the color of it using getDotColor. It's used to show the price of the stocks and the price of the currency pairs, daily, weekly and monthly depending on the user's input. (Now it's already getting data from an API).

- **react-native-svg**: React Native SVG provides SVG support for React Native and is required in the react-native-svg-charts library.

- **redux**: Redux is used for managing the state of the app. It helps in maintaining a centralized state and makes it easier to manage data flow within the app.

- **react-native-dotenv**: React Native DotEnv is a Babel plugin for injecting environment variables into the app. It's used to add the API key as an environment variable.

## Installation

1. Clone the repository to your local machine:

   git clone https://github.com/Ghomess/VFX-MobileDeveloperChallenge-Tiago-Gomes.git

2. Navigate to the project directory:

   cd VFX-MobileDeveloperChallenge-Tiago-Gomes

3. Install dependencies:

   npm install

   or

   yarn install

4. Create an .env file to add the API key (https://www.alphavantage.co/support/#api-key) using the following code:

   API_KEY=yourapikey

## Usage

To run the app on your local machine, you can use the following commands:

For iOS:

    npx react-native run-ios

For Android:

    npx react-native run-android
