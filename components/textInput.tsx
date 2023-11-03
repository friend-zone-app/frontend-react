import React, { Component, ChangeEvent } from 'react';
import { TextInput, TextInputProps, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

interface TextInput2Props extends TextInputProps {
  placeholderStyle?: object;
  onChange?: (ev: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

interface TextInput2State {
  placeholder: boolean;
}

class TextInput2 extends Component<TextInput2Props, TextInput2State> {
  constructor(props: TextInput2Props) {
    super(props);
    this.state = { placeholder: !props.value || props.value.length === 0 };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(ev: NativeSyntheticEvent<TextInputChangeEventData>): void {
    const { text } = ev.nativeEvent;
    this.setState({ placeholder: !text || text.length === 0 });
    this.props.onChange && this.props.onChange(ev);
  }

  render() {
    const { placeholderStyle, style, onChange, ...rest } = this.props;

    return (
      <TextInput
        {...rest}
        onChange={this.handleChange}
        style={this.state.placeholder ? [style, placeholderStyle] : style}
      />
    );
  }
}

export default TextInput2;