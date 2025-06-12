import { store } from "@/config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  <Provider store={store}>
    <Component {...pageProps} />;
  </Provider>
}
