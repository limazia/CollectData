import Helmet from "react-helmet";

function Head({ title }) {
  return <Helmet title={title ? `${process.env.REACT_APP_NAME} - ${title}` : process.env.REACT_APP_NAME} />
}

export default Head;