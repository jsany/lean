## Button

Demo:

```tsx
/**
 * title: Button
 * desc: 不依赖三方 UI 库的 button 组件
 */

import React from 'react';
import { Button } from 'lean';

export default () => (
  <div>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="primary" disabled>
      {' '}
      disabled button{' '}
    </Button>
    <Button btnType="link" href="https://google.com">
      {' '}
      link button{' '}
    </Button>
  </div>
);
```

More skills for writing demo: <https://d.umijs.org/guide/demo-principle>
