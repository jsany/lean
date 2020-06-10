import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { TButtonProps } from './index';

const defaultProps: TButtonProps = {
  onClick: jest.fn(),
};

const testProps: TButtonProps = {
  btnType: 'primary',
  size: 'sm',
  className: 'test-btn',
};

const disabledProps: TButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe('test Button component', () => {
  // test default button
  it('should render default button', () => {
    const wrapper = render(<Button {...defaultProps}>Nick default</Button>);
    const element = wrapper.getByText('Nick default') as HTMLButtonElement;
    // wrapper.debug()
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('lean-btn lean-btn-default');
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  // test testProps button
  it('should render primary button', () => {
    const wrapper = render(<Button {...testProps}>Nick primary</Button>);
    const element = wrapper.getByText('Nick primary');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      'lean-btn lean-btn-sm lean-btn-primary test-btn',
    );
  });

  // test link button
  it('should render link btn', () => {
    const wrapper = render(
      <Button btnType="link" href="http://google.com">
        Link
      </Button>,
    );
    const element = wrapper.getByText('Link');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('lean-btn lean-btn-link');
  });

  // test disabled button
  it('should render disabled button', () => {
    const wrapper = render(<Button {...disabledProps}>Nick disabled</Button>);
    const element = wrapper.getByText('Nick disabled') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
