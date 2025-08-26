import "./App.css";
import OrderList from "./components/OrderList";
import { useSummary } from "./hooks/useSummary";

function App() {
  const { data: summary, isLoading } = useSummary();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-600 text-white">
      <div className="font-bold grid grid-cols-4 p-2 border-b">
        <h3 className="text-2xl">Order Summary</h3>
        <p className="text-right">
          Total Revenue:{" "}
          <span className="text-green-500 font-light">
            {summary.totalRevenue}
          </span>
        </p>
        <p className="text-right">
          Median Order Price:{" "}
          <span className="text-green-500 font-light">
            {summary.medianOrderPrice}
          </span>
        </p>
        <p className="text-right">
          Top Product:{" "}
          <span className="text-green-500 font-light">
            {summary.topProductByQty}
          </span>
        </p>
      </div>

      <OrderList />

      {/* <OrderForm onAdded={() => window.location.reload()} /> */}
    </div>
  );
}

export default App;
