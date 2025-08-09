const LOCAL_ORIGIN = "http://localhost";
const REMOTE_ORIGIN = "https://netease-cloud-music-api-roan.vercel.app";

export const PORT = 3001;

export const SERVER = process.env.REACT_APP_LOCAL === "true" ? `${LOCAL_ORIGIN}:${PORT}/api` : `${REMOTE_ORIGIN}/`;
export const GRAPHQL_SERVER = process.env.REACT_APP_LOCAL === "true" ? `${LOCAL_ORIGIN}:${PORT}/graphql` : `${REMOTE_ORIGIN}/graphql`;