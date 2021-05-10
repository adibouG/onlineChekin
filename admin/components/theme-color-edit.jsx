'use strict'

import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { ValueGroup, Label } from '@admin-bro/design-system'

class ThemeColorEdit extends React.Component {

  state = {
    displayColorPicker: false,
    color: this.props.record.params[this.props.property.path]
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    const c = color.hex;
    this.setState({ color: c })
    const { onChange, record, property } = this.props;
    var p = record.params
    p[property.path] = c;
    onChange({
        ...record,
        params: p,
    })
  };

  render() {

    console.log(this.props);
    console.log(this.state.color);

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: this.state.color
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <ValueGroup label={this.props.property.label}>
        <div>
            <div style={ styles.swatch } onClick={ this.handleClick }>
              <div style={ styles.color } />
            </div>
            { 
              this.state.displayColorPicker ? 
              <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ this.handleClose }/>
                <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
              </div> : 
              null 
            }
        </div>
      </ValueGroup>
    )
  }
}

export default ThemeColorEdit;