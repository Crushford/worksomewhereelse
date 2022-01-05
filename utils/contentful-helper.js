import { GraphQLClient, gql } from 'graphql-request'

const graphQlRequest = (query, variables = {}) => {
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
    }
  })

  return graphQLClient.request(query, variables)
}

export const getProperties = async () => {
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
  } = await graphQlRequest(query)
  return properties
}

export const getProperty = async urlSlug => {
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
  } = await graphQlRequest(query, { urlSlug })
  return property
}
