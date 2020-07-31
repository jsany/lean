import { PREFIX_CLS } from '@/_constants/base';

export const getPrefixCls = (
  suffixCls: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `${PREFIX_CLS}-${suffixCls}` : PREFIX_CLS;
};
