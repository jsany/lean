import React from 'react';
import { Divider } from 'antd';
import classNames from 'classnames';
import Styles from './style/index.less';
import HeartImg from './images/heart.png';
import BgImg from './images/bg_coins.png';

const Foo: React.FC<{ title: string }> = ({ title }) => (
  <>
    <h1 className={classNames(Styles['foo-center'])}>
      <Divider type="vertical" />
      <img src={HeartImg} alt="heart" />
      {title}
      <img src={HeartImg} alt="heart" />
      <Divider type="vertical" />
    </h1>
    <img src={BgImg} alt="bgimg" />
  </>
);

Foo.displayName = 'Foo'
export default Foo;
