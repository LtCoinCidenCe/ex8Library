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
query AllBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const ME = gql`
query Me {
  me {
    username
    favoriteGenre
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author {
    name
  }
  genres
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
