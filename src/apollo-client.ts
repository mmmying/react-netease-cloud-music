import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GRAPHQL_SERVER } from 'constants/server'

// 创建 HTTP 连接配置
const httpLink = new HttpLink({
  uri: GRAPHQL_SERVER // GraphQL 服务地址
})

// 创建 Apollo 客户端实例
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache() // 创建一个新的内存缓存实例，用于存储查询结果
})

export default client;