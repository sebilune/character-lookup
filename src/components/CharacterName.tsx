import { isKana, toRomaji, toKatakana } from "wanakana";

interface CharacterNameProps {
  characterNativeName: string;
  characterName: string;
}

const CharacterName: React.FC<CharacterNameProps> = ({
  characterName,
  characterNativeName,
}) => {
  const containsKana = isKana(characterNativeName);
  let titleText: string;

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
    titleText = `Could not find native name for character, using Japanese naming convention and Katakana pronunciation: ${toRomaji(
      characterNativeName
    )}`;
  } else if (containsKana) {
    titleText = `Japanese pronunciation: ${romajiPronunciation}`;
  } else {
    titleText = "Native name (Japanese)";
  }

  return (
    <>
      {characterName}
      <div>
        (
        <span title={titleText} className="primary-highlight">
          {characterNativeName}
        </span>
        )
      </div>
    </>
  );
};

export default CharacterName;
