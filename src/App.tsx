import { HomeView } from './views/HomeView';
//import { WalletView } from './views/wallet/WalletView';
import { Provider } from "react-redux";
import { StateStore } from './utils/sm/StateStore';
import './App.css';



function App() {
  return (
    <div className="App">
       <Provider store={StateStore}>
         <HomeView/>
       </Provider>
    </div>
  );
}

export default App;
