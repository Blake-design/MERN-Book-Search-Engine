import gql from "graphql-tag";

export const login_User = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const add_User = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const save_Book = gql`
  mutation saveBook($book: SavedBook!) {
    saveBook(book: $book) {
      _id
      username
      email
      bookCount
      saveBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
export const remove_Book = gql`
  mutation removeBook($bookId:String!) {
    removeBook(bookId:$bookId!) {
        _id
        username
        bookCount
        savedBooks{
            bookId
            title 
            authors
            description 
            image
            link
        }

      
    }
  }
`;
