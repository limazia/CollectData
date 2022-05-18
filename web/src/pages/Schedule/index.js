import React, { useState, useLayoutEffect } from "react";

import { Head, Navbar, Loading, Calendar } from "~/components";

function Schedule() {
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Head title="Agenda" />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <Calendar />
          </div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
