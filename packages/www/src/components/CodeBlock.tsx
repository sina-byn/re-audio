import Admonition from '@theme/Admonition';
import DefaultCodeBlock from '@theme/CodeBlock';

// * components
import BrowserWindow from './BrowserWindow';

// * types
type CodeProps = { code: string; children: React.ReactNode };

const CodeBlock = ({ code, children }: CodeProps) => {
  return (
    <>
      <DefaultCodeBlock language='jsx' showLineNumbers>
        {code}
      </DefaultCodeBlock>

      <BrowserWindow>{children}</BrowserWindow>

      <Admonition type='warning'>In case of any issues, try refreshing the page.</Admonition>
    </>
  );
};

export default CodeBlock;
