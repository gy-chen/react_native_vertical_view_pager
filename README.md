## VerticalViewPager
This component is designed for vertical swipe workaround for Android. If want to use horizontal swiper, use some exists components like React Native's ScrollView or ViewPagerAndroid.

## Usage
```js
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import VerticalViewPager from 'react-native-vertical-view-pager';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
    render() {
        return (
            <VerticalViewPager
                showsVerticalScrollIndicator={false}>
                <View style={[styles.page_container, {backgroundColor: 'pink'}]}>
                    <Text>Page1: Open up App.js to start working on your app!</Text>
                </View>
                <View style={[styles.page_container, {backgroundColor: 'olive'}]}>
                    <Text>Page2: Changes you make will automatically reload.</Text>
                </View>
                <View style={[styles.page_container, {backgroundColor: 'lightblue'}]}>
                    <Text>Page3: Shake your phone to open the developer menu.</Text>
                </View>
            </VerticalViewPager>
        );
    }
}

const styles = StyleSheet.create({
    page_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height
    }
});
```
## Properties
Properties of [ScrollView](https://facebook.github.io/react-native/docs/scrollview.html) should work.
