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
  return (
    <div>
      <input type="text" onChange={(e) => onChangeText(e)} value={inputText} />
      <button onClick={() => onClickButton()}>Search</button>
    </div>
  );
}

export default Search;
