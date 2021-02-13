import React from 'react';

function Search({ onSearch }) {
  const [inputText, setInputText] = React.useState('');
  const onChangeText = (e) => {
    setInputText(e.target.value);
  };
  const onClickButton = () => {
    onSearch(inputText);
    setInputText('');
  };
  const onInputSubmit = (e) => {
    if (e.key === 'Enter') {
      onClickButton();
    }
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChangeText(e)}
        value={inputText}
        onKeyPress={(e) => onInputSubmit(e)}
      />
      <button onClick={() => onClickButton()}>Search</button>
    </div>
  );
}

export default Search;
