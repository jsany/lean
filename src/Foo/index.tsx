import React from 'react';
import { Divider } from 'antd';
import classNames from 'classnames';
import './style/index.less';
import HeartImg from './images/heart.png';
import BgImg from './images/bg_coins.png';
import { getPrefixCls } from '../utils/index';

const Foo: React.FC<{
  title: string;
  className?: string;
  prefixCls?: string;
}> = ({ title, className, prefixCls: customizePrefixCls }) => {
  const prefixCls = getPrefixCls('foo', customizePrefixCls);

  return (
    <>
      <h1 className={classNames(prefixCls, className)}>
        <Divider type="vertical" />
        <img src={HeartImg} alt="heart" />
        {title}
        <img src={HeartImg} alt="heart" />
        <Divider type="vertical" />
      </h1>
      <img src={BgImg} alt="bgimg" />
    </>
  );
};

Foo.displayName = 'Foo';
export default Foo;
