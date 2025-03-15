// Modules
import * as React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";

// Global Types
import type {
  ScrollViewProps,
  KeyboardAvoidingViewProps,
  ViewProps,
} from "react-native";

// Types
interface SmartKeyboardAvoiderProps extends KeyboardAvoidingViewProps {
  children: React.ReactNode;
  scrollViewProps?: ScrollViewProps;
  containerViewProps?: ViewProps;
  bottomPadding?: number;
}
type KeyboardEvent = {
  endCoordinates: {
    height: number;
  };
};

export const SmartKeyboardAvoider = ({
  children,
  bottomPadding = 0,
  containerViewProps = {},
  scrollViewProps = {},
  ...props
}: SmartKeyboardAvoiderProps): React.ReactElement => {
  // Refs
  const scrollViewRef = React.useRef<ScrollView>(null);

  // State
  const offsetY = React.useRef<number>(0);
  const touchY = React.useRef<number>(0);

  // On Keybaord Did Show
  const onKeyboardDidShow = (event: KeyboardEvent) => {
    const viewportHeight = Dimensions.get("window").height;

    const keyboardDistance = viewportHeight - touchY.current;
    const keyboardHeight = event.endCoordinates.height as number;

    if (viewportHeight - touchY.current >= keyboardHeight) {
      return;
    }

    const distanceToScroll =
      offsetY.current + keyboardHeight - keyboardDistance + bottomPadding;

    scrollViewRef.current?.scrollTo({
      x: 0,
      y: distanceToScroll,
      animated: true,
    });
  };

  React.useEffect(() => {
    const listener = Keyboard.addListener("keyboardDidShow", onKeyboardDidShow);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView {...props}>
      <ScrollView
        {...scrollViewProps}
        ref={scrollViewRef}
        scrollEventThrottle={32}
        onScroll={(event) => {
          offsetY.current = event.nativeEvent.contentOffset.y;
        }}
      >
        <View
          {...containerViewProps}
          onTouchStart={(event) => {
            touchY.current = event.nativeEvent.pageY;
          }}
        >
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
