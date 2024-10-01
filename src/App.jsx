import "./App.scss";
import Calendar from "./components/Calendar/Calendar";
import HorizontalMenu from "./components/HorizontalMenu/HorizontalMenu";
import VerticalMenu from "./components/VerticalMenu/VerticalMenu";

function App() {
  return (
    <div className="main-container">
      <VerticalMenu />
      <div className="content-container">
        <HorizontalMenu />

        <div className="content">
          <h1 className="title">Calendar</h1>
          <Calendar/>
        </div>
      </div>
    </div>
  );
}

export default App;
