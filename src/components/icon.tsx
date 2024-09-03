import { memo } from "react";
const Icon = memo(({ styleClass, action, icon, ...rest }:any) => {
    return (
        <span className={styleClass ? `${styleClass} icon` : 'icon'} onClick={(e) => action(e)}>{icon ? icon : ''}</span>
    )
})
export default Icon;