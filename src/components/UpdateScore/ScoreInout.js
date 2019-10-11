let inputs = { 1: { score: "", comments: "" }, 2: { score: "", comments: "" } };

const handleInput = e => {
  e.stopPropagation();
  for (let input of inputs) {
    if (e.target.id === input) {
      // data for this parameter already exists in state
      input[e.target.name] = e.target.value;
      // eslint-disable-next-line no-undef
      setInputs([...inputs]);
    }
  }
  // data for this parameter does not exist
  // create new object for this param
  let data = {score: "", comments: ""};
  data[e.target.name] = e.target.value;
  inputs[e.target.id] = data;

  // eslint-disable-next-line no-undef
  setInputs([...inputs])
};

export default handleInput;
