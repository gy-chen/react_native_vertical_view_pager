import _ from 'lodash';
import React, { Component } from 'react';
import {
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

const SCROLL_THRESHOLD = 0.2;

/**
 * VerticalViewPager
 *
 * vertical view pager for both ios and android.
 *
 * This component only support vertical swipe. If want to use horizontal, use
 * some exists components like React Native's ScrollView or ViewPagerAndroid.
 *
 */
class VerticalViewPager extends Component {

  constructor(props) {
    super(props);

    this._contentOffset = null;
    this._layout = null;
    this.state = {
      scrollEnabled: true
    };
  }

  scrollTo({ x, y, animated }) {
    this.scrollview.scrollTo({ x, y, animated });
  }

  onScrollBeginDrag(e) {
    // record starting points
    this._setStartOffset(e.nativeEvent.contentOffset);
    _.invoke(this.props, 'onScrollBeginDrag', e);
  }

  onScrollEndDrag (e) {
    // record ending points
    this._setEndOffset(e.nativeEvent.contentOffset);
    // calculate the offset the user scrolls
    this._calculateOffsets();
    _.invoke(this.props, 'onScrollEndDrag', e);
  }

  onMomentumScrollEnd(e) {
    _.invoke(this.props, 'onMomentumScrollEnd', e);
    this.setState({
      scrollEnabled: true
    });
  }

  nextPage() {
    // calculate next y offset value
    const { height } = this._layout;
    const { y: startY } = this._startContentOffset;
    const nextYOffset = startY + height;
    // scrollTo that point
    this.scrollTo({ y: nextYOffset });
    this.setState({
      scrollEnabled: false
    });
  }

  prevPage() {
    // calcullate prev page's y offset value
    const { height } = this._layout;
    const { y: startY } = this._startContentOffset;
    const nextYOffset = startY - height;
    // scrollTo that point
    this.scrollTo({ y: nextYOffset });
    this.setState({
      scrollEnabled: false
    });
  }

  _setStartOffset(startOffset) {
    this._startContentOffset = startOffset;
    this._endContentOffset = null;
  }

  _setEndOffset(endOffset) {
    this._endContentOffset = endOffset;
  }

  _calculateOffsets() {
    const { height } = this._layout;
    const { y: startY } = this._startContentOffset;
    const { y: endY } = this._endContentOffset;
    if ((endY - startY) > height * SCROLL_THRESHOLD) {
      this.nextPage();
    }
    else if ((endY - startY) < -height * SCROLL_THRESHOLD) {
      this.prevPage();
    }
    else {
      this.scrollTo({ y: startY });
    }
  }

  _refScrollView(scrollview) {
    this.scrollview = scrollview;
  }

  _onLayout(e) {
    this._layout = e.nativeEvent.layout;
  }

  componentWillReceiveProps(nextProps) {
    const { contentOffset } = this.props;
    const { contentOffset: nextContentOffset} = nextProps;
    if (contentOffset != nextContentOffset) {
      this.scrollTo({ ...nextContentOffset, animated: false });
    }
  }

  render() {
    const {
      contentContainerStyle,
      style
    } = this.props;
    return (
      <ScrollView
        ref={ scrollview => this._refScrollView(scrollview) }
        onLayout={ e => this._onLayout(e) }
        horizontal={false}
        style={style}
        scrollEnabled={this.state.scrollEnabled}
        onScrollBeginDrag={ e => this.onScrollBeginDrag(e) }
        onMomentumScrollEnd={ e => this.onMomentumScrollEnd(e) }
        onScrollEndDrag ={ e => this.onScrollEndDrag(e) }
        contentContainerStyle={contentContainerStyle}>
        {this.props.children}
      </ScrollView>
    )
  }
}

VerticalViewPager.propTypes = {
  // style of page container
  contentContainerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  contentOffset: PropTypes.object,
  // onScrollBeginDrag(nativeEvent)
  // a.k.a onScrollBegin
  onScrollBeginDrag: PropTypes.func,
  // onMomentumScrollEnd(nativeEvent)
  // nativeEvent.nativeEvent.contentOffset or nativeEvent.nativeEvent.position must exists
  // a.k.a onScrollEnd
  onMomentumScrollEnd: PropTypes.func,
  // onScrollEndDrag(nativeEvent)
  // nativeEvent.nativeEvent.contentOffset must exists
  // a.k.a. onScrollEndDrag
  onScrollEndDrag: PropTypes.func,
  style: PropTypes.object
};

export default VerticalViewPager;
