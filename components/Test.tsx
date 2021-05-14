import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

export function Test(props) {
    const { tint, hoverTint, onTap, size, radius } = props

    return (
        <Frame background="none" size="100%">
            <Frame
                size={size}
                radius={radius}
                center={true}
                background={tint}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                }}
                onTap={onTap}
                whileHover={{
                    scale: 1.25,
                    rotate: 90,
                    background: hoverTint,
                }}
            />
        </Frame>
    )
}

Test.defaultProps = {
    height: 200,
    width: 200,
    size: 200,
    radius: 25,
    tint: "#09F",
    hoverTint: "#07F",
}

addPropertyControls(Test, {
    tint: {
        title: "Tint",
        type: ControlType.Color,
    },
    hoverTint: {
        title: "Hover Tint",
        type: ControlType.Color,
    },
    onTap: {
        type: ControlType.EventHandler,
    },
})