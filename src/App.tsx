import { View } from './views/View';
//import { WalletView } from './views/wallet/WalletView';
import { Provider } from "react-redux";
import { StateStore } from './utils/sm/StateStore';
import './App.css';



function App() {
  return (
    <div className="App">
       <Provider store={StateStore}>
         <View/>
       </Provider>
    </div>
  );
}

export default App;
