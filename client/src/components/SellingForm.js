import React from 'react';
import '../App.css';
import CategoryFunc from './ListingForm';

function SellingForm() {
    return (
        <>
        <div className="App">
            <div className="App-header" style={{ justifyContent: 'start' }}>
                <CategoryFunc />
            </div>
        </div>
        </>
    );
}

export default SellingForm;