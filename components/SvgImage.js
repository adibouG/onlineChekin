import React  from 'react';

class SvgImage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        this.svgRef = React.createRef(null);
    }

    componentDidMount() {
        debugger
        if (this.props.url && this.svgRef.current) {
            this.setState({
                icon: this.svgRef.current.documentElement.outerHTML,
            });
        }   
        if (this.svgRef.current) {
            //this.svgRef.current.styles = this.props.svgStyle;
        }
    }

    createInnerHtml() {
        return {
            __html: this.state.icon
        };
    }
    render() {
        return (
            <div    ref={this.svgRef} 
                    className={this.props.svgStyle} 
                    dangerouslySetInnerHTML={this.createInnerHtml()}
            >
                
            </div>
        );
    }
}

/*
class Widget extends React.Component {
  render() {
    return (
        <SvgImage url='https://cdn.css-tricks.com/wp-content/uploads/2015/05/kiwi.svg'>            
        </SvgImage>);
  }
}
*/

export default SvgImage;