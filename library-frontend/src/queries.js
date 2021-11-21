import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    published
    author
  }
}
`
