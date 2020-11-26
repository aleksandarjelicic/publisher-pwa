import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { isCached } from "../../services/cacheService";
import Store from "../Store";

const LinkOffline = ({ href, children, ...otherProps }) => {
  const store = useContext(Store);

  const [_isCached, setCached] = useState(false);

  useEffect(() => {
    if (!store.isOnline) {
      isCached(href).then((res) => {
        setCached(res);
      });
    }
  }, [store.isOnline]);

  const isUnavailable = !_isCached && !store.isOnline;

  return isUnavailable ? (
    <div className="unavailableOffline">{children}</div>
  ) : (
    <Link href={href} {...otherProps}>
      {children}
    </Link>
  );
};

export default LinkOffline;
