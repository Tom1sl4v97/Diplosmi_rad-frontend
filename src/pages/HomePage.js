import { useFetchContent } from "../hooks/fetchContent";

import HomePageTitle from "../components/homepage/Title";
import HomePagePrvaSlika from "../components/homepage/PrvaSlika";
import LoadingCom from "../components/pomocno/LoadingCom";
import FullContent from "../components/homepage/FullContent";

function HomePage(props) {
  const { loadingData, data } = useFetchContent();

  if (props && props.location) {
    let userData = props.location.state;
    console.log("UserData nakon login-a: " + userData);
  }

  if (!loadingData) {
    var najnovijiDatum = new Date(
      Math.max.apply(
        null,
        data.map((e) => {
          return new Date(e.dateOfCreation);
        })
      )
    );
    var najnovijiPostovi = data.filter((e) => {
      var d = new Date(e.dateOfCreation);
      return d.getTime() === najnovijiDatum.getTime();
    })[0];
  }

  if (!loadingData) {
    var otherData = data.filter((item) => {
      return item.id !== najnovijiPostovi.id;
    });
  }

  return (
    <>
      <HomePageTitle />
      {loadingData ? (
        <LoadingCom />
      ) : (
        <>
          <HomePagePrvaSlika najnovijiPost={najnovijiPostovi} />
          <FullContent contentData={otherData} />
        </>
      )}
    </>
  );
}

export default HomePage;
