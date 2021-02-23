import App from 'next/app';
import Head from 'next/head';

import ReactGA from 'react-ga';
import i18n from '../locale/i18n';

class MyApp extends App {

  componentDidMount() {

    // Google Analytics
    if (window.location.protocol == 'https:') {
      ReactGA.initialize('UA-144600342-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    // Configurações Zendesk
    // zE('webWidget', 'setLocale', i18n.language);
    // zE('webWidget', 'updateSettings', {
    //   webWidget: {
    //     contactForm: {
    //       attachments: false
    //     }
    //   }
    // });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title></title>
          <meta httpEquiv="content-language" content={i18n.language} />
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta charSet="utf-8" />
          <meta name="robots" content="index,follow" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,600,700,900&display=swap" />
          <script type="text/javascript" id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=6e3baeef-8c2d-40e3-bbba-056efb4ad4ac" />
          <script src="/static/charting_library/charting_library.min.js" /> 
          <script src="/static/datafeeds/udf/dist/polyfills.js" />    
					<script src="/static/datafeeds/udf/dist/bundle.js" />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

export default MyApp;