import React from "react";

const Compose = (...Providers) => (Child) => (props) => (
  Providers.reduce((acc, Provider) => (
    <Provider>
      {acc}
    </Provider>
  ), <Child {...props} />)
)
  
export default Compose;