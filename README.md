# The Briefing Room

The Briefing Room is a web application designed by a passionate fan of F1. The goal of this app is to provide a platform where fellow enthusiasts can dive into the world of F1 racing through in-depth telemetry data analysis. You can explore historical race data, compare drivers' telemetry, and stay up-to-date with the latest race results and championship standings. 🏎️⚡️

## Features

### Telemetry analysis

Delve into drivers' telemetry data starting from the 2021 season, allowing you to analyze and compare their driving styles and strategies.

![Telemetry page demo](/public/images/readme/telemetry-demo.png)

### Season hub

Get comprehensive insights into the latest race results, World Driver's Championship (WDC), and World Constructor's Championship (WCC) standings for the ongoing F1 season, and a nice look at the season schedule.

![Season hub page demo - latest race classification](/public/images/readme/season-hub-demo.png)

![Season hub page demo - season schedule](/public/images/readme/season-schedule-demo.png)

### Season archive

Explore the rich history of F1 by accessing WDC and WCC standings from every season since 1950.

![Season archive page demo](/public/images/readme/season-archive-demo.png)

## Tech used

- [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Redux](https://redux.js.org/)

## Getting started

### Prerequisites

1. You'll need to have [Node.js](https://nodejs.org/en) installed

### Installation

1. In order to run the web application locally, you need to install and run [The Briefing Room API](https://github.com/milan-codes/the-briefing-room-api).
2. After the backend is up and running, you will need to clone this repository with: `git clone git@github.com:milan-codes/the-briefing-room.git`
3. Navigate to the folder and install the node modules with yarn: `cd the-briefing-room && yarn install`
4. Create a `.env.local` file where you specify in the `SERVER` environment variable where the API is running (e.g.: `SERVER=http://127.0.0.1:8000`)
5. Start the app in dev mode with `yarn dev` (or alternatively to test out the build: `yarn build` and then `yarn start`)

## Contributing

Contributions are welcomed! If you have coding skills, insights, or ideas to improve the app, you can actively participate in its development. Whether it's fixing bugs, adding new features, or suggesting improvements, your input can make a significant difference. Open an issue if you have any insights.

- Note that only signed commits are accepted

## Disclaimer

The creator of this web application is in no way, shape or form linked to FORMULA 1, Liberty Media, the FIA or any other organization. This website was created only for fun, and educational purposes and it does not generate any revenue. All rights belong to their respective owners. Any insights or data derived from the app should be regarded as unofficial and for informational purposes only.
