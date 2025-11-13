import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Master DevOps, CI/CD, Docker, Kubernetes, and Data Structures through interactive animations and visualizations" />
        <meta name="keywords" content="devops, cicd, docker, kubernetes, jenkins, git, data structures, algorithms, programming, education, visualization, animation" />
        <meta name="author" content="DevOpsFlow" />
        <meta property="og:title" content="DevOpsFlow - Master DevOps Through Interactive Learning" />
        <meta property="og:description" content="Learn DevOps, CI/CD, Docker, Kubernetes, and Data Structures through beautiful animations and interactive visualizations" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DevOpsFlow - Master DevOps Through Interactive Learning" />
        <meta name="twitter:description" content="Learn DevOps, CI/CD, Docker, Kubernetes, and Data Structures through beautiful animations and interactive visualizations" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}