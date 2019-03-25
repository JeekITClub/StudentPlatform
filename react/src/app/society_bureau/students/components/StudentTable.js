import React from 'react';
import gql from "graphql-tag";
import {Query} from "react-apollo";

class StudentTable extends React.Component {
    render() {
        const query = gql`{students {id, name, classNum}}`;
        return (
            <Query query={query}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;

                    return data.students.map(({ id }) => (
                        <div key={id}>
                            <p>{id}</p>
                        </div>
                    ));
                }}
            </Query>
        )
    }
}

export default StudentTable;