import styles from "../../styles/components/input/Input.module.css";

interface IInput {
  onClick?: () => void;
  width?: string;
  height?: string;
  color?: string;
  placeholder: string;
  type?: string;
}

const Input = (props: IInput) => {
  return (
    <input
      className={styles.input}
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      style={{
        width: props.width ? props.width : "30%",
        height: props.height ? props.height : "40px",
        color: props.color ? props.color : "",
      }}
    />
  );
};

export default Input;
