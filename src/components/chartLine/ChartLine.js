import { Line, Tooltip, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";


const ChartLine = ({ item }) => {
   return (
      <>
         <LineChart
            width={1000}
            height={300}
            data={item}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
         >
            <Line type="monotone" dataKey="percent" stroke="#49e307" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
         </LineChart>
      </>
   )
}

export default ChartLine;