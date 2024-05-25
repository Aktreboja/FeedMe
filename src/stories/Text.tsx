interface TextProps {
  text: string;
  color: string;
}

const Text = ({ text, ...props }: TextProps) => {
  return (
    <p {...props} className="border">
      {text}
    </p>
  );
};

export default Text;
