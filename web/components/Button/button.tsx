import styles from "../../styles/components/button/Button.module.css";

interface IButton {
  onClick?: () => void;
  width?: string;
  height?: string;
  text: string;
  backgroundColor: string;
  color?: string;
  center?: boolean;
}

const Button = (props: IButton) => {
  return (
    <div
      style={{
        width: props.width ? props.width : "40%",
        height: props.height ? props.height : "50px",
        backgroundColor: props.backgroundColor,
        color: props.color ? props.color : "",
        margin: props.center ? "0 auto" : "",
      }}
      onClick={props.onClick}
      className={styles.buttonContainer}
    >
      {props.text}
    </div>
  );
};

export default Button;
