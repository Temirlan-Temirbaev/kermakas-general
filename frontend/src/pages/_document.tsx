import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Kermakas</title>
        <link rel="icon" href="logo.png"  />
        <meta name="description" content="Kermakas - поставщик качественных сэндвич панелей в Алматы. Предлагаем кровельные и стеновые сэндвич панели по доступным ценам от производителя. Звоните +77077210555 или пишите на kermakas@mail.ru." />
        <meta name="keywords" content="сэндвич панели, сэндвич панели алматы, кровельные сэндвич панели, кровельные сэндвич панели алматы, стеновые сэндвич панели, стеновые сэндвич панели алматы, качественные сэндвич панели, качественные сэндвич панели алматы, поставщик сэндвич панелей, поставщик сэндвич панелей алматы" />
        <meta name="author" content="Kermakas" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        </Head>
      <body className="max-w-[100vw] overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
