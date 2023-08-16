import { useTranslation } from "react-i18next";
import SingleItem from "./SingleItem";

function StatisticsTable(props) {
  const { t: text } = useTranslation();
  const { data } = props;

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-x-auto shadow-md rounded-3xl w-3/4">
        <table className="w-full text-sm text-left text-gray-500 mb-64">
          <thead className="text-base text-white uppercase bg-cyanDark">
            <tr>
              <th scope="col" className="px-6 py-3">
                {text("moderatorPostTitle")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorPostCategory")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorDateOfCreation")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorPageViews")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorPercentageViews")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorAvgRating")}
              </th>
              <th scope="col" className="px-6 py-3">
                {text("moderatorTotalComments")}
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">
                  {text("moderatorShowComments")}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((pageStatistics) => (
              <SingleItem key={pageStatistics.id} data={pageStatistics} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatisticsTable;
