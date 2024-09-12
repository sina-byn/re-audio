import MDXComponents from '@theme-original/MDXComponents';

// * lib
import * as ReAudio from '../../../../src/lib';

// * components
import CodeBlock from '../components/CodeBlock';
import BrowserWindow from '../components/BrowserWindow';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  ...ReAudio,
  BrowserWindow,
  CodeBlock,
};
