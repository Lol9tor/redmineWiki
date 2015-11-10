import React, { PropTypes } from 'react';

function Scroll(value) {
    return (DecoratedComponent) =>
        class PrepareRouteDecorator extends React.Component {

            constructor(props, context) {
                super();

            }

            fn = () => {
                console.log('fn');
            };

            componentDidMount() {
                console.log(this.props);
            }

            render() {
                return (
                    <DecoratedComponent {...this.props} />
                );
            }
        };
}

export default Scroll;

