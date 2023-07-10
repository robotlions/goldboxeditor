export function About() {
  return (
    <div className="row" style={{ marginBottom: 100 }}>
      <div
        style={{ marginTop: 20 }}
        className="accordion"
        id="charEditAccordion"
      >
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
          <h2 className="accordion-header" id="headingHow">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseHow"
              aria-expanded="true"
              aria-controls="collapseHow"
            >
              How does this editor work?
            </button>
          </h2>
          <div
            id="collapseHow"
            className="accordion-collapse collapse"
            aria-labelledby="headingHow"
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
                  Most of the values can't exceed 255, unless they're obviously
                  meant to be large numbers, such as experience and wealth.
                </li>
                <li>
                  As noted in the character editor, certain values - such as
                  saving throws and thief skills - come directly from the AD&D
                  tables and are determined by the character's level and
                  modifiers. These values are set by the game automatically on
                  load. So even though you can change these values with this
                  editor, the game will reset them to their "correct" values.
                </li>
                <li>
                  Where possible, the integer input fields have minimum and
                  maximum values. But those are super easy to get around, so
                  have fun.
                </li>
                <br />
                <h4>Tips for editing characters</h4>
                <li>
                  To make a character's strength 18(00), set it to 18(100).
                </li>

                <li>
                  Although this editor provides checkboxes for cleric spells,
                  there's no way assign a character a specific cleric spell. In
                  AD&D, if a character has access to a clerical spell level,
                  that character automatically knows all the spells of that
                  level.
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
                <br />
                <h4>Tips for editing inventory</h4>
                <li>
                  Unlike characters, inventory items can't be named just any
                  string of text. They must be renamed by selecting from the
                  dropdown menus of pre-programmed descriptors.
                </li>
                <li>
                  For wands, the "charges" field determines how many times the
                  wand can be used before its magic is depleted.
                </li>
                <li>
                  For scrolls, the "charges" field determines which spell the
                  scroll contains. The spell is determined by an integer that
                  will vary from game to game.
                </li>
                <li>
                  Arrows, darts and certain other items can be given an "ammo"
                  number. This gives a single item multiple uses without taking
                  up another inventory slot. This is not the same as duplicating
                  an item. In other words, assigning ammo to a sword won't make
                  multiple copies of that sword.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFaq">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFaq"
              aria-expanded="true"
              aria-controls="collapseFaq"
            >
              FAQ
            </button>
          </h2>
          <div
            id="collapseFaq"
            className="accordion-collapse collapse"
            aria-labelledby="headingFaq"
          >
            <div className="accordion-body">
              <em>Why only four of the Gold Box games?</em>
              <p>
                These four seemed like the logical place to start. More to come.
              </p>
              <br />
              <em>Why now? Why not thirty-five years ago?</em>
              <p>
                Because I was in middle school and wasn't a web developer and
                didn't know JavaScript and JavaScript didn't exist.
              </p>
              <br />
              <em>Is the source code available?</em>
              <p>
                <a href="https://github.com/robotlions/goldboxeditor">
                  Absolutely.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
