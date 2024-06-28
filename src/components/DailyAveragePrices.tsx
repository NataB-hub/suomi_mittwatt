import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface DailyAveragePricesProps {
  startDate: Date;
  endDate: Date;
  data: any;
}

const DailyAveragePrices: React.FC<DailyAveragePricesProps> = ({
  startDate,
  endDate,
  data,
}) => {
  return (
    <>
      <div className="flex w-full items-center justify-center pt-20 text-center text-2xl  text-black">
        Average price from{" "}
        <span className="mx-2 text-green-800">
          {" "}
          {startDate.toDateString()}{" "}
        </span>{" "}
        to{" "}
        <span className="mx-2 text-green-800"> {endDate.toDateString()} </span>
      </div>
      <div className="h-96 w-full px-10">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="price" stroke="#16A34A" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => {
                return value;
              }}
            />
            <YAxis tickCount={10} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex w-full items-center justify-center pl-32 pr-32 pt-10 text-black">
        <table className="min-w-full table-auto border-collapse border border-gray-500 px-10">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="border border-gray-500 px-4 py-2 ">Date</th>
              <th className="border border-gray-500 px-4 py-2 ">
                Average Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item: any, index: number) => (
                <tr key={index} className="bg-green-50">
                  <td className="border border-gray-500 px-4 py-2 text-center">
                    {item.date}
                  </td>
                  <td className="border border-gray-500 px-4 py-2 text-center">
                    {item.price?.toFixed(2) + " c/kWh"}
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={3} className="border border-gray-500 px-4 py-2">
                No data available
              </td>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DailyAveragePrices;
