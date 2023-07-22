import poolRadCoverImage from "../assets/images/poolRadCover800.jpg";
import azureCoverImage from "../assets/images/azure800.jpg";
import silverBladesCoverImage from "../assets/images/silverBlades800.jpg";
import podCoverImage from "../assets/images/pod800.jpg";

export function Home() {
  return (
    <div className="row g-1 d-flex justify-content-center" style={{marginTop:"5vh", textAlign:"center"}}>
      <h2 style={{marginBottom:20}}>Online editor for the Advanced Dungeons and Dragons gold box games.</h2>
      <div className="col-md-auto">
        <a href="/poolRad/">
          <img className="coverImage" src={poolRadCoverImage} alt="pool of radiance"/>
          <p className="linkText">Pool of Radiance</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/azure/">
          <img className="coverImage" src={azureCoverImage} alt="curse of the azure bonds"/>
          <p className="linkText">Curse of the Azure Bonds</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/silverblades/">
          <img className="coverImage" src={silverBladesCoverImage} alt="secret of the silver blades"/>
          <p className="linkText">Secret of the Silver Blades</p>
        </a>
      </div>
      <div className="col-md-auto">
        <a href="/pod/">
          <img className="coverImage" src={podCoverImage} alt="pools of darkness"/>
          <p className="linkText">Pools of Darkness</p>
        </a>
      </div>
    </div>

   
  );
}
