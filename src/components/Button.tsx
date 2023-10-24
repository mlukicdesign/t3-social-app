import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

type ButtonProps = {
    small?: boolean
    grey?: boolean
    className?: string;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;


const Button = ({ 
    small = false ,
    grey = false, 
    className="",
    ...props }: ButtonProps) => {

        const sizeClasses = small ? "px-2 py-1": "px-4 py-2 font-bold"
        const colorClasses = grey ? "bg-gray-400 hover:bg-gray-300 focus-visible:bg-gray-300" : "bg-blue-400 hover:bg-blue-400 focus-visible:bg-blue-400"

  return (
    <button className={`rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-white ${sizeClasses} ${colorClasses}`}{...props}>Button</button>
  )
}

export default Button  