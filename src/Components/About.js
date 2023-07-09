export function About() {
  return (
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
              This is a web-based app, written in React JS, for editing
              saved-game files from the Dungeons and Dragons "Gold Box" games.
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
              The gold box games were a series of video role-playing games
              created by Strategic Simulations, Inc. in the late 1980s through
              early 1990s. Although they took place in many different settings
              throughout the Dungeons and Dragons campaign worlds, all of the
              games were based on the same engine, which gives us - hackers from
              the future - the ability to edit many different games with a
              single app.
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
              The Gold Box games store saved games as character files and
              inventory files. These are simple binary files, with each byte
              corresponding to an in-game value. The editor allows you to change
              the values of specific bytes to produce, if you wish, demi-gods
              with overpowered weapons and limitless wealth.
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
              <ul>
                <li>Back up your files.</li>
                <li>
                  Pushing certain values too far will break the game because it
                  isn't programmed to automatically scale values. Rather, the
                  game uses the original AD&D tables. For example, character
                  ability scores in AD&D max out at 18. If you give your
                  character an 85 charisma, the game has no way to reconicile
                  that number, because it's not on the original tables.
                </li>
                <li>
                  To make a character's strength 18(00), set it to 18(100).
                </li>
                <li>
                  Most of the values can't exceed 255, unless they're obviously
                  meant to be large numbers, such as experience and wealth.
                </li>
                <li>
                  Although this editor provides checkboxes for cleric spells,
                  there's no way to pick and choose cleric spells for any
                  character. In AD&D, if a character has access to a clerical
                  spell level, that character automatically knows all the spells
                  of that level.
                </li>
                <li>
                  Magic-user spells, however, can be assigned one-at-a-time.
                  Which leads to:
                </li>
                <li>
                  If you want to give a non-magic-user character access to
                  magic-user spells, you don't have to multi-class the character
                  in the game. Simply use the editor to assign magic-user levels
                  to that character. The game won't automatically change the
                  character's class, but that character will be able to use
                  magic-user spells.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
