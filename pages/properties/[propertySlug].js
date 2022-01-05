import { useRouter } from 'next/router'
import { getProperties, getProperty } from '../../utils/contentful-helper'

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
  return <p>Property: {title}</p>
}

export default Property
