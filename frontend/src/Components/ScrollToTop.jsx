import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'


class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname || (window.performance.navigation.type === 1)) {
            window.scrollTo(0, 0)
        }
    }
    render() {
        return this.props.children
    }
}

export default withRouter(ScrollToTop)