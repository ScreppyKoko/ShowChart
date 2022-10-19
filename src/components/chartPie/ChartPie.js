import { PieChart, Pie, Tooltip } from "recharts";


const ChartPie = ({ item }) => {
   return (
      <>
         <PieChart width={400} height={400}>
            <Pie
               dataKey="percent"
               isAnimationActive={false}
               data={item}
               cx={200}
               cy={200}
               outerRadius={80}
               fill="#04dceb"
               label
            />
            <Tooltip />
         </PieChart>
      </>
   )
}

export default ChartPie;