import type { NextPage } from 'next';
// import CodeEditor from '../components/CodeEditor';
import Head from 'next/head';
import CodeEditor from './_components/CodeEditor';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>AI Code Debugger</title>
      </Head>

      <header>
        <h1>AI-Powered Code Assistant</h1>
        <p>Select code and right-click to get AI suggestions</p>
      </header>

      <main>
      <CodeEditor 
        language="javascript" 
        initialCode="console.log('Hello world');" 
        theme="vs-dark" 
        />
        
      </main>
    </div>
  );
};

export default Home;