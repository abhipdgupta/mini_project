import React from 'react';
import ReactLoading from 'react-loading';
 
export const Loading = ({ type, color }) => (
    <div className="loader">
        <ReactLoading type={type} color={color} />
    </div>
);
 
