import { ButtonHTMLAttributes } from "react"

enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Standard = "standard"
}

type UIButtonProps = {
  variant? : ButtonTypes
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({variant, ...props} : UIButtonProps) => {
  let additionalStyles = ""

  if (variant === ButtonTypes.Primary) additionalStyles = "h-[50px] sm:h-[70px] bg-primary"
  if (variant === ButtonTypes.Secondary) additionalStyles = "h-[50px] bg-primary"
  if (variant === ButtonTypes.Standard) additionalStyles = ""
  return <button
  {...props} 
  className={`flex justify-center items-center ${additionalStyles} ${props.className}`} >
    {props.children}
  </button>
}

export const UIButton = {
  Primary: (props : UIButtonProps) => (<Button variant={ButtonTypes.Primary} {...props} />),
  Secondary: (props : UIButtonProps) => (<Button variant={ButtonTypes.Secondary} {...props} />),
  Standard: (props : UIButtonProps) => (<Button variant={ButtonTypes.Standard} {...props} />)
}
