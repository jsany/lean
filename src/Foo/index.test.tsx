import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Foo, { TFooProps } from './index';

describe('test Foo component', () => {
  // test Foo
  it('shoule render Foo', () => {
    const wrapper = render(<Foo title="demo" />);
    const element = wrapper.getByText('demo');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('H1');
    expect(element).toHaveClass('lean-foo');
  });

  // test Foo with custom className
  it('shoule render Foo with class myfoo', () => {
    const wrapper = render(<Foo title="demo" className="myfoo" />);
    const element = wrapper.getByText('demo');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('H1');
    expect(element).toHaveClass('lean-foo myfoo');
  });
});
