import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name") || "User";
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  const handleTransfer = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/accounts/transfer",
        { to: id, amount: Number(amount) },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      alert("Transfer Successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Transfer Failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border max-w-md p-6 space-y-6 w-96 bg-white shadow-lg rounded-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800">Send Money</h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white font-semibold">{name[0]?.toUpperCase()}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Amount (in Rs)</label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              placeholder="Enter amount"
            />
            <button
              onClick={handleTransfer}
              className="w-full text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Initiate Transfer
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full text-gray-600 hover:underline text-sm text-center block"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}