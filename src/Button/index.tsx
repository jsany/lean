import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import { tuple } from '@/_utils/type';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

const buttonSizes = tuple('lg', 'sm');
export type TButtonSize = typeof buttonSizes[number];

const buttonTypes = tuple('primary', 'default', 'danger', 'link');
export type TButtonType = typeof buttonTypes[number];

const buttonHtmlTypes = tuple('submit', 'button', 'reset');
export type TButtonHtmlType = typeof buttonHtmlTypes[number];

export interface IBaseButtonProps {
  className?: string;
  prefixCls?: string;
  /* 设置 Button 的禁用 */
  disabled?: boolean;
  /* 设置 Button 的尺寸 */
  size?: TButtonSize;
  /* 设置 Button 的类型 */
  btnType?: TButtonType;
  /* 设置 Button 原生 type 值，参考 [html](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button) 标准 */
  htmlType?: TButtonHtmlType;
  children: React.ReactNode;
  /* 设置 Button 为 link 类型时的跳转链接 */
  href?: string;
}

export type TNativeButtonProps = IBaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>;

export type TAnchorButtonProps = IBaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>;

export type TButtonProps = Partial<TNativeButtonProps & TAnchorButtonProps>;

const Button: FC<TButtonProps> = props => {
  const {
    prefixCls: customizePrefixCls,
    btnType,
    htmlType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
  } = props;
  // btn, btn-lg, btn-primary
  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${btnType}`]: btnType,
    [`${prefixCls}-${size}`]: size,
    disabled: disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      type={htmlType}
      {...restProps}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
  htmlType: 'button',
};

export default Button;
