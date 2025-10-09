import Admonition from '@theme/Admonition';
import DefaultCodeBlock from '@theme/CodeBlock';

// * components
import BrowserWindow from './BrowserWindow';

// * types
type CodeProps = { code: string; children: React.ReactNode };

const CodeBlock = ({ code, children }: CodeProps) => {
  return (
    <>
      <BrowserWindow>{children}</BrowserWindow>

      <Admonition type='warning'>In case of any issues, try refreshing the page.</Admonition>

      <DefaultCodeBlock language='jsx' showLineNumbers>
        {code}
      </DefaultCodeBlock>
    </>
  );
};

export default CodeBlock;
