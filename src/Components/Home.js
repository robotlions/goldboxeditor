import poolRadImage from "../assets/images/poolRadCover800.jpg";
import curseImage from "../assets/images/curse800.jpg";
import silverBladesImage from "../assets/images/silverBlades800.jpg";
import podImage from "../assets/images/pod800.jpg";

export function Home() {
  return (
    <div className="row g-1 d-flex justify-content-center" style={{marginTop:"5vh", textAlign:"center"}}>
      <div className="col-md-auto">
        <a href="/poolRad">
          <img className="coverImage" src={poolRadImage} alt="pool of radiance"/>
          <p className="linkText">Pool of Radiance</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/azure">
          <img className="coverImage" src={curseImage} alt="curse of the azure bonds"/>
          <p className="linkText">Curse of the Azure Bonds</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/silverblades">
          <img className="coverImage" src={silverBladesImage} alt="secret of the silver blades"/>
          <p className="linkText">Secret of the Silver Blades</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/pod">
          <img className="coverImage" src={podImage} alt="pools of darkness"/>
          <p className="linkText">Pools of Darkness</p>
        </a>
      </div>
    </div>

   
  );
}
