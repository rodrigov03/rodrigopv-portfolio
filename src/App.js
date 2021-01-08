import Home from './components/Home/'
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

class App extends Component {
  
  render() {
    return (
      <GoogleReCaptchaProvider
        reCaptchaKey="6LeCRSMaAAAAAEHVGeagdi6662c3QICWWR6H_SeJ"
        scriptProps={{
          async: false, // optional, default to false,
          defer: false, // optional, default to false
          appendTo: "body", // optional, default to "head", can be "head" or "body",
        }}
      >
    
        <Home />
      </GoogleReCaptchaProvider>
    );
  }
}

export default App;
