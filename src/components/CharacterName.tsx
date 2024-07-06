/* Dependencies */
import { isKana, toRomaji, toKatakana } from "wanakana";
import Tooltip from "rc-tooltip";

/* Styles */
import "rc-tooltip/assets/bootstrap_white.css";

interface CharacterNameProps {
  characterNativeName: string;
  characterName: string;
}

const CharacterName: React.FC<CharacterNameProps> = ({
  characterName,
  characterNativeName,
}) => {
  const containsKana = isKana(characterNativeName);

  const romajiPronunciation = containsKana
    ? toRomaji(characterNativeName)
    : characterNativeName;

  let tooltipText: string;
  if (!characterNativeName) {
    /*
      If the API does not find a native name for
      character, reverse the name from "Name Surname" to
      "Surname Name" (Japanese naming convention), and convert
      it to Katakana (Japanese naming default for foreign names)
    */
    const reversedName = characterName
      .toLowerCase()
      .split(" ")
      .reverse()
      .join("");
    tooltipText = `Could not find native name for character, using Japanese naming convention and Katakana pronunciation: ${reversedName}`;
    characterNativeName = toKatakana(reversedName);
  } else if (containsKana) {
    tooltipText = `Japanese pronunciation: ${romajiPronunciation}`;
  } else if (characterNativeName === "404") {
    tooltipText = ":(";
  } else {
    tooltipText = "Native name (Japanese)";
  }

  return (
    <>
      {characterName}
      <div>
        (
        <Tooltip
          placement="bottom"
          trigger={["hover", "click"]}
          overlay={<span className="tooltip">{tooltipText}</span>}
          motion={{ motionName: "rc-tooltip-zoom", motionLeave: false }}
        >
          <span className="primary">{characterNativeName}</span>
        </Tooltip>
        )
      </div>
    </>
  );
};

export default CharacterName;
