const Button: (props: React.HTMLProps<HTMLButtonElement>) => JSX.Element = (props: React.HTMLProps<HTMLButtonElement>): JSX.Element => {
  return (
    <button>
      { props.value }
    </button>
  )
}

export default Button