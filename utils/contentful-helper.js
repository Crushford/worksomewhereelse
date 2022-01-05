import { GraphQLClient, gql } from 'graphql-request'

export const getProperties = async () => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CDA_TOKEN}`
    }
  })

  const query = gql`
    {
      propertiesCollection {
        items {
          sys {
            id
          }
          title
          urlSlug
        }
      }
    }
  `

  const {
    propertiesCollection: { items: properties }
  } = await graphQLClient.request(query)
  return properties
}

export const getProperty = async urlSlug => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.SPACE_ID}`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CDA_TOKEN}`
    }
  })

  const query = gql`
    query getProperty($urlSlug: String!) {
      propertiesCollection(where: { urlSlug: $urlSlug }) {
        items {
          title
          description {
            json
          }
          heroImage {
            url
          }
          workspaceImage {
            url
          }
          bookingLink
          bookingLinkText
          referralLink
          referralLinkText
        }
      }
    }
  `

  const {
    propertiesCollection: {
      items: [property]
    }
  } = await graphQLClient.request(query, { urlSlug })
  return property
}
