import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getTranslations,
  getMessages,
  setRequestLocale,
} from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "@/components/common/header/Navigation";
import PageWrapper from "@/components/common/PageWrapper";
import QueryProvider from "@/providers/QueryProvider";
import "@/app/globals.css";
import { routing } from "@/i18n/routing";
import Footer from "@/components/common/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-host-grotesk)" }}
      >
        <QueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Navigation />
            <div className={`container mx-auto p-4 ${locale === "en" ? "!font-clash":"!font-mersad "}`}>
              <PageWrapper>{children}</PageWrapper>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
