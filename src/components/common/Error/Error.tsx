import React, { useState } from 'react'

type ErrorType = {
    errorText: string | null
}

export const Error = (props: ErrorType) => {
    const [close, setClose] = useState<boolean>(true)
    return (
        <div className="error-wrapper">
            {close && <div className="error">
                <div className="b-title bt14 color1 align-center">{props.errorText}</div>
                <div className="b-title bt14 color1 align-center close" onClick={() => setClose(false)}>X</div>
            </div>}
        </div>
    )
}