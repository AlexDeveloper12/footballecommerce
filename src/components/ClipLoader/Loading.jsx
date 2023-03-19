import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

function Loading({ loading }) {
    return (
        <ClipLoader
            loading={loading}
            size={150}
            data-testid="loader"
        />
    )

}

export default Loading;
