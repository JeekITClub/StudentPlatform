import React from 'react';
import ApolloClient from '../../../../utils/ApolloClient';
import {ApolloProvider} from "react-apollo";
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';

const query = gql`
  {
    students {
      id
      classNum
    }
  }
`

class student {
  classNum: Number
}

const StudentTable: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(query);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.students.map((student: student, index: Number) => (
      <div key={index.toString()}>
        <p>
          {student.classNum}
        </p>
      </div>
    ));
  }

export default StudentTable;