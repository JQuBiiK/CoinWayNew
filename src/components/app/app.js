import AppHeader from "../app-header/app-header";
import AppSlider from "../app-slider/app-slider";
import AppFilter from "../app-filter/app-filter";
import ProjectList from "../projects-list/project-list";
import AppNavigation from "../app-navigation/app-navigation";
import Modal from "../modal/modal";
import './app.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [tags, setTags] = useState({});
    const [sliderTags, setSliderTags] = useState([]);
    const [modalNetworks, setModalNetworks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Получение проектов
    useEffect(() => {
        axios.get('http://localhost:5000/projects')
            .then(response => {
                setProjects(response.data);
                setFilteredProjects(response.data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }, []);

    // Получение тегов
    useEffect(() => {
        axios.get('http://localhost:5000/project-tags')
            .then(response => {
                const tagsMap = {};
                response.data.forEach(tagData => {
                    tagsMap[tagData.project_id] = tagData.tags;
                });
                setTags(tagsMap);
            })
            .catch(error => {
                console.error('Error fetching project tags:', error);
            });
    }, []);

    // Получение тегов для слайдера
    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(response => {
                setSliderTags(response.data);
            })
            .catch(error => {
                console.error('Error fetching slider tags:', error);
            });
    }, []);

    // Получение сетей
    useEffect(() => {
        axios.get('http://localhost:5000/networks')
            .then(response => {
                setModalNetworks(response.data);
            })
            .catch(error => {
                console.error('Error fetching networks:', error);
            });
    }, []);

    // Открытие модального окна
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Закрытие модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Фильтрация проектов по сети
    const handleFilterProjects = (selectedNetworks) => {
        if (selectedNetworks.length === 0) {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(project =>
                selectedNetworks.some(network => project.networks.includes(network))
            );
            setFilteredProjects(filtered);
        }
    };

    // Фильтрация по тегам
    const handleTagSelect = (tag) => {
        if (tag === 'All') {
            setFilteredProjects(projects);
        } else {
            const filtered = projects.filter(project => tags[project.id]?.includes(tag));
            setFilteredProjects(filtered);
        }
    };

    return (
        <div className="app">
            <AppHeader />
            <AppSlider tags={sliderTags} onTagSelect={handleTagSelect} />
            <AppFilter isOpen={openModal} />
            <ProjectList projects={filteredProjects} tags={tags} />
            <Modal isOpen={isModalOpen} onClose={closeModal} onFilter={handleFilterProjects} networks={modalNetworks} />
            <AppNavigation />
        </div>
    );
}

export default App;
