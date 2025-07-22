import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const GenderChart = ({ data }) => {
  const formattedData = Object.entries(data).map(([gender, count]) => ({
    gender,
    count,
  }));

  return (
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ fontSize: "20px", marginBottom: "15px" }}>🧑‍🤝‍🧑 Gender Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <XAxis dataKey="gender" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderChart;
