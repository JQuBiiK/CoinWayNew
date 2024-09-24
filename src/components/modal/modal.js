import './modal.css';
import NetworksItem from "../networks-item/networks-item";
import { useState } from "react";

function Modal({ isOpen, onClose, onFilter, networks }) {
    const [selectedNetworks, setSelectedNetworks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleNetworkSelect = (networkId) => {
        setSelectedNetworks((prevSelected) =>
            prevSelected.includes(networkId)
                ? prevSelected.filter(id => id !== networkId)
                : [...prevSelected, networkId]
        );
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(selectedNetworks); // Передача выбранных сетей для фильтрации
        onClose(); // Закрытие модального окна
    };

    const filteredNetworks = networks.filter(network =>
        network.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`filter-popup-bg ${isOpen ? 'active' : ''}`} onClick={onClose}>
            <div className={`filter-popup ${isOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
                <button className="filter-popup-close" onClick={onClose}>×</button>
                <form onSubmit={handleSubmit}>
                    <div className="filter-popup-input-block">
                        <input
                            autoComplete="off"
                            type="search"
                            placeholder="Search"
                            className="filter-popup-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="filter-popup-value-block">
                        {filteredNetworks.map(network => (
                            <NetworksItem
                                key={network.id}
                                networkName={network.name}
                                projectCount={network.projectCount}
                                isActive={selectedNetworks.includes(network.id)}
                                onClick={() => handleNetworkSelect(network.id)}
                            />
                        ))}
                    </div>
                    <div className="filter-popup-actions">
                        <button type="button" className="filter-popup-reset" onClick={() => setSelectedNetworks([])}>Сбросить</button>
                        <button type="submit" className="filter-popup-accept">Готово</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
