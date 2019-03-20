import React from 'react';
import ApolloClient from '../../../../utils/ApolloClient';
import {ApolloProvider} from "react-apollo";
import gql from "graphql-tag";

class StudentTable extends React.Component {
    componentDidMount() {
        ApolloClient
            .query({
                query: gql`
      {
  students {
    id
  }
}
    `
            })
            .then(result => console.log(result));
    }

    render() {
        return (
            <ApolloProvider client={ApolloClient}>
                <div>
                    <h2>My first Apollo app 🚀</h2>
                </div>
            </ApolloProvider>
        )
    }
}

export default StudentTable;