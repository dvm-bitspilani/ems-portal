import { useState } from "react";

const useScores = callback => {
  const [inputs, setInputs] = useState({});

  const handleSubmit = e => {
    e = e.preventDefault() || e;
    callback();
  };

  const handleInputChange = e => {
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default useScores;
