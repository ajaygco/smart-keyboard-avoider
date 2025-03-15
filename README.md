# Smart Keyboard Avoider

A smart keyboard avoider for React Native that ensures your UI remains accessible when the keyboard appears. Unlike KeyboardAvoidingView, this library properly handles scrolling to keep the focused input visible.

## Why Was This Needed?

React Native's built-in KeyboardAvoidingView often fails to properly adjust for the keyboard in real-world scenarios. Common issues include:

- Inconsistent scrolling behavior when the keyboard appears.
- Inputs getting hidden if they are near the bottom of the screen.
- Manual adjustments needed to ensure smooth UX.

This library provides a drop-in replacement that dynamically calculates and scrolls to prevent any overlap.

## How It Works

### Core Features

- Detects keyboard height dynamically.
- Captures touch position before the keyboard appears.
- Automatically scrolls to ensure visibility.
- Works seamlessly inside a ScrollView.

### Implementation Details

1. Tracks user touch location (touchY) to determine where input is focused.
2. Listens to keyboardDidShow events to get the keyboard's height.
3. Calculates the required scroll offset (distanceToScroll) to move the view.
4. Uses ScrollView.scrollTo() to adjust the view without additional configuration.

## Installation

```sh
npm install @ajaygco/smart-keyboard-avoider
```

## Usage

```tsx
import React from "react";
import { TextInput, View } from "react-native";
import { SmartKeyboardAvoider } from "@ajaygco/smart-keyboard-avoider";

const MyScreen = () => {
  return (
    <SmartKeyboardAvoider style={{ flex: 1 }}>
      // Content goes here...
    </SmartKeyboardAvoider>
  );
};

export default MyScreen;
```

## Why Was This Built?

This package was created to provide a reliable, plug-and-play solution for handling keyboard avoidance in React Native apps. Unlike existing solutions, it eliminates the need for manual calculations and ensures that inputs never get hidden behind the keyboard.

## License

MIT License. Created by [Ajay Gupta](https://ajayg.co).
