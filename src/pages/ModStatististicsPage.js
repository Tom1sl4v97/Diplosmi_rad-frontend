import { useTranslation } from "react-i18next";
import { useFetchContentByEmail } from "../hooks/fetchContent";
import { useSessionStorage, defaultSession } from "../hooks/SessionStorage";

import LoadingCom from "../components/pomocno/LoadingCom";
import Hero from "../components/userSerttingPage/Hero";
import StatisticsTable from "../components/statisticsPage/StatisticsTable";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function ModStatisticsPage() {
  const { t: text } = useTranslation();
  const [session, setSession] = useSessionStorage("userData", defaultSession);
  const { data, loading } = useFetchContentByEmail(session.user.email);

  return (
    <div>
      <Hero text={text("userMenuModStatisticsCSS")} />
      {loading ? (
        <LoadingCom />
      ) : (
        <div>
          <StatisticsTable data={data} />
        </div>
      )}
    </div>
  );
}

export default ModStatisticsPage;
