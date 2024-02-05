"use client";

import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};

export default function NoSSR({ children }: Props) {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted ? <>{children}</> : null;
}
