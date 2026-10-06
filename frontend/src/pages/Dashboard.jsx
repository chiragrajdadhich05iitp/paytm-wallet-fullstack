import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [balance, setBalance] = useState("0");
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    axios.get("http://localhost:3000/api/v1/accounts/balance", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setBalance(res.data.balance))
    .catch(() => navigate("/signin"));
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:3000/api/v1/users/bulk?filter=${filter}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setUsers(res.data.user || []))
    .catch(() => {});
  }, [filter]);

  return (
    <div>
      {/* Top Navbar */}
      <div className="shadow h-14 flex justify-between items-center px-6 border-b">
        <span className="font-bold text-lg text-indigo-700">Payments Wallet</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { localStorage.removeItem("token"); navigate("/signin"); }}
            className="text-xs text-red-500 hover:underline cursor-pointer"
          >
            Logout
          </button>
          <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-sm font-semibold">
            U
          </div>
        </div>
      </div>

      <div className="m-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-lg border">
          <span className="font-bold text-lg">Your Balance:</span>
          <span className="font-semibold text-lg text-green-600">₹{balance}</span>
        </div>

        <div className="font-bold mt-6 text-xl">Users</div>
        <div className="my-3">
          <input 
            type="text" 
            placeholder="Search users..." 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded border-slate-200 outline-none" 
          />
        </div>

        <div className="space-y-3 mt-4">
          {users.map((u) => (
            <div key={u._id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center font-bold">
                  {u.firstName?.[0]?.toUpperCase()}
                </div>
                <div className="font-medium text-slate-800">
                  {u.firstName} {u.lastName}
                </div>
              </div>
              <button
                onClick={() => navigate(`/send?id=${u._id}&name=${u.firstName}`)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900"
              >
                Send Money
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}