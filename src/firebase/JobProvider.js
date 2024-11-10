import { db } from "./config";

import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";

export const JobsContext = createContext([]);

export const JobsProvider = ({ children }) => {
  const [posts, setPosts] = useState();
  const [user] = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "job-posts"),
        (querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setPosts(data);
          setInitializing(false);
        }
      );
      return unsubscribe;
    } else {
      setPosts(null);
      setInitializing(false);
    }
  }, [user]);

  if (initializing) {
    return <h2>Loading...</h2>;
  }

  return (
    <JobsContext.Provider value={[posts]}>{children}</JobsContext.Provider>
  );
};
