import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from '../src/styles/global'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title> Shapr3D File Converter </title>
        <meta
          name="description"
          content="A simple converter for your .shapr files"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
