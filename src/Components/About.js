export function About(){

    return(
        <>
        <div className="accordion" id="charEditAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      What is this?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                  >
                    <div className="accordion-body">
                      This is a web-based app, written in React JS, for editing saved-game files from the Dungeons and Dragons "Gold Box" games.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                        What are the Gold Box games?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                  >
                    <div className="accordion-body">
                    The gold box games were a series of video role-playing games created by Strategic Simulations, Inc. in the late 1980s through early 1990s. Although they took place in many different settings throughout the Dungeons and Dragons campaign worlds, all of the games were based on the same engine, which gives us - hackers from the future - the ability to edit many different games with a single app.

                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingMoney">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseMoney"
                      aria-expanded="true"
                      aria-controls="collapseMoney"
                    >
                        How does this editor work?
                    </button>
                  </h2>
                  <div
                    id="collapseMoney"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingMoney"
                  >
                    <div className="accordion-body">
                    The Gold Box games store saved games as character files and inventory files. These are simple binary files, with each byte corresponding to an in-game value. The editor allows you to change the values of specific bytes to produce, if you wish, demi-gods with overpowered weapons and limitless wealth.<br/><br/>The naming formula is the same for all of the games: "CHRDAT"+SAVE GAME LETTER+CHARACTER'S PARTY POSITION. So, for example, the character-save file for the fourth party member of save C of Pool of Radiance would be CHRDATC4.SAV. The inventory-save file for that character would be CHRDATC4.ITM. For Secret of the Silver blades, that file would be CHRDATAC4.STF. The inventory-file extensions change from game to game, but this app takes those differences into account.

                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="true"
                      aria-controls="collapseFour"
                    >
                      Tips
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                  >
                    <div className="accordion-body">
                      Hints and tips
                    </div>
                  </div>
                </div>
                </div>
                </>
    )
}