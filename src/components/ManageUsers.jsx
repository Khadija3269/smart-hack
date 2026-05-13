import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { getUsersWithStatus, setUserStatus, deleteUser, refreshUsers } from "@/lib/store";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const refresh = () => setUsers(getUsersWithStatus());
  useEffect(() => { refreshUsers().finally(refresh); }, []);

  const statusColor = (s) => (s === "Active" ? "text-green-600" : "text-red-600");

  const handleDelete = (email) => {
    if (!confirm("Delete this user?")) return;
    deleteUser(email);
    refresh();
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader active="dashboard" />

      <header className="bg-[#a8c5e8] px-6 py-4 flex items-center justify-between">
        <h1 className="text-[#1f3a68] text-xl font-bold">Manage Users</h1>
        <Link to="/admin-dashboard" className="text-[#1f3a68] text-2xl">←</Link>
      </header>

      <main className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-[1fr_1fr_1fr_140px] bg-[#5B8FCF] text-white font-bold text-center rounded-lg p-3 mb-4">
          <div>Name</div><div className="border-x border-white">Role</div><div>Status</div><div></div>
        </div>

        {users.length === 0 && (
          <p className="text-center text-gray-500 py-10">No registered users yet.</p>
        )}

        <div className="space-y-3">
          {users.map((u) => (
            <div key={u.email} className="grid grid-cols-[1fr_1fr_1fr_140px] items-center bg-[#cfe0f3] rounded-lg p-4 text-center font-semibold">
              <div>
                <div>{u.fullName}</div>
                <div className="text-xs text-gray-600 font-normal">{u.email}</div>
              </div>
              <div className="capitalize">{u.role}</div>
              <div className={`${statusColor(u.status)} font-bold`}>{u.status}</div>
              <div className="flex flex-col gap-1.5 items-center">
                {u.status === "Pending" &&
                  ["judge", "mentor", "organizer"].includes(u.role) && (
                    <>
                      <button
                        onClick={() => {
                          setUserStatus(u.email, "Active");
                          refresh();
                        }}
                        className="bg-green-600 text-white rounded w-28 py-1 text-sm mb-1"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          setUserStatus(u.email, "Rejected");
                          refresh();
                        }}
                        className="bg-red-600 text-white rounded w-28 py-1 text-sm mb-1"
                      >
                        Reject
                      </button>
                    </>
                  )}
                <button onClick={() => { setUserStatus(u.email, "Blocked"); refresh(); }} className="bg-[#5B8FCF] text-white rounded w-24 py-1 text-sm">Block</button>
                <button onClick={() => { setUserStatus(u.email, "Active"); refresh(); }} className="bg-green-600 text-white rounded w-24 py-1 text-sm">Activate</button>
                <button onClick={() => handleDelete(u.email)} className="bg-red-600 text-white rounded w-24 py-1 text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}


export default ManageUsersPage;
