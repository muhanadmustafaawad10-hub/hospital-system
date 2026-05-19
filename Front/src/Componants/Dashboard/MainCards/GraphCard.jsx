import React from "react";
import {
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

// const data = [
//   { month: "feb", value: 10 },
//   //   { month: "nov", value: 40 },
//   { month: "april", value: 80 },
//   { month: "april", value: 20 },
//   { month: "april", value: 33 },
// ];
const GraphCard = ({ allData }) => {
  const data = allData["Doctors"]?.map((ele) => {
    const filterd = allData["Appointments"].filter((i) => {
      return i.doctor === ele.name;
    });
    return { name: ele.name, num: filterd.length };
  });

  console.log(data);

  return (
    <div className="theSecond graphCard col-lg-5 pt-0  bg-white pt-0 p-0">
      <h5 className="activ pb-3 pt-3 ps-3 pe-3">Revenue overview</h5>
      <div className="graph mt-3  ps-2 pe-2">
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2383e9" stopOpacity={3.45} />
                <stop offset="100%" stopColor="#2383e9" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Area
              type="monotone"
              dataKey="num"
              stroke="#3f6fa8"
              fill="url(#colorValue)"
            />

            <Line type="monotone" dataKey="num" stroke="#5b8cc9" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphCard;
