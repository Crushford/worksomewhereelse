import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { getProperties, getProperty } from '../../utils/contentful-helper'
import styles from '../../styles/Property.module.css'

// This function gets called at build time
export const getStaticPaths = async () => {
  const properties = await getProperties()
  const paths = properties.map(({ urlSlug }) => ({
    params: { propertySlug: urlSlug }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params: { propertySlug } }) => {
  const property = await getProperty(propertySlug)
  return {
    props: { property }
  }
}

const Property = ({
  property: {
    title,
    description,
    heroImage,
    workspaceImage,
    bookingLink,
    bookingLinkText,
    referralLink,
    referralLinkText
  }
}) => {
  return (
    <div className={styles.home}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.home}>Work Somewhere Else </a>
        </Link>
      </nav>

      <h1 className={styles.title}>{title}</h1>
      {heroImage.url && (
        <Image
          src={heroImage.url}
          alt="hero image of property"
          width={540}
          height={360}
        />
      )}

      <div className={styles.links}>
        <a href={bookingLink}>
          <button className={styles.button}>{bookingLinkText}</button>
        </a>
        <a href={referralLink}>
          <button className={styles.button}>{referralLinkText}</button>
        </a>
      </div>
    </div>
  )
}

export default Property
