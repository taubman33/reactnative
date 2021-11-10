
# React Native Intro

![](https://www.weblineindia.com/wp-content/uploads/2019/01/react-native-build-mobile-apps-with-increased-developer-productivity.gif)

## Welcome

Welcome to cross-platform app development. With React Native, your apps are platform-agnostic. They can be written for iOS, Android and mobile web with one code base. In this chapter, we will walk through the initial steps to create a React Native application from scratch. 

### By the end of this lesson, developers will be able to:

- Use the Expo Command Line Interface (CLI)
- Structure a React Native application
- Fetch data from an API using axios
- Use Hooks to modify internal app state
- Create reusable components with props
- Style components using a custom Stylesheet

## Start it up

These docs are based on the React Native [Getting Started Guide](https://facebook.github.io/react-native/docs/getting-started.html) guide. Please note that this is under the "Expo CLI Quickstart" tab.

Let's begin with the [Expo](https://expo.io/) command line interface. 

Expo is a workflow for mobile developers to build React Native apps. It is important to note that while this section uses Expo, *Expo is not required*.

With Expo, you have access to lots of built-in functionality, provided by the Expo SDK. Without Expo, you can build apps with Native Modules. TL;DR, if you are new to mobile app development, stick with Expo.

### Expo Project Lifecycle

The two ways to use Expo tools are called the "managed" and "bare" workflows.

![](https://docs.expo.io/static/images/project-lifecycle-workflows.png)

- Source: [Expo Documentation](https://docs.expo.io/versions/v35.0.0/introduction/managed-vs-bare/)

<details>
<summary> Curious about the Pros and Cons of using Expo? </summary>

Pros
- Lots of built-in third party libraries
- Easy to get started with (Expo CLI)
- No operating system requirements
- Great for rapid prototyping
- Excellent [documentation](https://docs.expo.io/versions/latest/)

Cons
- No native modules (Java/Kotlin, Obj-C/Swift)
- Release management is taken care of by Expo
- Not always up to date with the latest version of React Native
- Eject is a one-way ticket
- Large initial app bundle size

</details>

In any case, we shall begin building our app by installing the Expo client, and running the `init` command:

```bash
npm install -g expo-cli
expo init <app-name>
``` 
<details>
<summary> Having `permissions` issues running `npm install -g expo-cli`? </summary>

Please refer to this guide: [npm docs](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

If you followed the npm docs, be sure to re-initialize your `bash_profile`:

```bash
source ~/.bash_profile
expo init <app-name>
```
</details>

In this case, `<app-name>` will be the name of your app. Please do not name it `<app-name>`! 

Keep in mind, our first app will be a writing prompts app, so try to give it a name that rolls off the tongue (or simply `writing-app`).

### Following the Expo Setup Wizard

Let's create a React Native app using the Expo CLI wizard:

1) Select `blank` - this is a blank canvas app template.

```bash
? Choose a template: (Use arrow keys)
  ----- Managed workflow -----
❯ blank                 a minimal app as clean as an empty canvas 
```

2) Name your app. Again, do not name it `app-name`! Typing the full app name will edit it in your `package.json` file.

```bash
{
   "expo": {
     "name": "<app-name>",
     "slug": "<app-slug>"
   }
 }
```

If you followed these steps successfully, you should have a new app with the following structure:

```
.
.expo-shared/
assets/
node_modules/
.gitignore
.watchmanconfig
App.js
app.json
babel.config.js
package.json
yarn-error.log
yarn.lock
```

Once set up, please `cd` into the app's root directory and run `yarn start`:

```bash
cd <app-name>
yarn start
```

Great! We are now running our first React Native application.

Our first app will allow users to read prompts and write stories on the go. 

Ready to continue building our first view? Edit your `App.js` to greet your new app:

```javascript
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World! Welcome to my app.</Text>
    </View>
  );
}
``` 

## React Native JSX and Docs

As you may have noticed, this looks just like Javascript and JSX (React). 

React Native was built with React developers in mind. The difference is there are not any markup tags such as `<div>`. 

The React Native documentation illustrates these built-in components:
- [View](https://facebook.github.io/react-native/docs/view)
- [Text](https://facebook.github.io/react-native/docs/text)

## Turn and Talk (5 Mins)

Team up with a partner and pick any component listed in the React Native documentation. With your partner, ask each other to read & explain the components you chose. Answer the following questions:

- What is the purpose of the component you chose?
- Is there a Web equivalent of the component? 
(ex: A `<View>` in React Native version of a standard Web `<div>`)

## Building Reusable Components

We will continue to build our first React Native app, a writing prompts app.

### RoundedButton Component

Let's create our first reusable component, called `RoundedButton`.

For a challenge, try to create your own `RoundedButton` component. The button should display `text` inside of a pressable rounded button.

Save the following source code inside `./RoundedButton.js`.

<details>
<summary>Click here to display the RoundedButton source code.</summary>

```javascript
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoundedButton(props) {
  const { text, icon, textColor, backgroundColor, onPress } = props;
  const color = textColor || 'white';
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[
        { backgroundColor: backgroundColor || 'transparent' },
        styles.wrapper
      ]}
    >
      <View style={styles.ButtonTextWrapper}>
        {icon}
        <Text style={[{ color }, styles.buttonText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
    display: 'flex',
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    marginBottom: 15,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center'
  },
  ButtonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});
```
</details>

### Import RoundedButton

The `RoundedButton` component displays `text` wrapped inside of a [pressable](https://facebook.github.io/react-native/docs/touchableopacity) rounded button. Let's bring it into our `App.js`:

Add this import code snippet to the top of your `App.js`:

```javascript
import RoundedButton from './RoundedButton';
```

### Display RoundedButton

Enough imports! Let's display the rounded button inside `App.js`.

<details>
<summary> Try to `import` and display your new rounded button. If you need help, click for the hint below. </summary>

```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from './RoundedButton';

export default function App() {
  return (
    <View style={styles.container}>
      <RoundedButton
        text="Next"
        textColor="#161616"
        onPress={() =>
          console.log("Pressed button!")
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
</details>


### React Native - Flexbox

Building apps in React Native allows us to use flexbox to position our elements.

Inside `App.js`, try setting the `justifyContent` property to `flex-end` or `flex-start`. You may notice the button move up and down.

Also inside `App.js`, try experimenting with the `RoundedButton` props, like `text` and `textColor`. Set the `text` property to `"Hello!"` and `textColor` property to `green`!


## App State - Change Background Color

So far our app displays static information. In React Native, components may update their state to display dynamic data.


### Writing Prompts

The writing prompts app is designed to display *random* prompts that *inspire* users to write. 

For now, we will display a randomized background color.

### App State with Hooks

- Inside `App.js`, we are going to modify the current source code. The new source code will provide state to our App using Hooks. 
- [Hooks](https://reactjs.org/docs/hooks-intro.html) were introduced by the React team to use state and other React features without writing classes.

### Why Hooks?

Prior to Hooks, class components would modify their state using lifecycle methods, such as the `constructor` and `componentDidMount`. With Hooks we can achieve the same internal state as class components, with less boilerplate code. 

### Adding Hooks into the App

Inside of `App.js` on line one, import the `useState` method:

```javascript
import React, { useState } from 'react';
```

Our `App.js` will need to initialize it's state with a `color` string. Let's declare our first hook, to add and modify this property:

```javascript
// import statements

export default function App() {
  const [color, setColor] = useState('#161616');

  {/* Do not copy below... */}
  return ()
}
```

### Setting Random Background Color

Each time we press the `RoundedButton`, let's set the background color to a random `rgb()` value. Here's a function snippet to do just that...

For a challenge, try to create your own `randomRgb` function.

<details>
  <summary>Click here to display the `randomRgb` source code.</summary>

```javascript
// Paste this snippet inside App.js, just above the stylesheet.
const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};
```

</details>

Now let's add the `randomRgb` function to our `RoundedButton` onPress method.

<details>
  <summary>Click here to display the source code so far.</summary>

```javascript
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from './RoundedButton';

export default function App() {
  
  const [color, setColor] = useState('#161616');
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <RoundedButton
        text="Next"
        textColor="#161616"
        onPress={() => setColor(randomRgb())}
      />
    </View>
  );
}

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```
</details>

### Test Random Background Color

Refresh your app and click the "Next" button. If the app's background color changes, nicely done!! If not, debug your code and make sure it matches the above snippet.

## Async Await

The writing prompts app currently displays a static list of prompts. In order to make it a dynamic list, we created a server that sends random prompts.

## Axios

First, we will install the `axios` library for our network requests.

> Heads Up! This lesson's code edits will only affect your *React Native* project. 

Run the following command inside your *React Native* project.

```bash
yarn add axios
```

With Axios installed, we can query the `localhost` server for random prompts.

Let's modify the React Native app code, with the following snippet inside `App.js`:

```js
// App.js
// top imports...
import axios from 'axios';

```

### Fetch Random Prompt

With Axios imported at the top of our `App.js`, we can write an `async` function that fetches a randomPrompt.

```js
const randomPrompt = async () => {
    try {
      const response = await axios.get('https://prompts-express-api.herokuapp.com/random');
      const prompt = response.data;
      setPrompt(prompt.title);
    } catch(err) {
      console.log(err);
    }
  }
```

### Hooking into State

- Next, we will add a new hook method for the `prompt` string's state changes.

```js

// App.js

const [color, setColor] = useState('#161616');
const [prompt, setPrompt] = useState('Hello!');

```

### Update RoundedButton

- Next, we will modify the `RoundedButton`'s `onPress` method to utilize the new network request. 

```js

// App.js

...
<RoundedButton
        text="Next"
        textColor="#161616"
        onPress={() => {
          randomPrompt();
          setColor(randomRgb());
        }}
      />
...

```

<details>
<summary>Need a hint? Click here for the full `App.js` source code so far.</summary>

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from './RoundedButton';
import axios from 'axios';

export default function App() {
  const [color, setColor] = useState('#161616');
  const [prompt, setPrompt] = useState('Hello!');

  const randomPrompt = async () => {
    try {
      const response = await axios.get('https://prompts-express-api.herokuapp.com/random');
      const prompt = response.data;
      setPrompt(prompt.title);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.prompt}>{prompt}</Text>
      <RoundedButton
        text="Next"
        textColor="#161616"
        onPress={() => {
          randomPrompt();
          setColor(randomRgb());
        }}
      />
    </View>
  );
}

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  prompt: {
    color: 'white',
    fontSize: 22,
    padding: 20,
    textAlign: 'center'
  }
});
```
</details>

## Display Initial Prompt

Right now, we see a new prompt each time the user taps "Next". This is great, but our initial prompt is currently "Hello World!"

How can we remedy this using Hooks?

Given the new hooks API, we can call a method called `useEffect`, which functions like the `componentDidMount` and `componentDidUpdate` lifecycle methods. Let's try it out! 

### Using useEffect

At the top of `App.js`, update your imports to reflect the following change:

```js
import React, { useState, useEffect } from 'react';

```

After importing `useEffect`, bring it into the fold.

```js
export default function App() {
  const [color, setColor] = useState('#161616');
  const [prompt, setPrompt] = useState('Hello');

  // useEffect runs on first render.

  useEffect(() => {
    randomPrompt();
  }, '');

  // ^^ Don't forget this empty string!

  ...
}

```

`useEffect` will update our initial state to reflect the first random prompt.

If you like, add `setColor(randomRgb())` to the `useEffect` method. This will change the initial color as well.

With that said, we are ready to wrap up this lesson. 

## Bonus Challenge

### Share Prompts

The app currently displays a unique prompt each time the user presses "Next". 

Try adding a second button to [Share](https://facebook.github.io/react-native/docs/share) the current prompt.

### Wrapping Up

Today we made a react native app, with async requests to fetch random prompts. 
