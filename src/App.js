import React from "react";
import Footer from './components/Footer'
import Welcome from './components/MessageComponent'
import Introduction from './components/BodyComponent'
function App() {
  return (
    <div className="App">
        <Welcome/>
        <Introduction/>
        <Footer/>
    </div>
  );
}
export default App