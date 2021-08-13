import React from "react";
import styled from "styled-components";
import PropType from "prop-types";
import { TextInput } from "react-native";

const TextInput = styled.TextInput

const SearchBar = ({onChange, value, onSubmit}) => (
    <TextInput value={value} placeholder={"Search"}/>
);

SearchBar.propTypes = {
    onChange: PropType.func.isRequired,
    value: PropType.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;