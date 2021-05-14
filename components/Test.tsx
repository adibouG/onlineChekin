import * as React from "react"
import { Frame } from "framer"

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
    size: 200,
    radius: 25,
    tint: "#09F",
    hoverTint: "#07F",
}
