export default function Button({children, isText, ...props}) {
    const cssClass = isText ? 'text-button' : 'button';
    return (
        <button className={cssClass} {...props}>{children}</button>
    )
}