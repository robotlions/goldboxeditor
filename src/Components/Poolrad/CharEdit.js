import { InventoryEdit } from "./InventoryEdit"

export function PoolRadMain(){

    return(
        <div className="row">
        <h2 className="mainTitle">Advanced Dungeons and Dragons<br />Pool of Radiance</h2>

            <div className="col-md-6">
                <p>Pool of Radiance Character Edit</p>
            </div>
            <div className="col-md-6">
                <InventoryEdit />
            </div>
            </div>
    )
}