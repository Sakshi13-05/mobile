import React, { useState,useEffect } from 'react';
import axios from "axios";


function CustomerList() {
            const [customers, setCustomers] = useState([]);
            const [loading, setLoading] = useState(true);

            useEffect(() => {
                axios
                    .get("http://localhost:5173/get")
                    .then((res) => {
                        setCustomers(res.data);
                        setLoading(false);
                    })
                    .catch(() => setLoading(false));
            }, []);

            if (loading) return <div>Loading customer data...</div>;

            return (
                <div style={{ marginTop: 40 }}>
                    <h3>Submitted Emergency Requests</h3>
                    {customers.length === 0 ? (
                        <div>No requests found.</div>
                    ) : (
                        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Emergency Type</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((c, idx) => (
                                    <tr key={idx}>
                                        <td>{c.name}</td>
                                        <td>{c.address}</td>
                                        <td>{c.emergencyType}</td>
                                        <td>{c.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            );
        }

        export default CustomerList;
    