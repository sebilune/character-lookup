import { isKana, toRomaji, toKatakana } from "wanakana";
import Tooltip from "rc-tooltip";

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
  let tooltipText: string;

  const romajiPronunciation = containsKana
    ? toRomaji(characterNativeName)
    : characterNativeName;

  if (!characterNativeName) {
    /*
      If the API does not find a native name for
      character, reverse the name from "Name Surname" to
      "Surname Name" (Japanese naming convention), and convert
      it to Katakana (Japanese naming default for foreign names)
    */
    characterNativeName = toKatakana(
      characterName.split(" ").reverse().join("")
    );
    tooltipText = `Could not find native name for character, using Japanese naming convention and Katakana pronunciation: ${toRomaji(
      characterNativeName
    )}`;
  } else if (containsKana) {
    tooltipText = `Japanese pronunciation: ${romajiPronunciation}`;
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
          <span className="primary-highlight">{characterNativeName}</span>
        </Tooltip>
        )
      </div>
    </>
  );
};

export default CharacterName;
