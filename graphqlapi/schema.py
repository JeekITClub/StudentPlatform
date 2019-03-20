from graphqlapi.query import Query
import graphene

schema = graphene.Schema(query=Query)
