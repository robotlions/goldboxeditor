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
              <strong>What is this?</strong>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
          >
            <div className="accordion-body">
              This is a web-based app, written in React JS, for editing
              saved-game files from the Dungeons and Dragons "gold box" games.
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
              <strong>What are the gold box games?</strong>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
          >
            <div className="accordion-body">
              The gold box games were a series of role-playing games created by
              Strategic Simulations, Inc. in the late 1980s through early 1990s.
              All the games were based on the same engine, which gives
              us&mdash;hackers from the future&mdash;the ability to edit many
              different games with a single app.
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
              <strong>How does this editor work?</strong>
            </button>
          </h2>
          <div
            id="collapseHow"
            className="accordion-collapse collapse"
            aria-labelledby="headingHow"
          >
            <div className="accordion-body">
              The games store a character as one file and that character's
              inventory as another. These are simple binary files, with each
              byte corresponding to an in-game value. The editor allows you to
              change the values of specific bytes to produce, if you wish,
              demi-gods with overpowered weapons and limitless wealth.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingWho">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseWho"
              aria-expanded="true"
              aria-controls="collapseWho"
            >
              <strong>Who are you? How'd you get in here?</strong>
            </button>
          </h2>
          <div
            id="collapseWho"
            className="accordion-collapse collapse"
            aria-labelledby="headingWho"
          >
            <div className="accordion-body">
              I'm a locksmith. And I'm a locksmith.
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
              <strong>Tips</strong>
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
                  This app edits only character and inventory files. Each save
                  also requires a .DAT save file to store game variables such as
                  the party's current location.
                </li>
                <li>
                  Pushing certain values too far will break the game, especially
                  if the value depends on an AD&D reference table. For example,
                  character ability scores in AD&D max out at 18. If you give
                  your character an 85 charisma, the game doesn't know how to
                  handle that number because it's not on the original tables.
                </li>
                <li>
                  Most of the values can't exceed 255, unless they're obviously
                  meant to be large numbers, such as experience and wealth.
                </li>
                <li>
                  As noted in the character editor, certain values&mdash;such as
                  saving throws and thief skills&mdash;come directly from the
                  AD&D tables and are determined by the character's level and
                  modifiers. These values are set by the game automatically on
                  load. So even though you can change these values with this
                  editor, the game will reset them to their "correct" values.
                </li>
                <li>
                  Where possible, the integer input fields have minimum and
                  maximum values. But those are easy to get around, and it's
                  your game to break.
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
                  Each item has three slots for special effects. For the most
                  part these don't do anything, however:
                </li>
                <li>
                  For wands, the "Effect1(charges)" field determines how many
                  times the wand can be used before its magic is depleted.
                </li>
                <li>
                  For scrolls, the "Effect1(charges)" field determines which
                  spell the scroll contains. The spell is determined by an
                  integer that will vary from game to game. Effect2 is the
                  scroll's second spell and Effect3 is the third spell.
                </li>
                <li>
                  Arrows, darts and certain other items can be assigned an{" "}
                  <em>ammo</em> number. This gives a single item multiple uses without taking
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
              <strong>FAQ</strong>
            </button>
          </h2>
          <div
            id="collapseFaq"
            className="accordion-collapse collapse"
            aria-labelledby="headingFaq"
          >
            <div className="accordion-body">
              <em>Why only four of the gold box games?</em>
              <p>
                These four seemed like the logical place to start. More to come.
              </p>
              <br />
              <em>Why now? Why not thirty-five years ago?</em>
              <p>
                Because I was in middle school and I wasn't a web developer and
                I didn't know JavaScript and JavaScript didn't exist.
              </p>
              <br />
              <em>Is the source code available?</em>
              <p>
                <a href="https://github.com/robotlions/goldboxeditor">
                  Absolutely.
                </a>
              </p>
              <em>Why, these gold box games sound delightful! Where might I acquire them?</em>
              <p>
                Gog.com has several collections of the various D&D games, but <a href="https://www.gog.com/en/game/forgotten_realms_the_archives_collection_two">Forgotten Realms - The Archives: Collection Two</a> is the one to start with.
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingContact">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseContact"
              aria-expanded="true"
              aria-controls="collapseContact"
            >
              <strong>Contact</strong>
            </button>
          </h2>
          <div
            id="collapseContact"
            className="accordion-collapse collapse"
            aria-labelledby="headingContact"
          >
            <div className="accordion-body">
              <p>
                Did something not work right? Have a suggestion? Want to chat
                about D&D or the joys of cheating at 35-year-old games?
              </p>
              <p>
                You can reach me at "info <em>-at symbol-</em> robotlions.com".
              </p>
              <p>
                My main site is{" "}
                <a href="https://chadmusick.com">chadmusick.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingCredits">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseCredits"
              aria-expanded="true"
              aria-controls="collapseCredits"
            >
              <strong>Credits</strong>
            </button>
          </h2>
          <div
            id="collapseCredits"
            className="accordion-collapse collapse"
            aria-labelledby="headingCredits"
          >
            <div className="accordion-body">
              <p>
                <em>Dungons and Dragons™</em> © Wizards of the Coast
              </p>
              <p>
                <em>Advanced Dungeons and Dragons™</em> © Wizards of the Coast
              </p>
              <p>All cover art © Wizards of the Coast, I assume.</p>
              <p>
                <em>Pool of Radiance</em> and <em>Curse of the Azure Bonds</em>{" "}
                cover art by{" "}
                <a href="https://clydecaldwell.com/">Clyde Caldwell</a>
              </p>
              <p>
                <em>Secret of the Silver Blades</em> cover art by{" "}
                <a href="https://larryelmore.com/store/">Larry Elmore</a>
              </p>
              <p>
                <em>Pools of Darkness</em> cover art by{" "}
                <a href="https://www.keithparkinson.com/artwork/">
                  Keith Parkinson
                </a>
                .
              </p>
              <p>
                Thanks and admiration go to Joonas Hirvonen for his
                mind-boggling work on{" "}
                <a href="https://www.gbc.zorbus.net/">Gold Box Companion</a>.
                Seriously, if you're into these games, install GBC. It's the
                gold standard of gold box.
              </p>
              <p>
                Also, massive credit to{" "}
                <a href="https://gamefaqs.gamespot.com/community/ssjlee9">
                  Stephen S. Lee
                </a>{" "}
                for his comprehensive game guides, which were indespensible for
                figuring out hex values.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
