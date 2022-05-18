import React from "react";

import Skeleton from "~/components/Partials/Skeleton";

import styles from "./styles.module.css";

function LoadingCompanieList() {
  return (
    <div className={styles.loadingContainer}>
      <Skeleton className={styles.rowSkeleton} />
    </div>
  );
}

export default LoadingCompanieList;
