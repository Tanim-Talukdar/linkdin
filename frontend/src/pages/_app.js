import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </>
    </Provider>
  );
}
