# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Clone the repo

   ```bash
   git clone https://github.com/your-username/MyTodoApp.git
   cd MyTodoApp
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## How It Works
State Management: The useTasks.ts custom hook is the heart of the application. It manages the tasks array, syncing status, and network connectivity.

Offline Functionality:

When the app starts, it loads tasks from AsyncStorage.

Any changes (add, edit, delete, toggle) are immediately saved back to AsyncStorage.

New tasks created offline are marked as isLocal (in a more advanced version) for later syncing.

Online Syncing:

The app uses NetInfo to listen for network state changes.

When the device reconnects to the internet, the syncTasks function is triggered.

For simplicity, the mock API is fully re-fetched and the local state is updated. In a real-world scenario, you would implement a more sophisticated merge strategy to handle local-only changes.

UI Rendering:

The HomeScreen.tsx component uses the useTasks hook to get the latest data.

Two FlatList components are used to display tasks, filtered into "Pending" and "Completed" lists.




## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
