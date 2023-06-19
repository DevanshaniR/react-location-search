import { BrowserRouter as Router, Route } from "react-router-dom";
import Locations from './views/locations';


function App() {
  return (
    <Router>
      <Route path="/" exact component={Locations} />
    </Router>
  );
}
export default App;
