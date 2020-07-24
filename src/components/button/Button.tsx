import React from "react";
import "./Button.scss";

const Button: React.FC<{ label: string, selected: boolean, onClick: () => void }> = ({ label, selected, onClick }) => {
return <button className={"button" +  (selected ? " selected" : "")} onClick={onClick}>{ label }</button>
}

export default Button;