import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import ConfirmDialog from "../components/ConfirmDialog";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirm, setConfirm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      const res = await api.get(`/api/admin/users?page=${page}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch {
      setMessage("Failed to load users");
    }
  };

  const toggleStatus = async (user) => {
    try {
      await api.patch(
        `/api/admin/users/${user._id}/${user.status === "active" ? "deactivate" : "activate"}`
      );
      setMessage("User status updated");
      loadUsers();
    } catch {
      setMessage("Action failed");
    }
    setConfirm(null);
  };

  return (
    <>
      <Navbar />

      <div className="container card">
        <h2>Admin Dashboard</h2>

        {message && <p className="success">{message}</p>}

        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>
                <td>{u.fullName}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td>
                  <button
                    className={u.status === "active" ? "danger" : "primary"}
                    onClick={() => setConfirm(u)}
                  >
                    {u.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Confirmation dialog */}
      {confirm && (
        <ConfirmDialog
          message={`Are you sure you want to ${confirm.status === "active" ? "deactivate" : "activate"} this user?`}
          onConfirm={() => toggleStatus(confirm)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}
