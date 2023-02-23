import { RecoilRoot } from 'recoil';
import { Provider } from "react-redux";
import { store } from "../redux-store/store";
import Header from '../components/Header'
import '../styles/globals.css'
import Footer from '../components/Footer';


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <RecoilRoot>
      {/* <Header /> */}
      <Component {...pageProps} />
    </RecoilRoot>
    {/* <Footer /> */}
    </Provider>
  );
}

export default MyApp
