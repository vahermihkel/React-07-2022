import { useParams } from "react-router-dom";

function YksikToode() {
  // localhost:3000/toode/Ahtme%20Grossi%20pakiautomaat
  const { nimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
          // 1it postipunkt === Ahtme Grossi pakiautomaat
  const toode = tooted.find(element => element.nimi === nimi);
  // {"ZIP":"96142","NAME":"Ahtme Grossi pakiautomaat","TYPE":"0","A0_NAME":"EE","A1_NAME":"Ida-Viru maakond","A2_NAME":"Kohtla-J\u00e4rve linn","A3_NAME":"Ahtme linnaosa","A4_NAME":"","A5_NAME":"Maleva tn","A6_NAME":"","A7_NAME":"23","A8_NAME":"","X_COORDINATE":"27.420557","Y_COORDINATE":"59.327631","SERVICE_HOURS":"","TEMP_SERVICE_HOURS":"","TEMP_SERVICE_HOURS_UNTIL":"","TEMP_SERVICE_HOURS_2":"","TEMP_SERVICE_HOURS_2_UNTIL":"","comment_est":"","comment_eng":"","comment_rus":"","comment_lav":"","comment_lit":"","MODIFIED":"2021-12-27T06:55:56.800+02:00"}


  return ( 
    <div>
      {toode !== undefined && 
      <div>
        <div>{toode.nimi}</div>
        <div>{toode.hind}</div>
      </div>}
      {toode === undefined && 
      <div>Toodet ei leitud!</div>}
    </div> );
}

export default YksikToode;