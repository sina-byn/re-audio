import Link from '@docusaurus/Link';

import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';

// * clsx
import clsx from 'clsx';

// * components
import Grid from '../components/landing/Grid';
import Separator from '../components/Separator';

// * icons
import {
  IconCode,
  IconBrandNpm,
  IconBrandNextjs,
  IconBrandGithub,
  IconAdjustments,
  IconBrandTypescript,
} from '@tabler/icons-react';

export default function Home(): JSX.Element {
  return (
    <Layout
      wrapperClassName='stack'
      description='creating audio players in React has never been easier'
    >
      <main className='stack'>
        <Grid />

        <div className='flex items-end justify-center size-full z-10 overflow-hidden'>
          <img
            alt=''
            width={1920}
            src='img/sound-wave.svg'
            className='shrink-0 h-96 opacity-15 mt-40'
          />
        </div>

        <div className='flex items-center justify-center z-20 py-32'>
          <div className='flex flex-col items-center gap-y-6'>
            <img src='img/logo.svg' alt='' className='w-72' />

            <hgroup>
              <h1 className='hidden'>ReAudio</h1>
              <p className='max-w-96 text-2xl text-center font-semibold leading-10 max-md:px-4'>
                creating audio players in
                <a
                  target='_blank'
                  href='https://react.dev'
                  rel='noopener nofollow noreferrer'
                  className={clsx(
                    'relative hover:no-underline mx-2',
                    'after:content-[""] after:absolute after:top-full after:left-0 after:right-full after:h-0.5',
                    'after:bg-primary after:rounded-full after:transition-[right] hover:after:right-0'
                  )}
                >
                  React
                </a>
                has never been easier
              </p>
            </hgroup>

            <div className='grid place-items-center relative max-sm:w-[calc(100%_-_32px)] rounded-[0.4rem] overflow-hidden p-0.5'>
              <div
                style={{ borderWidth: '200px' }}
                className='animate-rotate absolute z-0 size-10 border-solid border-darker border-t-primary border-r-primary'
              />

              <CodeBlock language='bash' className='w-full sm:w-96 !mb-0'>
                npm i @sina_byn/re-audio
              </CodeBlock>
            </div>

            <Link
              href='/docs/getting-started'
              className='flex items-center size-fit bg-dark text-lg text-primary hover:text-white hover:no-underline rounded-md shadow-md hover:shadow-none py-2 px-4 mt-7'
            >
              Getting Started
            </Link>

            <div className='flex items-center gap-x-6'>
              <a
                target='_blank'
                rel='noopener nofollow noreferrer'
                href='https://github.com/sina-byn/re-audio'
              >
                <IconBrandGithub size={30} className='text-white' />
              </a>

              <a
                target='_blank'
                rel='noopener nofollow noreferrer'
                href='https://www.npmjs.com/package/@sina_byn/re-audio'
              >
                <IconBrandNpm size={35} className='text-white' />
              </a>
            </div>

            <Separator className='mt-10 mb-4' />

            <div className='space-y-4 w-[calc(100%_-_32px)] sm:w-96 mb-32 sm:mb-40'>
              <article className='flex items-center gap-4 bg-dark border border-solid border-transparent hover:border-primary rounded-md p-4'>
                <IconBrandNextjs size={50} className='shrink-0 text-primary mx-0' />
                <span className='font-semibold'>
                  Compatible with Next.js App Router and supports server-side rendering (SSR)
                </span>
              </article>

              <article className='flex items-center gap-4 bg-dark border border-solid border-transparent hover:border-primary rounded-md p-4'>
                <IconBrandTypescript size={50} className='shrink-0 text-primary mx-0' />
                <span className='font-semibold'>
                  Built with TypeScript for seamless integration in TypeScript projects
                </span>
              </article>

              <article className='flex items-center gap-4 bg-dark border border-solid border-transparent hover:border-primary rounded-md p-4'>
                <IconAdjustments size={50} className='shrink-0 text-primary mx-0' />
                <span className='font-semibold'>
                  Fully customizable with a headless component architecture
                </span>
              </article>

              <article className='flex items-center gap-4 bg-dark border border-solid border-transparent hover:border-primary rounded-md p-4'>
                <IconCode size={50} className='shrink-0 text-primary mx-0' />
                <span className='font-semibold'>Developer-friendly with an intuitive API</span>
              </article>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
