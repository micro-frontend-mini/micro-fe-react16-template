import React from 'react';
import {
  ConfigProvider,
  locales,
} from 'antd';
import loadable from '@loadable/component';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
// 动态控制 webpack 的 publicPath 变量，此文件为必须依赖
import '../publick-path';

const { zh_CN: zhCN } = locales;

const Hello = loadable(() => import('./routes/Hello'), {
  fallback: null,
});
const Root = loadable(() => import('./routes/Root'), {
  fallback: null,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // provinces: [],
    };
  }

  componentDidMount() {
    // this.fetchProvince();
    // message.success('welcome');
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router basename="/react16">
          <Switch>
            <Route
              path="/hello"
              component={Hello}
            />
            <Route path="/home" component={Root} />
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
}

App.propTypes = {

};

App.defaultProps = {
  hello: null,
};

export default App;
