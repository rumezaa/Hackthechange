import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { UserProvider } from "@/firebase/UserProvider";
import { auth } from "@/firebase/config";
import { useState, useEffect } from "react";
export default function App({ Component, pageProps }) {
  const router = useRouter();

  const noLayoutPages = ["/"];
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div>
      loading..
    </div>; // or a loading spinner
  }

  return (
    <>
      <UserProvider>
        {noLayoutPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </UserProvider>
    </>
  );
}
