import React, { useEffect } from 'react';

function Head({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${process.env.REACT_APP_NAME} - ${title}`;
    } else {
      document.title = `${process.env.REACT_APP_NAME}`;
    }

    if (description) {
      document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description);
    }
  }, [title, description]);

  return <></>;
}

export default Head;