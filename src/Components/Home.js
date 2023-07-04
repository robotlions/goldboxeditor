import poolRadImage from "../assets/images/poolRadCover800.jpg";
import curseImage from "../assets/images/curse800.jpg";
import silverBladesImage from "../assets/images/silverBlades800.jpg";
import podImage from "../assets/images/pod800.jpg";

export function Home() {
  return (
    <div style={{textAlign:"center"}}>
      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={poolRadImage}
              className="img-fluid rounded-start"
              alt="pool of radiance"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Pool of Radiance</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Curse of the Azure Bonds</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={curseImage}
              className="img-fluid rounded-end"
              alt="pool of radiance"
            />
          </div>
        </div>
      </div>

      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={silverBladesImage}
              className="img-fluid rounded-start"
              alt="pool of radiance"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Secret of the Silver Blades</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-3" style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Pools of Darkness</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <img
              src={podImage}
              className="img-fluid rounded-end"
              alt="pool of radiance"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
