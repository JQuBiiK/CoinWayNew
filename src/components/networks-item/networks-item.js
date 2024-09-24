import './networks-item.css';
import React from "react";

function NetworksItem({ networkName, projectCount, isActive, onClick }) {
    return (
        <div data-net={networkName} className={`filter-popup-value-item ${isActive ? 'active' : ''}`} onClick={onClick}>
            <div className="filter-popup-value-item-img">
                <img src="network-image-url" alt={ '' /*{networkName}*/} />
            </div>
            <div className="filter-popup-value-item-text">{networkName}</div>
            <div className="filter-popup-value-item-count">{projectCount || 0}</div>
        </div>
    );
}

export default NetworksItem;
